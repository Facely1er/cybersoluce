# 🧪 CyberSoluce Platform - Testing Guide

## Quick Start Testing

### 1. **Environment Setup**

```bash
# Copy environment template
cp ENV_VARIABLES.md .env
# Edit .env with your values

# Install dependencies
npm install

# Verify setup
npm run verify
```

### 2. **Run Development Server**

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown)

---

## Testing Scenarios

### **Scenario 1: Local Backend Testing**

#### Setup
```env
VITE_BACKEND_MODE=local
```

#### Test Cases

1. **User Authentication**
   - [ ] Navigate to `/signup`
   - [ ] Create a new account
   - [ ] Verify account created
   - [ ] Logout
   - [ ] Login with credentials
   - [ ] Verify session persists on refresh

2. **Assessment Management**
   - [ ] Navigate to `/assessments/nist-csf`
   - [ ] Start assessment
   - [ ] Answer questions
   - [ ] Verify progress saved
   - [ ] Refresh page
   - [ ] Verify progress restored
   - [ ] Complete assessment
   - [ ] View results

3. **Evidence Management**
   - [ ] Navigate to a control in NIST CSF assessment
   - [ ] Click "Add Evidence"
   - [ ] Fill in evidence form
   - [ ] Submit evidence
   - [ ] Verify evidence appears in list
   - [ ] Delete evidence
   - [ ] Verify evidence removed
   - [ ] Refresh page
   - [ ] Verify evidence persists

4. **Board Reports**
   - [ ] Navigate to `/dashboard`
   - [ ] Click "Export NIST CSF Board Report"
   - [ ] Verify HTML file downloads
   - [ ] Open downloaded file
   - [ ] Verify report includes:
     - [ ] Framework overview
     - [ ] Evidence summary
     - [ ] Mappings summary

---

### **Scenario 2: Supabase Backend Testing**

#### Setup
```env
VITE_BACKEND_MODE=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### Prerequisites
- [ ] Supabase project created
- [ ] Schema deployed (`supabase/schema.cybersoluce.sql`)
- [ ] Test user created in Supabase

#### Test Cases

1. **User Authentication**
   - [ ] Navigate to `/signup`
   - [ ] Create account
   - [ ] Verify profile created in `cs_profiles` table
   - [ ] Logout
   - [ ] Login
   - [ ] Verify session persists
   - [ ] Check Supabase Auth dashboard for user

2. **Assessment Management**
   - [ ] Create assessment
   - [ ] Verify record in `cs_assessments` table
   - [ ] Update assessment
   - [ ] Verify `updated_at` timestamp updated
   - [ ] Delete assessment
   - [ ] Verify record removed from database

3. **Evidence Management**
   - [ ] Add evidence to control
   - [ ] Verify record in `cs_evidence` table
   - [ ] Check `owner_id` matches current user
   - [ ] Refresh page
   - [ ] Verify evidence loads from database
   - [ ] Delete evidence
   - [ ] Verify record removed from database

4. **Multi-User Testing**
   - [ ] Create User A account
   - [ ] Create assessment as User A
   - [ ] Logout
   - [ ] Create User B account
   - [ ] Login as User B
   - [ ] Verify User B cannot see User A's assessments
   - [ ] Verify User B cannot see User A's evidence

5. **RLS Policy Testing**
   - [ ] Login as regular user
   - [ ] Try to access another user's data (should fail)
   - [ ] Verify error messages are user-friendly
   - [ ] Login as admin (if applicable)
   - [ ] Verify admin can access organization data

---

## Automated Testing

### **Run Type Checking**
```bash
npm run type-check
```

### **Run Linting**
```bash
npm run lint
```

### **Run Build**
```bash
npm run build
```

### **Run Verification Script**
```bash
npm run verify
```

### **Pre-Launch Check**
```bash
npm run pre-launch
```

---

## Manual Testing Checklist

### **Critical Paths**

#### Path 1: New User Journey
1. [ ] Visit homepage
2. [ ] Click "Sign Up"
3. [ ] Create account
4. [ ] Redirected to dashboard
5. [ ] Start NIST CSF assessment
6. [ ] Answer first question
7. [ ] Add evidence to control
8. [ ] Complete assessment
9. [ ] Generate board report
10. [ ] Download report

#### Path 2: Returning User Journey
1. [ ] Visit homepage
2. [ ] Click "Login"
3. [ ] Enter credentials
4. [ ] Redirected to dashboard
5. [ ] View existing assessments
6. [ ] Continue incomplete assessment
7. [ ] Add more evidence
8. [ ] View progress

#### Path 3: Framework Mapper
1. [ ] Navigate to `/framework-mapper`
2. [ ] Select source framework
3. [ ] View control mappings
4. [ ] Click on mapped control
5. [ ] Verify navigation works
6. [ ] Add evidence to mapped control

---

## Browser Testing

Test in these browsers:

- [ ] **Chrome/Edge** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### **Responsive Testing**

Test at these breakpoints:

- [ ] **Mobile** (375px - 767px)
- [ ] **Tablet** (768px - 1023px)
- [ ] **Desktop** (1024px+)

---

## Error Scenarios

### **Test Error Handling**

1. **Network Errors**
   - [ ] Disconnect internet
   - [ ] Try to save evidence
   - [ ] Verify error message displayed
   - [ ] Reconnect internet
   - [ ] Verify recovery works

2. **Invalid Input**
   - [ ] Try to submit empty forms
   - [ ] Try invalid email format
   - [ ] Try invalid data types
   - [ ] Verify validation messages

3. **Missing Data**
   - [ ] Navigate to non-existent assessment
   - [ ] Verify 404 or error message
   - [ ] Navigate to invalid route
   - [ ] Verify redirect to homepage

4. **Supabase Errors** (if using Supabase)
   - [ ] Use invalid Supabase URL
   - [ ] Use invalid anon key
   - [ ] Verify graceful fallback
   - [ ] Verify error messages

---

## Performance Testing

### **Load Time**
- [ ] Initial page load < 3 seconds
- [ ] Route transitions < 1 second
- [ ] Evidence loading < 2 seconds

### **Memory**
- [ ] No memory leaks after extended use
- [ ] Memory usage reasonable (< 100MB)

### **Bundle Size**
- [ ] Production bundle < 2MB (gzipped)
- [ ] Check with `npm run analyze`

---

## Security Testing

### **Authentication**
- [ ] Cannot access protected routes without login
- [ ] Session expires correctly
- [ ] Logout clears all data

### **Data Isolation**
- [ ] Users cannot access other users' data
- [ ] RLS policies enforced (Supabase)
- [ ] Organization isolation works

### **Input Validation**
- [ ] XSS attempts blocked
- [ ] SQL injection attempts blocked
- [ ] File uploads validated

---

## Reporting Issues

When reporting issues, include:

1. **Environment**
   - Backend mode (local/supabase)
   - Browser and version
   - OS and version

2. **Steps to Reproduce**
   - Detailed steps
   - Expected vs actual behavior

3. **Error Messages**
   - Console errors
   - Network errors
   - User-facing errors

4. **Screenshots**
   - Error screens
   - Console output
   - Network tab

---

## Test Data

### **Sample User Credentials** (for testing)

**Local Backend:**
- Email: `test@example.com`
- Password: `Test123!`

**Supabase Backend:**
- Create test users in Supabase dashboard
- Use strong passwords
- Verify email if required

---

## Continuous Testing

### **Before Each Commit**
- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Test critical paths manually

### **Before Each Deployment**
- [ ] Run `npm run pre-launch`
- [ ] Complete manual testing checklist
- [ ] Verify all critical paths
- [ ] Check error logs

---

**Last Updated**: $(date)
**Status**: Active Testing Guide

