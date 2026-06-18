/* ============================================================
   Salesforce OAuth 2.0 PKCE — client-side only
   No backend required. Tokens never leave the browser.

   Setup: create a Salesforce Connected App with:
     - OAuth flow: Authorization Code and Credentials (PKCE)
     - Callback URL: this site's URL + /callback (or just the site URL)
     - Scopes: openid, profile, email
   Then set SF_CLIENT_ID below to your Connected App's Consumer Key.
   ============================================================ */

const SF_CLIENT_ID   = window.SF_CLIENT_ID || 'YOUR_CONNECTED_APP_CLIENT_ID';
const SF_LOGIN_URL   = 'https://login.salesforce.com';
const SF_ORG_ID      = '00D000000000062EAA'; // org62
const SITE_URL       = window.location.origin + window.location.pathname.replace(/\/$/, '');

// ── PKCE helpers ─────────────────────────────────────────────
function base64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function generatePKCE() {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = base64url(await crypto.subtle.digest('SHA-256',
    new TextEncoder().encode(verifier)));
  return { verifier, challenge };
}

// ── Auth state ───────────────────────────────────────────────
function saveSession(token, userInfo) {
  sessionStorage.setItem('sf_token', token);
  sessionStorage.setItem('sf_user', JSON.stringify(userInfo));
}

function getSession() {
  const token = sessionStorage.getItem('sf_token');
  const user  = sessionStorage.getItem('sf_user');
  return token ? { token, user: JSON.parse(user) } : null;
}

function clearSession() {
  sessionStorage.removeItem('sf_token');
  sessionStorage.removeItem('sf_user');
  sessionStorage.removeItem('sf_pkce_verifier');
}

// ── Login flow ───────────────────────────────────────────────
async function startLogin() {
  const { verifier, challenge } = await generatePKCE();
  sessionStorage.setItem('sf_pkce_verifier', verifier);

  const params = new URLSearchParams({
    response_type:         'code',
    client_id:             SF_CLIENT_ID,
    redirect_uri:          SITE_URL,
    scope:                 'openid profile email',
    code_challenge:        challenge,
    code_challenge_method: 'S256',
    state:                 crypto.randomUUID(),
  });

  window.location.href = `${SF_LOGIN_URL}/services/oauth2/authorize?${params}`;
}

async function exchangeCode(code) {
  const verifier = sessionStorage.getItem('sf_pkce_verifier');
  if (!verifier) throw new Error('No PKCE verifier found');

  const params = new URLSearchParams({
    grant_type:    'authorization_code',
    client_id:     SF_CLIENT_ID,
    redirect_uri:  SITE_URL,
    code,
    code_verifier: verifier,
  });

  const res = await fetch(`${SF_LOGIN_URL}/services/oauth2/token`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    params,
  });

  if (!res.ok) throw new Error('Token exchange failed');
  return res.json();
}

async function fetchUserInfo(instanceUrl, accessToken) {
  const res = await fetch(`${instanceUrl}/services/oauth2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user info');
  return res.json();
}

function validateOrg(userInfo) {
  // organization_id comes back as 18-char ID; SF_ORG_ID is 15-char — compare first 15
  const orgId = (userInfo.organization_id || '').slice(0, 15);
  const expected = SF_ORG_ID.slice(0, 15);
  if (orgId !== expected) {
    throw new Error(`Access denied: your org (${orgId}) is not authorized for this tool.`);
  }
}

// ── Show / hide app ──────────────────────────────────────────
function showApp(user) {
  document.getElementById('login-screen').style.display = 'none';
  document.querySelector('.topnav').style.display = '';
  document.querySelector('.ticker-bar').style.display = '';
  document.querySelector('.main-content').style.display = '';

  // Inject user name into nav
  const nameEl = document.createElement('span');
  nameEl.className = 'nav-user';
  nameEl.textContent = user.name || user.email || 'Salesforce User';

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'nav-logout-btn';
  logoutBtn.textContent = 'Sign out';
  logoutBtn.addEventListener('click', () => {
    clearSession();
    window.location.href = SITE_URL;
  });

  const right = document.querySelector('.topnav-right');
  right.prepend(logoutBtn);
  right.prepend(nameEl);
}

function showLogin() {
  document.querySelector('.topnav').style.display = 'none';
  document.querySelector('.ticker-bar').style.display = 'none';
  document.querySelector('.main-content').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-btn').addEventListener('click', startLogin);
}

// ── Boot ─────────────────────────────────────────────────────
(async function boot() {
  // Hide everything until we know auth state
  document.querySelector('.topnav') && (document.querySelector('.topnav').style.display = 'none');
  document.querySelector('.ticker-bar') && (document.querySelector('.ticker-bar').style.display = 'none');
  document.querySelector('.main-content') && (document.querySelector('.main-content').style.display = 'none');

  // If Connected App isn't configured yet, skip auth and show app
  if (SF_CLIENT_ID === 'YOUR_CONNECTED_APP_CLIENT_ID') {
    document.querySelector('.topnav').style.display = '';
    document.querySelector('.ticker-bar').style.display = '';
    document.querySelector('.main-content').style.display = '';
    return;
  }

  // 1. Already have a session?
  const session = getSession();
  if (session) {
    showApp(session.user);
    return;
  }

  // 2. OAuth callback with ?code=...
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    try {
      const tokens = await exchangeCode(code);
      const userInfo = await fetchUserInfo(tokens.instance_url, tokens.access_token);
      validateOrg(userInfo);
      saveSession(tokens.access_token, {
        name:  userInfo.name,
        email: userInfo.email,
        orgId: userInfo.organization_id,
      });
      // Clean the code out of the URL
      window.history.replaceState({}, '', SITE_URL);
      showApp({ name: userInfo.name, email: userInfo.email });
    } catch (err) {
      clearSession();
      alert('Sign-in failed: ' + err.message);
      showLogin();
    }
    return;
  }

  // 3. No session, no code — show login
  showLogin();
})();
