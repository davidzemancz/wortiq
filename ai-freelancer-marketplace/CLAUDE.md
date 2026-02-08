# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered freelancer marketplace demo for the Czech market. Users describe projects in natural language (Czech), and Claude API analyzes requirements, breaks them into tasks, suggests optimal freelancer teams, and creates project plans with budgets and timelines. Built as an investor demo/prototype.

**Key differentiator:** AI orchestration vs. traditional marketplaces (Fiverr/Upwork).

## Architecture

### Simple Frontend-Only Demo

```
root/
├── client/          # React frontend (Vite) - everything runs here
└── package.json     # Simple scripts to run the demo
```

**No backend needed!** All data is mocked in the frontend for instant demo experience.

### Frontend Architecture (client/)

**State Management:** Zustand stores (not Redux)
- `projectStore.js` - Project input → AI analysis → Dashboard state flow
- `uiStore.js` - UI state (modals, toasts, mobile menu)

**Data Flow (Demo Mode):**
1. User input (ProjectInputForm) → projectStore
2. Store generates mock analysis instantly (2s simulated delay)
3. Mock data → `analysisResult` in store
4. Analysis page renders + matches freelancers from mock data
5. Dashboard initializes from `analysisResult` via `initDashboard()`

**Component Organization:**
- `components/ui/` - 11 reusable components (Button, Card, Badge, Input, etc.)
- `components/layout/` - Navbar, Footer, PageTransition (Framer Motion)
- `components/[feature]/` - Feature-specific components (landing, project, analysis, dashboard, freelancers)
- `pages/` - Route-level pages (5 total)

**Mock Data Location:** `client/src/data/`
- `freelancers.js` - 18 Czech freelancer profiles
- `exampleProjects.js` - 4 pre-filled project examples
- `skills.js` - Skill categories and filtering helpers
- `testimonials.js` - 3 testimonial cards

**Routing:** React Router 6 with AnimatePresence for page transitions

### Mock Data System

**Location:** `client/src/data/mockAnalysis.js`
- `generateMockAnalysis(description)` - Creates realistic project analysis
- Structured response: tasks, suggestedTeam, budget, milestones, risks, recommendations
- Czech market pricing (CZK, realistic hourly rates 300-2000)
- 2-second simulated delay for realistic UX

## Development Commands

### Setup
```bash
# Install dependencies
cd client && npm install && cd ..
```

### Development
```bash
# Run the demo (frontend only)
npm run dev           # Opens on http://localhost:5173

# Or run from client directory
cd client && npm run dev
```

### Building
```bash
# Build for production
npm run build         # Creates optimized static files in client/dist/

# Preview production build
npm run preview       # Test the built version locally
```

## Design System

**Tailwind Configuration:** `client/tailwind.config.js`
- Primary: blue-600 (#2563EB)
- Secondary: violet-600 (#7C3AED)
- Accent: cyan-500 (#06B6D4)
- Custom color palette defined in spec

**Typography:** Inter font (Google Fonts)

**Component Styling:**
- Cards: `rounded-xl shadow-sm border border-slate-200 bg-white`
- Primary buttons: `bg-blue-600 hover:bg-blue-700 text-white`
- Focus states: `focus:ring-2 focus:ring-blue-500/20`

**Animations:** Framer Motion for page transitions, scroll animations, micro-interactions

## Key Implementation Details

### Claude API Integration

**Request format:**
```javascript
{
  description: string,  // Required, min 20 chars
  budget: string | null,
  deadline: string | null,
  categories: string[]
}
```

**Response validation:**
- Backend validates JSON structure
- Frontend receives either AI response or fallback mock data
- `meta.usedFallback` indicates mock usage

### Freelancer Matching Algorithm

Located in: `client/src/components/analysis/FreelancerSuggestions.jsx`

Logic: Matches tasks to freelancers based on **skill overlap**
- Compares task's `requiredSkills` with freelancer's `skills` array
- Calculates match percentage
- Selects best match (highest percentage) for each task
- Falls back to first available freelancer if no skills match

### Dashboard State Initialization

`projectStore.initDashboard()` transforms `analysisResult` into Kanban board:
- Maps tasks to columns (backlog/inProgress/review/done)
- Pre-populates mock chat messages and activity feed
- Creates team overview from `suggestedTeam`

### Drag & Drop (Kanban)

`projectStore.moveTask(taskId, fromColumn, toColumn)` handles state updates
- Uses HTML5 drag/drop API
- Local state only (no backend persistence for demo)

## Important Notes

### Language

**UI is in Czech** - All user-facing text, error messages, placeholders, etc.

### All Data is Mock (Demo Mode)

**Everything is mocked for instant demo:**
- Freelancer profiles (18 profiles in `data/freelancers.js`)
- Testimonials (`data/testimonials.js`)
- Example projects (`data/exampleProjects.js`)
- Project analysis (`data/mockAnalysis.js`)
- Dashboard chat messages (in `projectStore`)
- Activity feed (in `projectStore`)

**No external APIs or backend needed!**

### Button Color Contrast Fix

When adding buttons on gradient backgrounds (hero, CTA sections), use:
```jsx
<Button
  variant="secondary"
  className="!bg-white !text-blue-700 !border-white hover:!bg-blue-50"
>
```
Use `!important` overrides to prevent variant conflicts.

## Technical Constraints

- **Demo-focused:** No authentication, no database, no real payments, no backend
- **Frontend-only:** All data is mocked, instant responses
- **Czech market:** Pricing in CZK, Czech locations, Czech UI text
- **Mobile-first:** Responsive design with hamburger menu
- **Static deployable:** Can be deployed to any static host (Vercel, Netlify, GitHub Pages)

## Common Gotchas

1. **No backend needed:** Don't look for API endpoints - everything runs in the browser
2. **Mock data delay:** The 2-second delay in `analyzeProject()` is intentional for UX
3. **Store updates:** Zustand uses immer-style updates (`set((state) => ...)`)
4. **Button variants:** Don't mix `variant="primary"` with `className="bg-white"` - use `!important` or change variant
5. **All data is local:** Check `client/src/data/` for all mock data files

## Reference Documentation

- **Full spec:** `ai-freelancer-marketplace-spec.md` (852 lines)
- **UX review:** `UX-REVIEW.md` (detailed accessibility, performance, and UX analysis)
- **Tech stack:** React 18, Vite 5, Tailwind 3, Framer Motion 11, Zustand 4
- **Claude model:** claude-sonnet-4-20250514

## File Structure Quick Reference

- **Mock analysis generator:** `client/src/data/mockAnalysis.js`
- **State stores:** `client/src/stores/` (projectStore, uiStore)
- **UI components:** `client/src/components/ui/` (11 reusable components)
- **Mock data:** `client/src/data/` (freelancers, testimonials, examples, skills)
- **Utilities:** `client/src/utils/` (formatCurrency, formatDate)
- **Custom hooks:** `client/src/hooks/` (useTypewriter)
- **Pages:** `client/src/pages/` (5 main pages)
