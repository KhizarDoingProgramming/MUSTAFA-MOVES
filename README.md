# 🏋️ MustafaMoves

> AI-powered fitness coach that actually gets you. No cap.

[![Live Demo](https://img.shields.io/badge/LIVE-mustafamoves.vercel.app-gold?style=for-the-badge&logo=vercel)](https://mustafamoves.vercel.app)

---

## ✨ what's this?

**MustafaMoves** is a full-stack fitness app built with Next.js 16. Talk to **Mstfa** — your personal AI coach — and get custom workout plans, track progress, and level up. All with a dark, aesthetic UI inspired by kerna.studio.

### 🔥 features

- **AI Coach Mstfa** — chat with an AI that builds plans around *your* goals, not some generic template
- **Exercise Library** — 100+ exercises with form guides, sets, reps, and rest times
- **Smart Workout Generator** — age, weight, height, goal → weekly plan in seconds
- **Dashboard** — streaks, calories, workout history, AI recommendations
- **PDF Export** — download your plans and take 'em to the gym
- **Dark Aesthetic** — gold accents, smooth animations, Instrument Sans font

---

## 🛠️ stack

| what | who |
|------|-----|
| Framework | Next.js 16 (App Router) |
| Auth + DB | Firebase Auth + Firestore |
| AI | Groq API (llama-3.3-70b) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Fonts | Instrument Sans, Space Grotesk, Inter |
| Hosting | Vercel |

---

## 🚀 getting started

```bash
git clone https://github.com/KhizarDoingProgramming/MUSTAFA-MOVES.git
cd MUSTAFA-MOVES
npm install
```

### env vars

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GROQ_API_KEY=
```

### run it

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

---

## 📦 images

Drop exercise & auth images into `public/images/` matching the structure in [`images.md`](./images.md). Already uploaded in this repo.

---

## 🌐 live

👉 **[mustafamoves.vercel.app](https://mustafamoves.vercel.app)**

---

built with intensity by [@KhizarDoingProgramming](https://github.com/KhizarDoingProgramming)
