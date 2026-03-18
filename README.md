# Frontend Azure — Microservices App

A microservices-based web application with a **Next.js frontend** and an **Express.js API gateway**, designed for deployment on Azure.

---

## Tech Stack

| Layer    | Technology                                          |
| -------- | --------------------------------------------------- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4    |
| Gateway  | Express.js 4, Node.js                               |
| Styling  | Tailwind CSS 4 (via `@tailwindcss/postcss`), Geist font |
| Tooling  | ESLint 9, PostCSS, Docker                           |

---

## Folder Structure

```
frontend-azure/
├── .gitignore                  # Root-level git ignore rules
├── README.md                   # Project documentation (this file)
│
├── frontend/                   # Next.js frontend application
│   ├── app/                    # Next.js App Router directory
│   │   ├── favicon.ico         # Site favicon
│   │   ├── globals.css         # Global styles & Tailwind CSS config
│   │   ├── layout.tsx          # Root layout (fonts, metadata, HTML shell)
│   │   └── page.tsx            # Home page (API health check UI)
│   ├── public/                 # Static assets served at root URL
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── .env.example            # Environment variable template
│   ├── .env.local              # Local environment overrides (git-ignored)
│   ├── .gitignore              # Frontend-specific git ignore
│   ├── eslint.config.mjs       # ESLint flat config (Next.js + TypeScript)
│   ├── next.config.ts          # Next.js configuration
│   ├── next-env.d.ts           # Next.js TypeScript declarations
│   ├── package.json            # Frontend dependencies & scripts
│   ├── package-lock.json       # Locked dependency versions
│   ├── postcss.config.mjs      # PostCSS config (Tailwind CSS plugin)
│   └── tsconfig.json           # TypeScript compiler options
│
└── gateway/                    # Express.js API gateway service
    ├── server.js               # Gateway entry point (health & root endpoints)
    ├── Dockerfile              # Docker build config for gateway
    ├── .gitignore              # Gateway-specific git ignore
    ├── package.json            # Gateway dependencies & scripts
    └── package-lock.json       # Locked dependency versions
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized gateway)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend-azure
```

### 2. Setup the Gateway

```bash
cd gateway
npm install
node server.js
```

The gateway starts on **http://localhost:3000** with the following endpoints:

| Endpoint  | Method | Description             |
| --------- | ------ | ----------------------- |
| `/`       | GET    | Returns gateway status  |
| `/health` | GET    | Health check (`{ status: "ok" }`) |

### 3. Setup the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

Copy the environment template and adjust if needed:

```bash
cp .env.example .env.local
```

Edit `.env.local` to point to your gateway:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend runs on **http://localhost:3001** (Next.js auto-selects the next available port if 3000 is taken by the gateway).

---

## Available Scripts

### Frontend (`frontend/`)

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start development server           |
| `npm run build` | Create production build            |
| `npm run start` | Start production server            |
| `npm run lint`  | Run ESLint checks                  |

### Gateway (`gateway/`)

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `node server.js` | Start the gateway server           |

---

## Docker (Gateway)

Build and run the gateway in a Docker container:

```bash
cd gateway
docker build -t gateway .
docker run -p 3000:3000 gateway
```

---

## Environment Variables

### Frontend

| Variable              | Description                  | Default                  |
| --------------------- | ---------------------------- | ------------------------ |
| `NEXT_PUBLIC_API_URL`  | Gateway API base URL         | `http://localhost:3000`  |

> **Note:** Copy `.env.example` to `.env.local` for local development. Never commit `.env.local` to version control.

---

## How It Works

1. The **Gateway** is a lightweight Express.js server that exposes API endpoints (currently a health check).
2. The **Frontend** is a Next.js app that communicates with the gateway via the `NEXT_PUBLIC_API_URL` environment variable.
3. The home page provides a **"Check Backend"** button that calls the gateway's `/health` endpoint and displays the connection status.

---

## Deployment

- **Gateway**: Deployable as a Docker container on Azure Container Apps, Azure App Service, or any container platform.
- **Frontend**: Deployable on Vercel, Azure Static Web Apps, or any Node.js hosting platform.

---

## License

ISC
