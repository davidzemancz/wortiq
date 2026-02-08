# AI Freelancer Marketplace

AI-powered freelancer marketplace demo for the Czech market. Describe your project in natural language and AI will analyze requirements, break them into tasks, suggest an optimal team of freelancers, and create a project plan with budget and timeline.

## 🚀 Live Demo

**[View Live Demo →](https://davidzemancz.github.io/wortiq/)**

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Zustand
- **Data:** Mock data (no backend needed for demo)

## Setup

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ai-freelancer-marketplace

# Install client dependencies
cd client && npm install
cd ..
```

### Development

```bash
# Run the demo
npm run dev
```

- Open: http://localhost:5173
- **Instant results** - uses mock data, no backend needed!

### Build for Production

```bash
# Build optimized static files
npm run build

# Preview production build
npm run preview
```

Built files will be in `client/dist/` - ready to deploy to any static host.

### Deploy to GitHub Pages

```bash
# Deploy to gh-pages branch
cd client
npx gh-pages -d dist -e wortiq
```

The app will be available at: `https://davidzemancz.github.io/wortiq/`
