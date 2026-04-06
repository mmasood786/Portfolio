
# Portfolio

A high-converting, modern portfolio website for a freelance web developer. Built with **Next.js**, **Supabase**, and **TypeScript**.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6)

## 🎯 Features

### Website Sections
- **Hero Section** - Strong value proposition with animated background and CTAs
- **Services** - 5 services explained in simple, non-technical language
- **Portfolio** - 3 demo projects with Problem → Solution → Result format
- **Process** - Clear 3-step process (Audit → Design → Launch)
- **Voice AI Agent** - Dedicated section explaining AI customer service
- **Free Website Audit** - Lead generation form with Supabase storage
- **Contact** - Email + WhatsApp integration with form storage
- **Project Brief** - Multi-step form for detailed project requirements

### Design & UX
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Clean, modern, professional UI
- ✅ Conversion-focused layout
- ✅ Smooth scrolling animations (Framer Motion)
- ✅ Hover effects and micro-interactions
- ✅ Animated gradient backgrounds
- ✅ Glass morphism effects
- ✅ Fast loading and optimized performance

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Framer Motion for animations
- ✅ Supabase (PostgreSQL) for lead storage
- ✅ API routes with validation
- ✅ Three integrated forms (Audit, Contact, Project Brief)
- ✅ Form validation and error handling
- ✅ Loading states and success feedback
- ✅ SEO optimized with metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier is sufficient)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd "C:\Projects\Ai-Agent\201-PO04\Vibe Coding\Portfolio"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   Follow the complete guide in [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)
   
   Quick setup:
   - Create a Supabase project at https://app.supabase.com
   - Run the SQL schema from `supabase-schema.sql` in Supabase SQL Editor
   - Copy `.env.example` to `.env.local` and add your Supabase credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Main page composing all sections
│   │   ├── globals.css             # Global styles and custom CSS
│   │   └── api/
│   │       ├── audit/
│   │       │   └── route.ts        # Audit form API endpoint
│   │       ├── contact/
│   │       │   └── route.ts        # Contact form API endpoint
│   │       └── project-brief/
│   │           └── route.ts        # Project brief API endpoint
│   ├── lib/
│   │   ├── supabase.ts             # Browser Supabase client
│   │   └── supabase-server.ts      # Server Supabase client
│   └── components/
│       ├── Navbar.tsx              # Responsive navigation bar
│       ├── Hero.tsx                # Hero section with CTAs
│       ├── Services.tsx            # Services offered
│       ├── Portfolio.tsx           # Demo projects showcase
│       ├── Process.tsx             # 3-step process explanation
│       ├── AIAgent.tsx             # Voice AI Agent service
│       ├── AuditForm.tsx           # Lead generation form
│       ├── Contact.tsx             # Contact information + form
│       ├── ProjectBriefForm.tsx    # Multi-step project brief form
│       └── Footer.tsx              # Footer with links
├── public/                         # Static assets
├── supabase-schema.sql             # Database schema for Supabase
├── SUPABASE_INTEGRATION.md         # Complete Supabase setup guide
├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## 🎨 Color Theme

The website uses a professional, eye-catching color scheme:

- **Primary**: Purple/Indigo (`#6875f5` - `#4c3dd8`)
- **Accent**: Orange (`#f97316` - `#ea580c`)
- **Dark**: Slate (`#0f172a` - `#1e293b`)
- **Success**: Green for positive feedback
- **Clean whites and light grays** for backgrounds

## 🛠️ Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🗄️ Database Setup (Supabase)

See the complete guide in [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)

**Quick steps:**
1. Create a Supabase project at https://app.supabase.com
2. Run the SQL schema from `supabase-schema.sql` in Supabase SQL Editor
3. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

**Note:** The application requires Supabase credentials to run. Get your free project at https://supabase.com

## 🌐 Deployment

### Vercel (Recommended for Next.js)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
# Build
docker build -t webcraft-portfolio .

# Run
docker run -p 3000:3000 webcraft-portfolio
```

### Traditional Server

```bash
npm run build
npm run start
```

## 📝 Customization

### Update Contact Information
Edit these files:
- `src/components/Contact.tsx` - Email and WhatsApp links
- `src/components/Footer.tsx` - Social links
- `src/components/Navbar.tsx` - Brand name

### Change Colors
Edit `tailwind.config.ts` and modify the color palette.

### Update Portfolio Projects
Edit `src/components/Portfolio.tsx` and update the `projects` array.

### Modify Services
Edit `src/components/Services.tsx` and update the `services` array.

## 🎯 Conversion Optimization Features

1. **Multiple CTAs** - "Get Free Website Audit" buttons throughout
2. **Social Proof** - Stats, testimonials, and case studies
3. **Clear Value Proposition** - Focus on business results, not features
4. **Simple Language** - No technical jargon
5. **Trust Signals** - 100% satisfaction rate, response times
6. **Lead Capture** - Free audit offer with minimal friction
7. **Multiple Contact Methods** - Email, WhatsApp, contact form

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- XSS protection headers
- Content-Type-Options header
- Referrer-Policy header
- Form validation (client & server-side)
- Environment variables for sensitive data
- SQL injection prevention (parameterized queries)

## 📊 Performance

- Lighthouse score targets:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

## 🤝 Support

For questions or issues:
- Email: hello@webcraftpro.com
- WhatsApp: [Send Message](https://wa.me/1234567890)

## 📄 License

This project is proprietary. All rights reserved.

---


