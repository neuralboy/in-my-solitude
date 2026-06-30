# 🏺 In My Solitude | A Digital Library of Awakening

A high-fidelity, atmospheric digital sanctuary for preserved history, esoteric knowledge, and suppressed manuscripts. Built for the seeker who knows that in the age of noise, silence is where the truth is finally heard.

---

### [🕯️ Enter the Stacks](http://localhost:3000)

---

## 🏛️ Project Architecture

In My Solitude is more than a book repository; it is a curated experience designed to mirror the physical sensation of walking through a private, candlelit archive.

### 🌓 Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom "Archival" Dark Theme)
- **Database:** [Supabase](https://supabase.com/) (Postgres + Row Level Security)
- **Authentication:** Supabase Auth (Magic Link & OAuth)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Ethereal transitions & micro-interactions)
- **Email:** [Resend](https://resend.com/) (Automated Curator Notifications via Edge Functions)

---

## 🗝️ Core Features

### 📖 The Archive (Stacks)
A live-filtering interface for public manuscripts. Optimized for discovery with "Discipline" pillars (Consciousness, History, Esoteric Arts, etc.).

### 🛡️ The Vault
A restricted collection of highly sensitive or suppressed volumes. Access is not automatic; users must submit a "Solicitation for Entry" detailing their intent, which is manually reviewed by the Curator.

### ✍️ The Request Desk
A dual-column community hub. Users can "Find a Book" (request missing titles) or "Donate a Book" (upload their own digitized PDFs for review).

### 🖥️ Curator Console (Admin)
A secure management suite featuring:
- **Vault Queue:** Approve/Deny entry solicitations.
- **Book Manager:** Full control over the master catalog and metadata.
- **Donation Review:** Inspect and publish user-submitted PDFs.
- **Request Inbox:** Direct community communication monitoring.

---

## 🕯️ Deployment & Setup

### 1. Prerequisites
- [Node.js 18+](https://nodejs.org/)
- A [Supabase](https://supabase.com/) account.
- A [Resend](https://resend.com/) API Key.

### 2. Local Installation
```bash
# Clone the repository
git clone https://github.com/neuralboy/in-my-solitude.git

# Install dependencies
npm install

# Set up your environment
cp .env.example .env.local
```

### 3. Database Setup (Supabase)
Navigate to the `/supabase/migrations/` folder and execute the SQL migrations in order within your Supabase SQL Editor. This will set up:
- `books` & `categories` tables.
- `profiles` & `user_roles`.
- `vault_access_requests`.
- `Row Level Security (RLS)` policies for secure access.

### 4. Run the Dev Server
```bash
npm run dev
# The library will be live on http://localhost:3000
```

---

## ⚖️ Manifesto

"The purpose of this archive is not to provide facts, but to provide paths. We preserve what is often forgotten or intentionally suppressed, believing that every seeker deserves access to the tools of their own awakening. We do not monetize. We do not gatekeep. We simply facilitate the return to Solitude."

---

*Built with care by Antigravity and the In My Solitude Community.*
