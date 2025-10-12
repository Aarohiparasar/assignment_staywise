# 🚀 StayWise Deployment Guide

## 🔄 Solving Circular Dependency: Frontend ↔ Backend URLs

### **The Problem**
- Backend needs `CLIENT_URL` for CORS
- Frontend needs `NEXT_PUBLIC_API_URL` for API calls
- Both URLs change on deployment
- Can't set them independently

### **The Solution: Staged Deployment**

## 📋 **Step-by-Step Deployment Process**

### **Phase 1: Deploy Backend First**

1. **Deploy Backend on Render:**
   ```bash
   # Environment Variables for Backend:
   PORT=4000
   CLIENT_URL=https://staywise-frontend.vercel.app  # Your planned frontend URL
   MONGO_DB=mongodb+srv://username:password@cluster.mongodb.net/staywise
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

2. **Get Backend URL:** `https://staywise-backend.onrender.com`

### **Phase 2: Deploy Frontend**

1. **Deploy Frontend on Vercel:**
   ```bash
   # Environment Variables for Frontend:
   NEXT_PUBLIC_API_URL=https://staywise-backend.onrender.com
   ```

2. **Get Frontend URL:** `https://staywise-frontend.vercel.app`

### **Phase 3: Update Backend CORS**

1. **Update Backend Environment Variable:**
   ```bash
   # In Render Dashboard, update CLIENT_URL:
   CLIENT_URL=https://staywise-frontend.vercel.app
   ```

2. **Redeploy Backend** (or it will auto-redeploy)

## 🔧 **Alternative: Wildcard CORS (Less Secure)**

If you want to avoid the circular dependency entirely:

```javascript
// In backend/App.ts
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://*.vercel.app', 'https://*.netlify.app'] 
      : true,
    credentials: true,
  })
);
```

## 🛡️ **Production-Ready CORS Configuration**

For better security, use specific domains:

```javascript
// In backend/App.ts
const allowedOrigins = [
  'http://localhost:3001',                    // Local development
  'https://staywise-frontend.vercel.app',     // Production frontend
  'https://staywise-frontend.netlify.app',    // Alternative hosting
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
```

## 📝 **Deployment Checklist**

### **Backend (Render)**
- [ ] Deploy with temporary `CLIENT_URL`
- [ ] Test API endpoints work
- [ ] Get backend URL
- [ ] Update `CLIENT_URL` with actual frontend URL
- [ ] Redeploy if needed

### **Frontend (Vercel)**
- [ ] Set `NEXT_PUBLIC_API_URL` to backend URL
- [ ] Deploy frontend
- [ ] Test signup/login functionality
- [ ] Get frontend URL

### **Final Configuration**
- [ ] Update backend `CLIENT_URL` with frontend URL
- [ ] Test full application flow
- [ ] Verify CORS is working

## 🚨 **Common Issues & Solutions**

### **Issue: CORS Error**
```
Access to fetch at 'backend-url' from origin 'frontend-url' has been blocked by CORS policy
```
**Solution:** Update `CLIENT_URL` in backend to match frontend domain

### **Issue: API Not Found**
```
Failed to fetch
```
**Solution:** Check `NEXT_PUBLIC_API_URL` in frontend environment variables

### **Issue: Environment Variables Not Updating**
**Solution:** 
- Render: Redeploy the service
- Vercel: Redeploy the project

## 🔍 **Testing Commands**

```bash
# Test backend CORS
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/users/signUp

# Test signup
curl -X POST https://your-backend.onrender.com/api/users/signUp \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-frontend.vercel.app" \
  -d '{"userName":"test","emailId":"test@test.com","password":"123456","mobileNumber":"1234567890"}'
```

## 🎯 **Quick Fix for Current Issue**

If you're stuck right now:

1. **Temporarily allow all origins:**
   ```javascript
   origin: true  // In backend CORS config
   ```

2. **Deploy both services**

3. **Update to specific domains:**
   ```javascript
   origin: ['https://your-actual-frontend-url.vercel.app']
   ```

4. **Redeploy backend**

This approach ensures your app works while maintaining security!
