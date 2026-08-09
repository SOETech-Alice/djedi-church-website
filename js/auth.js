/* ============================================================
   DJEDI CHURCH — Authentication Module
   Simple access code + localStorage session management

   Access code: djedi2026
   ============================================================ */

const DjediAuth = {
  SESSION_KEY: 'djedi_church_session',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  ACCESS_CODE: 'djedi2026',

  /**
   * Verify access code — plain string comparison
   */
  verifyAccessCode(code) {
    if (!code || typeof code !== 'string') return false;
    return code.trim() === this.ACCESS_CODE;
  },

  /**
   * Create a session (login)
   */
  createSession() {
    const session = {
      authenticated: true,
      timestamp: Date.now(),
      expires: Date.now() + this.SESSION_DURATION
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Check if current session is valid
   */
  isAuthenticated() {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return false;

    try {
      const session = JSON.parse(sessionData);
      if (!session.authenticated) return false;
      if (Date.now() > session.expires) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Logout — clear session
   */
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  /**
   * Require authentication — redirect to login if not authenticated
   */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '../login.html';
      return false;
    }
    return true;
  }
};

/* ---- LOGIN PAGE LOGIC ---- */
function handleLogin(e) {
  e.preventDefault();
  const input = document.getElementById('code-input');
  const errorMsg = document.getElementById('login-error');
  const loginBtn = document.getElementById('login-btn');

  if (!input) return;

  const code = input.value.trim();
  if (!code) {
    errorMsg.textContent = 'Please enter an access code.';
    errorMsg.style.display = 'block';
    return;
  }

  loginBtn.textContent = 'Verifying...';
  loginBtn.disabled = true;

  if (DjediAuth.verifyAccessCode(code)) {
    DjediAuth.createSession();
    errorMsg.style.display = 'none';
    window.location.href = 'client-portal/index.html';
  } else {
    errorMsg.textContent = 'Invalid access code. Please try again.';
    errorMsg.style.display = 'block';
    loginBtn.textContent = 'Enter Portal';
    loginBtn.disabled = false;
    input.value = '';
  }
}

function handleLogout() {
  DjediAuth.logout();
  window.location.href = '../login.html';
}
