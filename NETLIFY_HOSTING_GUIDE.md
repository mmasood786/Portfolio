# Netlify Hosting, Lead Capture Forms & Custom Domain Guide

> Complete guide for deploying your Next.js Portfolio to Netlify with free hosting, lead capture forms, and custom domain setup.

---

## Table of Contents

1. [Free Netlify Hosting Setup](#1-free-netlify-hosting-setup)
2. [Lead Capture with Netlify Forms](#2-lead-capture-with-netlify-forms)
3. [Custom Domain Configuration](#3-custom-domain-configuration)
4. [Next.js Specific Configuration](#4-nextjs-specific-configuration)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Free Netlify Hosting Setup

### Step 1: Create a Netlify Account

1. Go to [https://www.netlify.com/](https://www.netlify.com/)
2. Click **"Sign up"** (top right corner)
3. Choose your preferred sign-up method:
   - **GitHub** (Recommended - easiest for deployment)
   - GitLab
   - Bitbucket
   - Email

### Step 2: Push Your Project to GitHub

If your project isn't already on GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Log in to your Netlify dashboard
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:

| Setting | Value |
|---------|-------|
| **Base directory** | Leave blank (or path to Next.js app if in subfolder) |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Node version** | `18` or higher |

6. Click **"Deploy site"**

### Step 4: Set Up Environment Variables

Your project uses `.env.local` for sensitive configuration. Set these in Netlify:

1. Go to **Site configuration** → **Environment variables**
2. Click **"Add a variable"**
3. Add each variable from your `.env.local`:
   - `DATABASE_URL` (Neon PostgreSQL connection string)
   - Any other API keys or secrets
4. Click **"Save"**

> ⚠️ **Never commit `.env.local` to GitHub** - your `.gitignore` already excludes it.

### Step 5: Your Live URL

After deployment, Netlify provides a URL like:
```
https://your-portfolio-name.netlify.app
```

---

## 2. Lead Capture with Netlify Forms

Netlify can automatically detect and process form submissions **without any backend code**.

### How Netlify Form Detection Works

Netlify scans your built HTML files for forms with the `netlify` attribute. When found, it:
- Creates a form endpoint automatically
- Stores submissions in your Netlify dashboard
- Sends you email notifications (configurable)

### Step 1: Add a Form to Your Portfolio

Create or update your contact form component with Netlify attributes:

```tsx
// src/components/ContactForm.tsx

export default function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/success"
    >
      {/* Hidden field required for Netlify form detection */}
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot field for spam protection */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

### Key Attributes Explained

| Attribute | Purpose |
|-----------|---------|
| `name="contact"` | Unique form identifier (use this name in Netlify dashboard) |
| `data-netlify="true"` | Tells Netlify to process this form |
| `netlify-honeypot="bot-field"` | Spam protection - hidden field bots fill but humans don't |
| `action="/success"` | Redirect URL after submission (create this page) |
| `<input type="hidden" name="form-name">` | Required for Netlify to identify the form |

### Step 2: Create a Success Page

Create a thank you page for after form submission:

```tsx
// src/app/success/page.tsx

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600">
          Your message has been received. I'll get back to you soon.
        </p>
      </div>
    </div>
  );
}
```

### Step 3: Enable Notifications in Netlify

1. Go to **Site configuration** → **Forms** → **Form notifications**
2. Click **"Add notification"**
3. Choose notification type:
   - **Email notification** - get emailed for each submission
   - **Slack notification** - send to Slack channel
   - **Webhook** - send data to another service
4. Configure recipient email(s)
5. Click **"Save"**

### Step 4: View Submissions

1. Go to **Site overview** → **Forms**
2. Click on your form name (`contact`)
3. View all submissions, export to CSV, or manage entries

### Pro Tips for Lead Capture

- **Add reCAPTCHA**: Enable in Netlify Forms settings for extra spam protection
- **Use webhooks**: Connect to Zapier/Make.com to send leads to CRM or Google Sheets
- **File uploads**: Add `enctype="multipart/form-data"` to accept file uploads
- **Auto-reply**: Use Zapier integration to send automatic confirmation emails

---

## 3. Custom Domain Configuration

### Option A: Purchase Domain Through Netlify

1. Go to **Domain settings** → **Buy a domain**
2. Search for your desired domain name
3. Complete purchase (powered by DNSimple)
4. Domain is automatically configured - no extra setup needed

### Option B: Use Domain from External Registrar

**Supported registrars**: Namecheap, GoDaddy, Google Domains, Cloudflare, etc.

#### Step 1: Add Custom Domain in Netlify

1. Go to **Domain settings** → **Add a domain**
2. Enter your domain (e.g., `www.yourportfolio.com`)
3. Click **"Verify"** and **"Add domain"**

#### Step 2: Configure DNS Settings

**Method 1: Netlify DNS (Recommended - Simpler)**

1. In Netlify, click **"Set up Netlify DNS"**
2. Netlify provides nameservers like:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
3. Go to your domain registrar (e.g., Namecheap)
4. Find **Nameservers** settings
5. Change from "Registrar DNS" to **"Custom DNS"**
6. Add all Netlify nameservers
7. Save changes

**Method 2: External DNS (Keep registrar's nameservers)**

Add these DNS records at your registrar:

| Type | Name/Host | Value | TTL |
|------|-----------|-------|-----|
| CNAME | `www` | `your-site-name.netlify.app` | Auto/3600 |
| A | `@` (root) | `75.2.60.5` | Auto/3600 |

> The Netlify load balancer IP `75.2.60.5` handles root domain routing.

#### Step 3: Wait for DNS Propagation

- DNS changes can take **up to 48 hours** to propagate globally
- Typically completes within **1-4 hours**
- Check status at: [https://dnschecker.org/](https://dnschecker.org/)

### Step 4: Enable HTTPS (SSL Certificate)

Netlify provides **free automatic SSL** via Let's Encrypt:

1. Go to **Domain settings** → **HTTPS**
2. Click **"Provision certificate"** (if not automatic)
3. Wait ~5 minutes for certificate to be issued
4. Your site is now accessible at `https://yourdomain.com`

### Step 5: Configure Redirects

Set up domain redirects in **Domain settings** → **Redirects**:

- **www → root**: Redirect `www.yourdomain.com` to `yourdomain.com`
- **root → www**: Or vice versa
- **Netlify → Custom**: Redirect `your-site.netlify.app` to your custom domain

### Recommended Domain Setup

```
Primary domain:    yourdomain.com
Redirect:          www.yourdomain.com → yourdomain.com
SSL:               Automatic (Let's Encrypt)
DNS:               Netlify DNS (simplest management)
```

---

## 4. Next.js Specific Configuration

### Create `netlify.toml`

Create this file in your project root for Netlify-specific build configuration:

```toml
# netlify.toml

[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NEXT_USE_NETLIFY_EDGE = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "origin-when-cross-origin"
```

### Install the Netlify Next.js Plugin

```bash
npm install -D @netlify/plugin-nextjs
```

This plugin optimizes your Next.js deployment for Netlify's infrastructure.

### Next.js on Netlify: What Works

| Feature | Support | Notes |
|---------|---------|-------|
| **Static pages** | ✅ Full | `getStaticProps`, static exports |
| **Server-side pages** | ✅ Yes | Via Netlify Functions |
| **API routes** | ✅ Yes | Converted to Netlify Functions |
| **Image optimization** | ✅ Yes | Via Netlify Image CDN |
| **Middleware** | ⚠️ Partial | Use Edge Functions instead |
| **ISR** | ✅ Yes | Incremental Static Regeneration |
| **SSR** | ✅ Yes | On-demand builders |

### Important Notes for Next.js

1. **App Router vs Pages Router**: Both work, but App Router requires Next.js 14+
2. **Server Components**: Rendered at build time or via serverless functions
3. **API Routes**: Automatically converted to Netlify Functions
4. **Large builds**: Free tier has 100GB bandwidth/month limit

---

## 5. Troubleshooting

### Build Fails

**Problem**: Build error in Netlify dashboard

**Solutions**:
- Check build logs for specific error messages
- Ensure all dependencies are in `package.json`
- Verify Node version matches locally and on Netlify
- Run `npm run build` locally to catch errors before deploying

### Environment Variables Not Working

**Problem**: App can't access `.env` values

**Solutions**:
- Re-deploy after adding variables (env vars aren't applied to existing builds)
- Prefix with `NEXT_PUBLIC_` for client-side access
- Check variable names match exactly (case-sensitive)

### Form Submissions Not Showing

**Problem**: Forms section shows "No submissions"

**Solutions**:
- Ensure `data-netlify="true"` is in the built HTML
- Verify `<input type="hidden" name="form-name">` exists
- Check that form is on a static page (not server-rendered only)
- For Next.js App Router, create a static HTML version of the form

### Domain Not Working

**Problem**: Custom domain shows error or doesn't load

**Solutions**:
- Wait for DNS propagation (up to 48 hours)
- Verify nameservers are correctly set
- Check DNS records at [https://dnschecker.org/](https://dnschecker.org/)
- Ensure SSL certificate is provisioned

### 404 Errors After Deployment

**Problem**: Pages return 404

**Solutions**:
- Check `publish` directory in build settings is `.next`
- Verify routes work with Next.js routing
- Create `public/_redirects` for redirect rules if needed

---

## Quick Reference Checklist

### Pre-Deployment
- [ ] Push code to GitHub
- [ ] Create `netlify.toml` file
- [ ] Install `@netlify/plugin-nextjs`
- [ ] Remove `.env.local` from commits (verify `.gitignore`)

### Deployment
- [ ] Connect repository to Netlify
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy and verify site works

### Forms
- [ ] Add `data-netlify="true"` to forms
- [ ] Include hidden `form-name` input
- [ ] Add honeypot field for spam protection
- [ ] Create success/redirect page
- [ ] Enable email notifications

### Domain
- [ ] Purchase domain
- [ ] Add domain in Netlify
- [ ] Configure DNS (nameservers or records)
- [ ] Wait for propagation
- [ ] Verify HTTPS is active
- [ ] Set up www/root redirects

---

## Useful Links

- **Netlify Dashboard**: [https://app.netlify.com/](https://app.netlify.com/)
- **Netlify Docs**: [https://docs.netlify.com/](https://docs.netlify.com/)
- **Netlify Forms Docs**: [https://docs.netlify.com/forms/setup/](https://docs.netlify.com/forms/setup/)
- **Next.js on Netlify**: [https://docs.netlify.com/frameworks/next-js/overview/](https://docs.netlify.com/frameworks/next-js/overview/)
- **DNS Checker**: [https://dnschecker.org/](https://dnschecker.org/)
- **Netlify Status**: [https://www.netlifystatus.com/](https://www.netlifystatus.com/)

---

*Last updated: April 2026*
