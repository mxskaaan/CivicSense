// Authentication Helper Functions

// Check if user is logged in
function isLoggedIn() {
  const user = localStorage.getItem('civicSenseUser');
  return user !== null;
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem('civicSenseUser');
  return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
  localStorage.removeItem('civicSenseUser');
  localStorage.removeItem('rememberMe');
  window.location.href = 'login.html';
}

// Update navbar with user info
function updateNavbar() {
  const user = getCurrentUser();
  const navLinks = document.querySelector('.nav-links');
  
  if (!navLinks) return;

  if (user) {
    // Remove login/signup links if they exist
    const authLinks = navLinks.querySelectorAll('.auth-link');
    authLinks.forEach(link => link.remove());

    // Check if user profile already exists
    if (!navLinks.querySelector('.user-profile')) {
      // Add user profile dropdown
      const userProfile = document.createElement('div');
      userProfile.className = 'user-profile';
      userProfile.innerHTML = `
        <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-role">${user.role}</div>
        </div>
        <div class="user-dropdown">
          <a href="index.html">📝 Report Issue</a>
          ${user.role === 'admin' ? '<a href="admin.html">🛠️ Admin Panel</a>' : ''}
          <a href="dashboard.html">📊 Analytics</a>
          <a href="map.html">🗺️ Map View</a>
          <a href="#" onclick="logout(); return false;" class="logout-btn">🚪 Logout</a>
        </div>
      `;
      navLinks.appendChild(userProfile);
    }
  } else {
    // Remove user profile if it exists
    const userProfile = navLinks.querySelector('.user-profile');
    if (userProfile) {
      userProfile.remove();
    }

    // Add login/signup links if they don't exist
    if (!navLinks.querySelector('.auth-link')) {
      const authLink = document.createElement('a');
      authLink.href = 'login.html';
      authLink.className = 'auth-link';
      authLink.style.cssText = 'background: var(--gradient-primary); padding: 10px 24px; border-radius: 10px; color: white; font-weight: 700;';
      authLink.textContent = '🔐 Sign In / Sign Up';
      
      navLinks.appendChild(authLink);
    }
  }
}

// Protect page (require authentication)
function protectPage(requiredRole = null) {
  const user = getCurrentUser();
  
  if (!user) {
    // Show auth required message
    document.body.innerHTML = `
      <div class="auth-required">
        <div class="auth-required-icon">🔒</div>
        <h2>Authentication Required</h2>
        <p>Please sign in to access this page</p>
        <a href="login.html" class="btn-primary" style="display: inline-block; text-decoration: none;">
          Sign In
        </a>
        <a href="signup.html" class="btn-secondary" style="display: inline-block; text-decoration: none; margin-left: 12px;">
          Create Account
        </a>
      </div>
    `;
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Show unauthorized message
    document.body.innerHTML = `
      <div class="auth-required">
        <div class="auth-required-icon">⛔</div>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page</p>
        <a href="index.html" class="btn-primary" style="display: inline-block; text-decoration: none;">
          Go to Home
        </a>
      </div>
    `;
    return false;
  }

  return true;
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
  updateNavbar();
});
