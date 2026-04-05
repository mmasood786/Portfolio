<<<<<<< HEAD
=======
<<<<<<< HEAD
# Portfolio
=======
>>>>>>> 9746ec8 (add a netlify form functionality)
# WebCraft Pro - Professional Portfolio Website

A high-converting, modern portfolio website for a freelance web developer with 6 years of experience. Built with **Next.js**, **FastAPI**, and **PostgreSQL**.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-009688) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4)

## 🎯 Features

### Website Sections
- **Hero Section** - Strong value proposition with animated background and CTAs
- **Services** - 5 services explained in simple, non-technical language
- **Portfolio** - 3 demo projects with Problem → Solution → Result format
- **Process** - Clear 3-step process (Audit → Design → Launch)
- **Voice AI Agent** - Dedicated section explaining AI customer service
- **Free Website Audit** - Lead generation form with validation
- **Contact** - Email + WhatsApp integration

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
- ✅ PostgreSQL database for lead storage
- ✅ FastAPI backend (optional, for separate deployment)
- ✅ API routes with validation
- ✅ Form validation and error handling
- ✅ SEO optimized with metadata

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional - app works without it in dev mode)
- Python 3.9+ (for FastAPI backend, optional)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd "C:\Projects\Ai-Agent\201-PO04\Vibe Coding\Portfolio"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   copy .env.example .env.local
   
   # Edit .env.local with your PostgreSQL connection string
   # DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   ```

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
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page composing all sections
│   │   ├── globals.css         # Global styles and custom CSS
│   │   └── api/
│   │       └── audit/
│   │           └── route.ts    # API endpoint for audit form
│   └── components/
│       ├── Navbar.tsx          # Responsive navigation bar
│       ├── Hero.tsx            # Hero section with CTAs
│       ├── Services.tsx        # Services offered
│       ├── Portfolio.tsx       # Demo projects showcase
│       ├── Process.tsx         # 3-step process explanation
│       ├── AIAgent.tsx         # Voice AI Agent service
│       ├── AuditForm.tsx       # Lead generation form
│       ├── Contact.tsx         # Contact information
│       └── Footer.tsx          # Footer with links
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── schema.sql              # Database schema
│   └── .env.example            # Environment variables example
├── public/                     # Static assets
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

## 🗄️ Database Setup (PostgreSQL)

1. **Create the database**
   ```sql
   CREATE DATABASE portfolio;
   ```

2. **Run the schema**
   ```bash
   psql -U your_username -d portfolio -f backend/schema.sql
   ```

3. **Update your .env.local**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio
   ```

**Note**: The application works without PostgreSQL in development mode. Form submissions are logged to the console.

## 🔌 FastAPI Backend (Optional)

If you want to deploy the FastAPI backend separately:

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. **Access API docs**
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

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

<<<<<<< HEAD
**Built with ❤️ for local businesses that deserve great websites**
=======
**Built with ❤️ for local businesses that deserve great websites**
>>>>>>> ab22031 (Add a portfolio)
>>>>>>> 9746ec8 (add a netlify form functionality)
