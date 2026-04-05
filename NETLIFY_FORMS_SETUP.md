# Netlify Forms Setup Guide - Lead Capture

## ✅ What's Already Done:

### 1. **Forms Configured for Netlify**
- ✅ **Audit Form** (`/` page) → `audit-form`
- ✅ **Project Brief Form** (`/start-project`) → `project-brief-form`
- ✅ Both forms now submit to Netlify Forms (no backend needed!)

### 2. **Files Created/Updated**
- ✅ `netlify.toml` - Netlify configuration
- ✅ `@netlify/plugin-nextjs` installed
- ✅ Forms include `data-netlify="true"` attributes
- ✅ Honeypot spam protection added (`bot-field`)
- ✅ Success page created (`/success`)

---

## 🚀 How to Deploy to Netlify:

### Option A: Via Netlify CLI (Recommended)

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Initialize your project
netlify init
# → Select: "Create & configure a new site"
# → Choose your team
# → Site name: devstudio-portfolio (or your preference)

# 4. Deploy!
netlify deploy --prod
```

### Option B: Via GitHub (Auto-Deploy)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Ready for Netlify deploy"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/portfolio.git
git push -u origin main

# 2. Go to https://app.netlify.com
# 3. Click "Add new site" → "Import an existing project"
# 4. Connect GitHub → Select your repo
# 5. Build settings (auto-detected from netlify.toml):
#    - Build command: npm run build
#    - Publish directory: .next
# 6. Click "Deploy site"
```

---

## 📊 How Netlify Forms Work:

### What Happens When Someone Submits:

1. **User fills out form** on your website
2. **Form submits to Netlify** (not your API routes)
3. **Netlify captures the data** automatically
4. **You get notified** via email or can view in dashboard
5. **Data stored** in Netlify Forms dashboard

### Where to View Submissions:

1. Go to **https://app.netlify.com**
2. Select your site
3. Click **"Forms"** in the left sidebar
4. See all submissions from `audit-form` and `project-brief-form`

---

## 🔔 Set Up Email Notifications:

### Get Email When Form Submitted:

1. **Netlify Dashboard** → Your site → **Forms**
2. Click **"Settings and usage"**
3. Under **"Form notifications"**, click **"Add notification"**
4. Choose:
   - **Email notification** → Sends to your email
   - **Slack notification** → Sends to Slack channel
   - **Webhook** → Send to Zapier/Make for automation

### Recommended: Email + Spreadsheet Backup

1. **Email notification**: Instant alert when someone submits
2. **Zapier integration** (optional): Auto-save to Google Sheets
   - Create Zap: Netlify Forms → Google Sheets
   - Every submission auto-logs to spreadsheet

---

## 🛡️ Spam Protection:

Both forms include **Netlify Honeypot** (`bot-field`):
- Invisible to real users
- Bots fill it out → Netlify blocks them
- No CAPTCHA needed!

---

## 📝 Form Fields Captured:

### Audit Form (`audit-form`):
- `name` - Client name
- `email` - Contact email
- `website` - Current website URL
- `business_type` - Industry
- `message` - Their challenge
- `selected_offer` - Which offer they chose
- `created_at` - Auto-timestamp

### Project Brief Form (`project-brief-form`):
- `business_name` - Company name
- `industry` - Business type
- `contact_name` - Who to reach
- `contact_email` - Email address
- `project_type` - New site or redesign
- `features` - What they need
- `budget_range` - Their budget
- `desired_launch_date` - Timeline
- `notes` - Additional info

---

## 🧪 Testing Your Forms:

### Before Deploying:
```bash
npm run dev
```

1. **Go to** http://localhost:3000
2. **Fill out audit form** → Submit
3. **Check console** - should see successful submission
4. **Repeat** for `/start-project`

### After Deploying:
1. Visit your Netlify URL
2. Submit test form
3. Check **Netlify Dashboard → Forms**
4. You should see the submission!

---

## ⚙️ Environment Variables (Optional):

If you want to keep using API routes as backup:

```bash
# In Netlify dashboard → Site settings → Build & deploy → Environment
DATABASE_URL=postgresql://your-neon-url?sslmode=require
SKIP_DB_DURING_BUILD=true
```

**But you don't need this!** Netlify Forms handles everything without a database.

---

## 💡 Pro Tips:

### 1. **Auto-Reply Email** (Premium Feature)
Netlify Pro ($19/mo) lets you send auto-replies:
- "Thanks for your submission! I'll be in touch within 24 hours."

### 2. **Export to CSV**
- Netlify Dashboard → Forms → Select form → **Export as CSV**
- Great for backup or importing to CRM

### 3. **Webhook to WhatsApp** (Advanced)
- Use Make.com or Zapier
- Trigger: New Netlify Form submission
- Action: Send WhatsApp message to you

### 4. **Form Submissions Limit**
- **Free tier**: 100 submissions/month
- **Pro tier**: 250 submissions/month ($19/mo)
- Usually plenty for portfolio sites!

---

## 🎯 What You'll See in Netlify Dashboard:

```
┌─────────────────────────────────────┐
│  Forms                              │
├─────────────────────────────────────┤
│  audit-form (12 submissions)        │
│  project-brief-form (5 submissions) │
└─────────────────────────────────────┘

Click any form → See all submissions:
┌──────────────────────────────────────────┐
│  #1 - John Smith                         │
│  name: John Smith                        │
│  email: john@business.com                │
│  website: https://oldsite.com            │
│  business_type: restaurant               │
│  selected_offer: From Scratch Package    │
│  submitted: 2 hours ago                  │
└──────────────────────────────────────────┘
```

---

## 🚨 Troubleshooting:

### Form not appearing in Netlify Dashboard?
```
Solution: Netlify scans your built HTML for forms.
Make sure the <form> tag has:
- name="your-form-name"
- data-netlify="true"

Both forms are already configured correctly!
```

### Submissions not showing?
```
1. Check Netlify dashboard → Forms → Settings
2. Make sure forms are enabled
3. Try submitting again
```

### Spam submissions?
```
The honeypot field should catch most bots.
If needed, add reCAPTCHA:
1. Netlify → Forms → Settings → reCAPTCHA
2. Follow their guide
```

---

## ✅ Deployment Checklist:

- [ ] `netlify.toml` exists in project root
- [ ] `@netlify/plugin-nextjs` installed
- [ ] Forms have `data-netlify="true"` attribute
- [ ] Hidden `form-name` field in each form
- [ ] Honeypot field (`bot-field`) added
- [ ] Build succeeds: `npm run build`
- [ ] Deploy to Netlify
- [ ] Test both forms after deploy
- [ ] Check Netlify Dashboard for submissions
- [ ] Set up email notifications

---

**You're all set!** 🎉

Your forms now capture leads directly in Netlify — no database needed!
