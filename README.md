# CurriculumAI — Strathmore University Pilot

AI-powered curriculum enhancement platform for higher education. Built by Tech Mindset Africa.

## Live Demo Modules

| Module | Description |
|---|---|
| **Study Companion** | Live AI chatbot grounded in course materials. Powered by Claude. |
| **Lecturer Dashboard** | Comprehension heatmap, at-risk flags, auto session brief, trend chart. |
| **Governance Dashboard** | CUE compliance health check, KNQF mapping, accreditation readiness. |

---

## Deploy to Vercel in 5 minutes

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "CurriculumAI POC v1"
git remote add origin https://github.com/YOUR_USERNAME/curriculumai.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `curriculumai` repository
4. Click **Deploy** — Vercel auto-detects Next.js

### Step 3 — Add API Key

1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (from console.anthropic.com)
   - **Environment:** Production, Preview, Development
3. Click **Save** then **Redeploy**

Your live URL will be: `https://curriculumai.vercel.app` (or similar)

---

## Run Locally

```bash
# Clone and install
npm install

# Create local env file
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Start dev server
npm run dev
# Open http://localhost:3000
```

---

## Project Structure

```
app/
├── api/
│   └── chat/route.ts          # Claude API streaming endpoint
├── components/
│   ├── Header.tsx              # App header with Strathmore branding
│   ├── NavTabs.tsx             # Module navigation tabs
│   ├── StudyCompanion.tsx      # Live AI chat module
│   ├── LecturerDashboard.tsx   # Analytics & session brief module
│   └── GovernanceDashboard.tsx # CUE compliance module
├── globals.css                 # Global styles
├── layout.tsx                  # Root layout
└── page.tsx                    # Main page / tab controller
```

---

## Courses Supported (Study Companion)

- **SBS 201** — Financial Accounting (Prof. Mwangi)
- **SBS 102** — Business Statistics (Prof. Kariuki)
- **SBS 110** — Principles of Management (Dr. Omondi)
- **ECO 201** — Microeconomics (Dr. Njagi)

To add more courses, edit the `COURSE_CONTEXTS` object in `app/api/chat/route.ts`.

---

## Programmes Supported (Governance Dashboard)

- BCom — Strathmore Business School
- BSc Computer Science — SCES
- LLB Law — Strathmore Law School

To add more programmes, edit the `PROGRAMMES` object in `app/components/GovernanceDashboard.tsx`.

---

Built with Next.js 14 · Anthropic Claude · Chart.js · Tailwind CSS
