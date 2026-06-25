# MustafaMoves

**AI-Powered Fitness Coach — Personalized training plans, real-time AI coaching, and progress tracking, all wrapped in a premium dark-aesthetic experience.**

[![Live Demo](https://img.shields.io/badge/LIVE-mustafamoves.vercel.app-gold?style=for-the-badge&logo=vercel)](https://mustafamoves.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

MustafaMoves is a full-stack fitness application built on Next.js 16 with the App Router. Users interact with **Mstfa**, an AI fitness coach powered by Groq's LLaMA 3.3 70B model, to generate customized workout plans, ask fitness-related questions, track progress, and export their plans as PDF documents. The application features a dark, minimal aesthetic with gold accents, smooth Framer Motion animations, Firebase authentication, and Firestore-based data persistence.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Navbar   │  │   Chat   │  │Generator  │  │Dashboard│ │
│  │ (Overlay  │  │  (AI     │  │ (Form →   │  │ (Stats, │ │
│  │  Menu)    │  │   Chat)  │  │  Plan)    │  │ History)│ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Shared Components (Navbar, FloatingAI)   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Firestore│  │ Firebase  │  │   Groq   │               │
│  │  (Plans, │  │   Auth    │  │   API    │               │
│  │ Workouts)│  │           │  │ (LLaMA)  │               │
│  └──────────┘  └──────────┘  └──────────┘               │
└─────────────────────────────────────────────────────────┘
```

### Route Structure

| Route | Description |
|---|---|
| `/` | Landing page with hero, features grid, stats, and CTA |
| `/chat` | AI chat interface with Mstfa |
| `/workout-generator` | Multi-step form → personalized weekly plans |
| `/exercise-library` | 100+ exercises with filters and form guides |
| `/exercise-guide` | In-depth exercise demonstration page |
| `/dashboard` | User dashboard with stats, history, and AI insights |
| `/login` | Email/password authentication |
| `/signup` | User registration with profile creation |
| `/settings` | User profile editing |

---

## Technology Stack

### Framework & Language

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework, server components, file-based routing |
| **React 19** | UI component library |
| **TypeScript 5** | Static type checking across the entire codebase |

### Styling & Animation

| Technology | Purpose |
|---|---|
| **Tailwind CSS v4** | Utility-first CSS framework with custom design tokens |
| **Framer Motion 12** | Declarative animations, gestures, and layout transitions |
| **CSS Blend Modes** | `mix-blend-difference` for the fixed navbar overlay effect |

### Authentication & Database

| Technology | Purpose |
|---|---|
| **Firebase Authentication** | Email/password user authentication |
| **Cloud Firestore** | NoSQL document database for user profiles, workout plans, and history |

### Artificial Intelligence

| Technology | Purpose |
|---|---|
| **Groq API** | Low-latency LLM inference |
| **LLaMA 3.3 70B (Groq)** | AI model powering Mstfa's fitness coaching |
| **`groq-sdk`** | Official Groq TypeScript SDK |

### Utilities

| Technology | Purpose |
|---|---|
| **`clsx` + `tailwind-merge`** | Conditional class name merging via `cn()` utility |
| **`lucide-react`** | Lightweight, consistent icon library |
| **`jsPDF`** | Client-side PDF generation for workout plan export |

### Fonts

| Font | Usage |
|---|---|
| **Instrument Sans** | Primary body text |
| **Space Grotesk** | Headings (h1, h2, h3) |
| **Inter** | Fallback/body text variable |

---

## Features in Detail

### 1. AI Coach Mstfa (`/chat`)

A real-time conversational AI coach powered by Groq's LLaMA 3.3 70B model. The chat interface includes:

- **System-tuned personality**: Mstfa speaks with an energetic, motivational Gen-Z tone using a custom system prompt
- **Structured responses**: Workout plans are formatted with days, exercises, sets, reps, and rest periods
- **Loading state**: Animated typing indicator during AI response generation
- **Quick suggestions**: Pre-built prompts for muscle gain, fat loss, beginner tips, and nutrition
- **Error handling**: Graceful fallback messages if the API call fails

### 2. Workout Generator (`/workout-generator`)

A multi-step form that generates personalized weekly workout plans:

- **Step 1 — Personal Details**: Age, weight, and height inputs
- **Step 2 — Goals & Level**: Select from Muscle Gain, Fat Loss, Strength, or General Fitness, plus Beginner / Intermediate / Advanced
- **Step 3 — Generated Plan**: Displays a weekly schedule with exercises, sets, reps, and rest periods
- **Adjusts by goal**: Fat loss plans use higher reps with shorter rest; strength plans use lower reps with longer rest
- **Adjusts by level**: Beginners get 3 days/week, Intermediate 4 days, Advanced 5 days
- **PDF export**: Downloads a styled PDF using jsPDF
- **Firestore persistence**: Automatically saves generated plans to the user's Firestore document

### 3. Exercise Library (`/exercise-library`)

Curated database of 12 exercises with full metadata:

- **Target muscles**: Each exercise lists primary muscle groups
- **Difficulty tiers**: Beginner, Intermediate, and Advanced
- **Form instructions**: Step-by-step execution guides
- **Visual aids**: Exercise-specific images from the asset library
- **Filtering**: By muscle group and difficulty level
- **Sets, reps, rest**: Structured prescription data

### 4. Dashboard (`/dashboard`)

User progress tracking with Firestore-backed statistics:

- **Stats cards**: Calories burned, total workouts, streak count, and fitness level
- **Recent workouts**: Chronological log of completed workouts with calories and duration
- **Empty state**: AI-themed empty state with a CTA to generate a first plan
- **Profile-aware**: Greets the user by name if available

### 5. Authentication

Firebase-powered auth with full sign-up and login flows:

- **Sign Up**: Creates a Firebase Auth user + Firestore profile document with default values
- **Login**: Email/password authentication
- **Session persistence**: Firebase `onAuthStateChanged` listener in a React context provider
- **Profile management**: Settings page allows updating age, weight, height, goal, and level

### 6. UI/UX Design

- **Dark-first**: The layout always renders in dark mode with `#0d0d0d` background
- **Gold accent palette**: Custom CSS variables (`--color-accent: #d4a853`) define the accent color
- **Kerna-inspired menu**: Full-screen overlay navigation with staggered link animations
- **Parallax hero**: Scroll-driven opacity and scale transforms on the hero section
- **Marquee ticker**: Auto-scrolling text banner with gym-culture phrases
- **Blur effects**: Radial gradients and backdrop blur for depth
- **Reveal animations**: Scroll-triggered intersection observer animations throughout the page

---

## Project Structure

```
├── public/
│   └── images/
│       ├── hero/          # Gym, preview, CTA backgrounds
│       ├── exercises/     # 12 exercise demonstration images
│       ├── guide/         # Exercise guide hero
│       ├── auth/          # Login/signup backgrounds
│       └── robot/         # Mstfa AI avatar
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout (fonts, providers, metadata)
│   │   ├── page.tsx       # Landing page
│   │   ├── globals.css    # Tailwind config, CSS variables, utilities
│   │   ├── icon.svg       # SVG favicon (M logo)
│   │   ├── chat/          # AI chat interface
│   │   ├── dashboard/     # User dashboard
│   │   ├── workout-generator/  # Plan generator
│   │   ├── exercise-library/   # Exercise browser
│   │   ├── exercise-guide/     # Exercise detail guide
│   │   ├── login/         # Authentication
│   │   ├── signup/        # Registration
│   │   └── settings/      # Profile editing
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Fixed navbar with overlay menu
│   │   │   ├── PageTransition.tsx  # Page enter/exit animations
│   │   │   └── FloatingAIButton.tsx  # Persistent AI chat FAB
│   │   └── ui/
│   │       └── index.tsx  # Shared UI components (Input, etc.)
│   ├── data/
│   │   ├── exercises.ts   # Exercise definitions, plan generator
│   │   └── images.ts      # Image path constants
│   ├── hooks/
│   │   ├── useAuth.tsx    # Auth context provider + hook
│   │   └── useTheme.tsx   # Theme context provider + hook
│   └── lib/
│       ├── firebase.ts    # Firebase initialization (lazy singletons)
│       ├── auth-service.ts # Auth API (signUp, logIn, logOut, profile)
│       ├── groq.ts        # Groq AI client (server action)
│       └── utils.ts       # cn() class merge utility
├── .env.local.example      # Environment variable template
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind v4 configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Performance & Optimization

- **Static generation**: All routes are pre-rendered as static HTML at build time
- **Lazy Firebase initialization**: Firebase app, auth, and Firestore instances are created lazily on first access
- **Server Actions**: Groq API calls are isolated to server-side execution via `"use server"` directives
- **Optimized fonts**: Google Fonts are loaded with `display: swap` to prevent layout shift
- **CSS variables**: Design tokens are centralized in `globals.css` via Tailwind's `@theme` directive
- **Conditional rendering**: `AnimatePresence` ensures animated components are unmounted when not visible
- **Type safety**: Full TypeScript coverage across data models, API responses, and component props

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project (Auth + Firestore enabled)
- A Groq API key

### Installation

```bash
git clone https://github.com/KhizarDoingProgramming/MUSTAFA-MOVES.git
cd MUSTAFA-MOVES
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and populate the values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `GROQ_API_KEY` | Groq API key (server-side only) |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Deployment

The application is deployed on [Vercel](https://vercel.com). To deploy your own instance:

1. Push the repository to GitHub
2. Import the project in Vercel
3. Configure the environment variables listed above
4. Deploy

---

## Asset Structure

Exercise and auth images should be placed in `public/images/` following the directory structure defined in `src/data/images.ts`. See [`images.md`](./images.md) for the complete asset manifest.

---

## License

MIT

---

Built with intensity by [@KhizarDoingProgramming](https://github.com/KhizarDoingProgramming).
