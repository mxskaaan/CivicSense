# 🔐 CivicSense Authentication System

## Overview

A complete authentication system has been added to CivicSense with login, signup, and user session management.

---

## 🎯 Features Implemented

### 1. Authentication Pages

#### Login Page (`login.html`)
- ✅ Email and password login
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Quick access buttons (Citizen/Admin)
- ✅ Sign up link
- ✅ Loading states
- ✅ Auto-redirect if already logged in

#### Signup Page (`signup.html`)
- ✅ Full name, email, phone, password fields
- ✅ Password confirmation
- ✅ Terms & conditions checkbox
- ✅ Loading states
- ✅ Login link
- ✅ Form validation

### 2. User Session Management

#### Features
- ✅ LocalStorage-based session
- ✅ User profile in navbar
- ✅ Role-based access (Citizen/Admin)
- ✅ Logout functionality
- ✅ Session persistence
- ✅ Auto-login on page load

### 3. UI Components

#### User Profile Dropdown
- User avatar with initials
- User name and role display
- Quick access menu:
  - Report Issue
  - Admin Panel (admin only)
  - Analytics
  - Map View
  - Logout

#### Auth Required Page
- Shown when accessing protected content
- Sign in and sign up buttons
- Clean, centered design

---

## 🎨 Design Features

### Authentication Pages
- **Glassmorphism cards** with backdrop blur
- **Animated logo** with floating effect
- **Gradient branding** (purple theme)
- **Smooth animations** (fadeInUp, shimmer)
- **Loading spinners** on form submit
- **Responsive design** for all devices

### User Profile
- **Avatar with initials** in gradient circle
- **Dropdown menu** on hover
- **Role badge** (Citizen/Admin)
- **Smooth transitions**

---

## 📁 Files Created

1. ✅ **frontend/login.html** - Login page
2. ✅ **frontend/signup.html** - Signup page
3. ✅ **frontend/auth.js** - Authentication helper functions
4. ✅ **frontend/logo-new.svg** - Professional SVG logo

---

## 🚀 How to Use

### For Users

#### Sign Up
1. Go to `signup.html`
2. Fill in your details
3. Accept terms and conditions
4. Click "Create Account"
5. You'll be redirected to the home page

#### Login
1. Go to `login.html`
2. Enter email and password
3. Click "Sign In"
4. Or use Quick Access buttons for demo

#### Quick Access (Demo)
- **Citizen Button**: Instant login as citizen
- **Admin Button**: Instant login as admin

#### Logout
1. Click on your profile in navbar
2. Select "Logout" from dropdown

---

## 💻 For Developers

### Authentication Functions

```javascript
// Check if user is logged in
isLoggedIn() // Returns: boolean

// Get current user data
getCurrentUser() // Returns: { email, name, role, loginTime }

// Logout user
logout() // Clears session and redirects to login

// Update navbar with user info
updateNavbar() // Adds user profile or login/signup links

// Protect page (require authentication)
protectPage(requiredRole) // Shows auth required if not logged in
```

### User Object Structure

```javascript
{
  email: "user@example.com",
  name: "John Doe",
  phone: "+1234567890", // Only on signup
  role: "citizen" | "admin",
  loginTime: "2024-01-01T00:00:00.000Z"
}
```

### Protecting Pages

Add to any page that requires authentication:

```html
<script src="auth.js"></script>
<script>
  // Require any logged-in user
  protectPage();
  
  // Or require specific role
  protectPage('admin');
</script>
```

### Example: Protect Admin Page

```javascript
// In admin.html
document.addEventListener('DOMContentLoaded', function() {
  if (!protectPage('admin')) {
    return; // Page will show auth required message
  }
  
  // Continue with admin page logic
  loadComplaints();
});
```

---

## 🎨 Logo System

### New Logo (`logo-new.svg`)

**Features:**
- Professional SVG design
- City skyline with buildings
- Location pin icon
- Purple gradient background
- Scalable vector graphics
- 120x120px optimized

**Usage:**
```html
<img src="logo-new.svg" alt="CivicSense" height="40">
```

**Design Elements:**
- 4 buildings of varying heights
- Windows with lighting effects
- Red location pin overlay
- Gradient background (#667eea → #764ba2)
- Rounded corners (24px radius)

---

## 🔧 Integration with Backend

### Current Implementation
- **Frontend-only** authentication using LocalStorage
- Demo mode with quick access buttons
- No actual API calls (simulated with setTimeout)

### To Connect with Backend

Replace the simulated login/signup with actual API calls:

#### Login
```javascript
fetch("http://localhost:5000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    localStorage.setItem('civicSenseUser', JSON.stringify(data.user));
    window.location.href = data.user.role === 'admin' ? 'admin.html' : 'index.html';
  } else {
    alert('Invalid credentials');
  }
});
```

#### Signup
```javascript
fetch("http://localhost:5000/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ fullName, email, phone, password })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    localStorage.setItem('civicSenseUser', JSON.stringify(data.user));
    window.location.href = 'index.html';
  } else {
    alert(data.message);
  }
});
```

---

## 🗺️ Location Search Fix

### Issue
Location search was not working properly - showing "no result found"

### Solution Implemented

1. **Better Query Formatting**
   - Adds country context (India) if not specified
   - Encodes special characters properly
   - Limits results to 5 for faster response

2. **Improved Error Handling**
   - Shows helpful error messages
   - Suggests alternatives if not found
   - Handles network errors gracefully

3. **Enhanced UX**
   - Loading spinner during search
   - Enter key support
   - Displays full location name
   - Better zoom level (15)

### Usage Examples

**Good Searches:**
- "Patna Junction"
- "Gandhi Maidan, Patna"
- "Boring Road, Patna, Bihar"
- "Patna Railway Station"

**Tips:**
- Add city/state for better results
- Use landmarks instead of addresses
- Check spelling
- Add commas between location parts

---

## 📱 Responsive Design

### Mobile Optimizations
- Stacked form layout
- Larger touch targets
- Hidden user info text (avatar only)
- Full-width buttons
- Optimized spacing

### Tablet
- Adapted card width
- Flexible layouts
- Touch-friendly dropdowns

### Desktop
- Full feature set
- Hover effects
- Dropdown menus
- Optimal spacing

---

## ♿ Accessibility

### Features
- ✅ Semantic HTML forms
- ✅ Proper label associations
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ ARIA labels
- ✅ Screen reader support
- ✅ Color contrast compliance

---

## 🔒 Security Considerations

### Current Implementation
⚠️ **Demo/Development Only** - Not production-ready

### For Production

**Required Improvements:**
1. **Backend Authentication**
   - JWT tokens or session cookies
   - Secure password hashing (bcrypt)
   - HTTPS only
   - CSRF protection

2. **Password Security**
   - Minimum length requirements
   - Complexity validation
   - Password strength meter
   - Secure storage (never plain text)

3. **Session Management**
   - Secure token storage
   - Token expiration
   - Refresh tokens
   - Session timeout

4. **Input Validation**
   - Server-side validation
   - SQL injection prevention
   - XSS protection
   - Rate limiting

---

## 🎯 User Roles

### Citizen
**Access:**
- ✅ Report issues
- ✅ View map
- ✅ View analytics
- ❌ Admin dashboard

### Admin
**Access:**
- ✅ All citizen features
- ✅ Admin dashboard
- ✅ Manage complaints
- ✅ Update status

---

## 🚀 Quick Start

### 1. Test Authentication

**Option A: Quick Access (Demo)**
```
1. Open login.html
2. Click "Citizen" or "Admin" button
3. Instant access!
```

**Option B: Manual Login**
```
1. Open signup.html
2. Create account
3. Login with credentials
```

### 2. View User Profile
```
1. Login to any page
2. See profile in navbar
3. Hover for dropdown menu
```

### 3. Test Location Search
```
1. Go to map.html
2. Search: "Patna Junction"
3. Or: "Gandhi Maidan, Patna"
4. Press Enter or click Search
```

---

## 📊 Session Storage

### LocalStorage Keys

```javascript
// User session
localStorage.getItem('civicSenseUser')
// Structure: { email, name, role, loginTime }

// Remember me flag
localStorage.getItem('rememberMe')
// Value: 'true' or null
```

### Clear Session
```javascript
localStorage.removeItem('civicSenseUser');
localStorage.removeItem('rememberMe');
```

---

## 🎨 Customization

### Change Logo
Replace `logo-new.svg` with your own SVG file

### Change Colors
Update CSS variables in `style.css`:
```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Roles
Modify role checks in `auth.js`:
```javascript
if (user.role === 'yourCustomRole') {
  // Custom logic
}
```

---

## 🐛 Troubleshooting

### Issue: User not showing in navbar
**Solution:** Ensure `auth.js` is loaded before other scripts

### Issue: Location search not working
**Solution:** 
- Check internet connection
- Add more location details
- Try with country/state name

### Issue: Can't logout
**Solution:** Check browser console for errors, clear localStorage manually

### Issue: Logo not displaying
**Solution:** Ensure `logo-new.svg` is in the frontend folder

---

## 📝 TODO / Future Enhancements

- [ ] Backend API integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Profile editing
- [ ] Avatar upload
- [ ] Activity history
- [ ] Notification preferences

---

## ✅ Summary

**Authentication System:**
- ✅ Login and Signup pages
- ✅ User session management
- ✅ Role-based access control
- ✅ User profile in navbar
- ✅ Logout functionality

**Logo:**
- ✅ Professional SVG logo
- ✅ City skyline design
- ✅ Purple gradient theme
- ✅ Scalable and modern

**Location Search:**
- ✅ Fixed search functionality
- ✅ Better error handling
- ✅ Improved UX
- ✅ Enter key support

**Ready for demo and further development!** 🎉
