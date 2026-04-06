# Supabase Integration Guide

This guide will walk you through setting up Supabase for your Portfolio website.

## 📋 Prerequisites

- A [Supabase account](https://supabase.com) (free tier is sufficient)
- Your Portfolio Next.js project

---

## 🚀 Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Organization**: Select or create one
   - **Database password**: Create a strong password (save it securely)
   - **Region**: Choose closest to your users (e.g., US East, West Europe)
   - **Pricing plan**: Free tier is fine to start
4. Click **"Create new project"**
5. Wait ~2 minutes for database provisioning

---

## 🗄️ Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project root
4. Copy **all** the SQL content from that file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. Verify success - you should see tables listed in the output

### Verify Tables Created:

Go to **Table Editor** (left sidebar) and confirm you see:
- ✅ `audit_requests`
- ✅ `contact_submissions`
- ✅ `project_briefs`

---

## 🔑 Step 3: Get API Credentials

1. In Supabase dashboard, go to **Project Settings** (gear icon, bottom left)
2. Click **API Keys** (under "Configuration")
3. Copy these three values:

   - **Project URL**: Under "Project URL" section
     - Example: `https://xxxxxxxxxxxxx.supabase.co`

   - **Publishable key**: Under "Project API keys"
     - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

   - **Secret key**: Click to reveal
     - This is your `SUPABASE_SERVICE_ROLE_KEY`
     - ⚠️ **Never expose this key publicly!**

---

## 🔧 Step 4: Configure Environment Variables

### Local Development

1. Open `.env.local` in your project root
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Save the file
4. Restart your dev server: `npm run dev`

### Production (Netlify)

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy your site

---

## 🧪 Step 5: Test Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Test each form:

   ### Audit Form
   - Go to homepage
   - Scroll to "Get Your Free Website Audit"
   - Fill out the form and submit
   - You should see a success message

   ### Contact Form
   - Go to "Contact" section
   - Fill out the quick contact form
   - Submit and verify success message

   ### Project Brief Form
   - Navigate to "Start a Project" page
   - Complete all 4 steps
   - Submit on the final step
   - Check for success message

3. Verify data in Supabase:
   - Go to **Table Editor** in Supabase dashboard
   - Check each table for your submissions

---

## 📊 Step 6: View Submissions

### Via Supabase Dashboard

1. Go to **Table Editor**
2. Select any table:
   - `audit_requests` - Website audit form submissions
   - `contact_submissions` - Contact form messages
   - `project_briefs` - Multi-step project brief submissions

### Build an Admin Dashboard (Optional)

You can create an admin page to view submissions:

1. Create a protected route: `/admin/submissions`
2. Use Supabase client to fetch data:

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('audit_requests')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 🔒 Security Notes

### Row Level Security (RLS)

The schema includes RLS policies that:

- ✅ **Allow anonymous inserts** - Anyone can submit forms
- ✅ **Restrict reads** - Only authenticated users can view data
- ✅ **Prevent updates/deletes** - Data is immutable after submission

### Environment Variables

- **Never commit** `.env.local` to Git (it's already in `.gitignore`)
- **Never expose** `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Use `NEXT_PUBLIC_` prefix only for keys needed in browser

---

## 🏗️ Architecture

```
User Browser
    ↓
Next.js (Netlify)
    ↓
┌───────────────────────────────────┐
│  API Routes (Server-side)         │
│  /api/audit                       │
│  /api/contact                     │
│  /api/project-brief               │
└───────────────────────────────────┘
    ↓
Supabase (PostgreSQL Database)
    ├── audit_requests
    ├── contact_submissions
    └── project_briefs
```

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"

**Solution:**
- Ensure `.env.local` has all three variables set
- Restart dev server after changing env vars: `npm run dev`

### Form submission fails with 500 error

**Check:**
1. Supabase credentials are correct in `.env.local`
2. Supabase project is active and not paused
3. Tables exist in Supabase (check Table Editor)
4. Server console for error logs

### "Row Level Security" policy error

**Solution:**
- Verify RLS policies were created (see `supabase-schema.sql`)
- Check that `anon` role has INSERT permission

### Build fails with Supabase errors

**Solution:**
- Ensure you're not calling Supabase during build time
- API routes only run at runtime, not during build

---

## 📦 What Was Changed

### Removed
- ❌ `backend/` directory (FastAPI)
- ❌ `pg` package (PostgreSQL client)
- ❌ Netlify Forms integration
- ❌ `database-setup.sql` (Neon schema)

### Added
- ✅ `@supabase/supabase-js` package
- ✅ `supabase-schema.sql` - Complete database schema
- ✅ `src/lib/supabase.ts` - Browser client
- ✅ `src/lib/supabase-server.ts` - Server client (service role)
- ✅ `src/app/api/audit/route.ts` - Audit form API
- ✅ `src/app/api/contact/route.ts` - Contact form API
- ✅ `src/app/api/project-brief/route.ts` - Project brief API

### Updated
- ✅ `AuditForm.tsx` - Now calls `/api/audit`
- ✅ `Contact.tsx` - Now calls `/api/contact`
- ✅ `ProjectBriefForm.tsx` - Now calls `/api/project-brief`
- ✅ `.env.local` - Supabase credentials
- ✅ `package.json` - Replaced `pg` with `@supabase/supabase-js`

---

## 🚀 Deployment Checklist

- [ ] Supabase project created and schema applied
- [ ] Environment variables added to Netlify
- [ ] Test all three forms locally
- [ ] Deploy to Netlify: `git push`
- [ ] Test all forms on production
- [ ] Verify data appears in Supabase Table Editor
- [ ] Set up email notifications (optional, via Supabase Edge Functions)

---

## 🎯 Next Steps

1. **Set up Supabase Auth** - Add admin login for dashboard
2. **Create admin dashboard** - View/manage submissions
3. **Add email notifications** - Notify on form submission
4. **Set up backups** - Enable in Supabase settings
5. **Add analytics** - Track form conversion rates

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
