# Frontend Azure — Microservices App

A microservices-based web application with a **Next.js frontend** and an **Express.js API gateway**, specifically optimized for deployment on Azure.

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
├── frontend/                   # Next.js frontend application (Static Export)
│   ├── build/                  # Static export output (after build)
│   ├── app/                    # Next.js App Router directory
│   │   ├── favicon.ico         # Site favicon
│   │   ├── globals.css         # Global styles & Tailwind CSS config
│   │   ├── layout.tsx          # Root layout (fonts, metadata, HTML shell)
│   │   └── page.tsx            # Home page (API health check UI)
│   ├── public/                 # Static assets served at root URL
│   ├── .env.example            # Environment variable template
│   ├── .env.local              # Local environment overrides (git-ignored)
│   ├── .gitignore              # Frontend-specific git ignore
│   ├── eslint.config.mjs       # ESLint flat config (Next.js + TypeScript)
│   ├── next.config.ts          # Next.js configuration (output: 'export')
│   ├── next-env.d.ts           # Next.js TypeScript declarations
│   ├── package.json            # Frontend dependencies & scripts
│   ├── package-lock.json       # Locked dependency versions
│   ├── postcss.config.mjs      # PostCSS config (Tailwind CSS plugin)
│   └── tsconfig.json           # TypeScript compiler options
│
└── gateway/                    # Express.js API gateway service
    ├── server.js               # Gateway entry point (health & root endpoints)
    ├── Dockerfile              # Docker build config for gateway (Non-root user)
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
cd frontend-azure
```

### 2. Setup the Gateway

```bash
cd gateway
npm install
node server.js
```

The gateway starts on **http://localhost:3000** by default (or set `PORT` env var).

| Endpoint  | Method | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| `/`       | GET    | Returns service info and available endpoints     |
| `/health` | GET    | Health check (`{ status: "ok", timestamp: ... }`) |

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

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start development server                             |
| `npm run build` | Create static production build in `build/` directory |
| `npm run lint`  | Run ESLint checks                                    |

### Gateway (`gateway/`)

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm start`      | Start the gateway server           |
| `npm run dev`    | Start with nodemon (auto-reload)   |

---

## Docker (Gateway)

Build and run the gateway in a Docker container (using non-root user for security):

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

---

## Deployment

- **Gateway**: Deployable as a Docker container on **Azure Container Apps** or **Azure App Service**.
- **Frontend**: Deployable as an **Azure Static Web App** (SWA). Configuration is set to static export in `next.config.ts`.

---

## License

ISC
