/* ============================================================
   DJEDI CHURCH — Authentication Module
   Simple access code + localStorage session management

   ⚠️  SECURITY NOTICE:
   This is a CLIENT-SIDE ONLY authentication system. It provides
   obfuscation-level protection, NOT real security. The access code
   comparison happens in the browser and can be bypassed by anyone
   with basic DevTools knowledge.

   For production use with sensitive documents, implement
   server-side authentication (Cloudflare Workers, Vercel Edge,
   Netlify Identity, or Supabase Auth).

   DO NOT store genuinely sensitive or legally privileged
   documents behind this authentication alone.
   ============================================================ */

const DjediAuth = {
  SESSION_KEY: 'djedi_church_session',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours

  /**
   * Decode the access code from obfuscated form.
   * This is NOT real security — it only prevents casual plaintext
   * reading of the code from the JavaScript source.
   */
  _getCode() {
    // Simple base64 encoding — NOT a security measure
    // Prevents the access code from appearing as plaintext in source
    return atob('ZGplZGkyMDI2'); // base64 of 'djedi2026'
  },

  /**
   * Hash a string using a simple non-cryptographic hash for comparison.
   * Used to avoid comparing plaintext in the verification function body.
   */
  _hash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  },

  /**
   * Verify access code
   */
  verifyAccessCode(code) {
    if (!code || typeof code !== 'string') return false;
    var trimmed = code.trim();
    if (trimmed.length === 0 || trimmed.length > 100) return false;
    return this._hash(trimmed) === this._hash(this._getCode());
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
