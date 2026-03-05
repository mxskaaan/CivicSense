# 🚀 Getting Started with CivicSense

## Quick Start Guide

### Step 1: Start the Backend Server

```bash
cd backend
npm install
node server.js
```

You should see: `Server running on port 5000`

### Step 2: Configure MongoDB

Open `backend/server.js` and update the MongoDB connection:

```javascript
mongoose.connect("YOUR_MONGODB_ATLAS_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Step 3: Open the Application

Open `frontend/login.html` in your browser.

### Step 4: Login

**Quick Demo Access:**
- Click **"Citizen"** button for instant citizen access
- Click **"Admin"** button for instant admin access

**Or create a new account:**
1. Click "Sign up"
2. Fill in the form
3. Click "Create Account"

### Step 5: Explore Features

**As Citizen:**
- Report issues (index.html)
- View map (map.html)
- View analytics (dashboard.html)

**As Admin:**
- All citizen features
- Manage complaints (admin.html)
- Update status
- View priorities

---

## 🎯 Testing Location Search

1. Go to **Map View** (map.html)
2. Try these searches:
   - "Patna Junction"
   - "Gandhi Maidan, Patna"
   - "Boring Road, Patna, Bihar"
3. Press Enter or click Search

---

## 📁 File Overview

### Main Pages
- `login.html` - Login page (start here)
- `signup.html` - Create account
- `index.html` - Report issues
- `admin.html` - Admin dashboard
- `dashboard.html` - Analytics
- `map.html` - Interactive map

### Assets
- `style.css` - All styles (2500+ lines)
- `script.js` - Main functionality
- `auth.js` - Authentication helpers
- `logo-new.svg` - Professional logo

---

## 🔧 Troubleshooting

### Backend not starting?
```bash
# Install dependencies
npm install

# Check if port 5000 is available
# On Windows: netstat -ano | findstr :5000
# On Mac/Linux: lsof -i :5000
```

### Location search not working?
- Check internet connection
- Add more location details
- Try with city/state name
- Example: "Patna Junction, Bihar, India"

### User not showing in navbar?
- Clear browser cache
- Check browser console for errors
- Ensure auth.js is loaded

### Can't upload images?
- Check file size (max 5MB)
- Use image files only (jpg, png, etc.)
- Ensure backend is running

---

## 🎨 Customization

### Change Colors
Edit `style.css`:
```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Logo
Replace `logo-new.svg` with your own SVG file.

### Add New Pages
1. Copy existing HTML file
2. Update navbar links
3. Add to footer
4. Include auth.js if needed

---

## 📚 Documentation

- **FINAL_SUMMARY.md** - Complete overview
- **AUTHENTICATION_GUIDE.md** - Auth system details
- **ADVANCED_UI_FEATURES.md** - UI/UX features
- **UI_REDESIGN_COMPLETE.md** - Design system

---

## ✅ Checklist

Before demo/presentation:

- [ ] Backend server running
- [ ] MongoDB connected
- [ ] Test login/signup
- [ ] Test complaint submission
- [ ] Test location search
- [ ] Test admin dashboard
- [ ] Check on mobile device
- [ ] Clear browser cache

---

## 🎉 You're Ready!

Your CivicSense platform is now fully functional with:
- ✅ Authentication system
- ✅ Professional design
- ✅ Interactive map
- ✅ Analytics dashboard
- ✅ Admin panel

**Enjoy building smarter cities!** 🏙️
