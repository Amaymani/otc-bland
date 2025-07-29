
# 🧠 otc-bland

## NOTE:
I have already added the required keys. But please be sure to use your Bland API key, since I have exhausted my credits.
Bland ai only provides 2USD of credits, 100 calls/day is just the rate limit. 
Without credits, it works well, but sometimes latency increases unexpectedly.

App demo: [Link](https://drive.google.com/file/d/1pZctiZXSQhryfjBvCkOOU_eMQe_e7W-t/view?usp=sharing)
Code demo: [Link](https://drive.google.com/file/d/1VL-aOLtlJAKOMX195zJaoHCCJaX0sWGl/view?usp=sharing)


---

## 🚀 Features

- ✅ Create your OTC order using AI.
- 🔐 Secure Authentication (NextAuth) 
- 📡 API integration for agent communication
- 🎨 Fully responsive, modern UI using Tailwind CSS
- 🧱 Modular component architecture
- 💽 MongoDB integration for user persistence

---

## 🗂️ Project Structure

```bash
amaymani-otc-bland/
├── app/                         # Next.js App Router pages and API routes
│   ├── api/                     # Backend API routes
│   │   ├── add-agent/           # Endpoint to create Bland agent
│   │   ├── auth/                # Auth route using NextAuth
│   │   └── get-agent-data/      # Fetches Bland agent info
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # App layout wrapper
│   └── page.tsx                 # Home page
│
├── components/                 # Reusable UI components
│   ├── magicui/                # Fancy Dock UI effect
│   └── ui/                     # Common UI primitives (Button, Card, Input, etc.)
|   ├── Call.tsx                # Initiates the AI conversation
│   ├── Dock.tsx                # Dock Component
│   ├── Hero.tsx                # Hero Component
│   ├── Modetoggle.tsx
│   ├── Navbar.tsx
│   ├── OrderDetail.tsx         # fetches the REAL-TIME price from exchange platforms (Uses APIs of individual choices)
│
├── config/
│   └── mongo-db.js             # MongoDB connection config
│
├── lib/
│   ├── AuthProvider.tsx        # Session auth wrapper
│   └── models/
│       └── BlandUsers.js       # User model schema
│
├── types/
│   └── index.ts                # Global TypeScript types
│
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS setup
├── components.json             # Component index
└── README.md                   # Project documentation (this file)
````

---

## ⚙️ Tech Stack

* **Frontend**: Next.js 14 (App Router), Tailwind CSS
* **Backend**: Next.js API Routes, Bland API
* **Auth**: NextAuth.js
* **Database**: MongoDB (via Mongoose)
* **AI**: Bland AI
* **Language**: TypeScript

---

## 🧪 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Amaymani/otc-bland
cd amaymani-otc-bland
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BLAND_API_KEY=
BLAND_API_KEY=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=amayhaimeranaam
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_AGENT_ID=
WEBHOOK_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Amay Mani**
🔗 [GitHub](https://github.com/Amaymani) | 💼 [LinkedIn](https://www.linkedin.com/in/amaymanitripathi/) | ✉️ [Email](mailto:amaytripathi19@gmail.com)

---

> Built with ❤️ to explore the power of AI Agents.

```
