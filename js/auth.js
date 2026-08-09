/* ============================================================
   DJEDI CHURCH — Authentication Module
   SHA-256 hash + localStorage session management
   ============================================================ */

const DjediAuth = {
  SESSION_KEY: 'djedi_church_session',
  HASH_KEY: 'djedi_church_pw_hash',

  /**
   * Hash a string using SHA-256
   */
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Set the church password (call once during setup)
   */
  async setPassword(password) {
    const hash = await this.hashPassword(password);
    localStorage.setItem(this.HASH_KEY, hash);
    return hash;
  },

  /**
   * Get the stored password hash
   */
  getStoredHash() {
    return localStorage.getItem(this.HASH_KEY);
  },

  /**
   * Check if a password has been set
   */
  isPasswordSet() {
    return this.getStoredHash() !== null;
  },

  /**
   * Verify a password against the stored hash
   */
  async verifyPassword(password) {
    const storedHash = this.getStoredHash();
    if (!storedHash) return false;
    const inputHash = await this.hashPassword(password);
    return inputHash === storedHash;
  },

  /**
   * Create a session (login)
   */
  createSession() {
    const session = {
      authenticated: true,
      timestamp: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
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
   * Call this at the top of protected pages
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
  const passwordInput = document.getElementById('password-input');
  const errorMsg = document.getElementById('login-error');
  const loginBtn = document.getElementById('login-btn');

  if (!passwordInput) return;

  const password = passwordInput.value.trim();
  if (!password) {
    errorMsg.textContent = 'Please enter a password.';
    errorMsg.style.display = 'block';
    return;
  }

  loginBtn.textContent = 'Verifying...';
  loginBtn.disabled = true;

  DjediAuth.verifyPassword(password).then(valid => {
    if (valid) {
      DjediAuth.createSession();
      errorMsg.style.display = 'none';
      window.location.href = 'client-portal/index.html';
    } else {
      errorMsg.textContent = 'Invalid password. Please try again.';
      errorMsg.style.display = 'block';
      loginBtn.textContent = 'Enter Portal';
      loginBtn.disabled = false;
      passwordInput.value = '';
    }
  });
}

function handleLogout() {
  DjediAuth.logout();
  window.location.href = '../login.html';
}
