# Hiring Tool

An internal hiring tool UI built with React, TypeScript, React Query, and virtualization for managing candidate applications through the hiring pipeline.

## Features

### 🚀 Performance & Scalability
- **Virtualized Lists**: Handle thousands of candidates (1,000-5,000+) with smooth scrolling using TanStack Virtual
- **Optimistic Updates**: Instant UI feedback with automatic rollback on API failures
- **Efficient Data Management**: TanStack Query for caching, background updates, and error handling

### 👥 Candidate Management
- **Master-Detail Interface**: Split-pane layout with candidate list and detailed view
- **Stage Tracking**: Move candidates through 6 pipeline stages (Applied → Screening → Interview → Offer → Hired/Rejected)
- **Activity Timeline**: Complete audit trail showing all stage transitions with timestamps
- **Real-time Status Updates**: Visual feedback with color-coded stage badges

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop workflows
- **Modern UI**: Clean interface built with Tailwind CSS and Radix UI components
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Smooth loading experiences with spinners and skeleton states

## Tech Stack

- **Frontend**: React 19 + TypeScript 5
- **Framework**: Next.js 16 with App Router
- **State Management**: TanStack Query v5 for server state
- **Virtualization**: TanStack Virtual for list performance
- **Styling**: Tailwind CSS v4 with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Architecture

### Data Flow
- **Mock API**: Simulates real backend with configurable latency (300-1200ms) and 20% failure rate
- **Optimistic Updates**: UI updates immediately, rolls back on API failure
- **Type Safety**: Full TypeScript coverage with strict type definitions

### Key Components
- `CandidatesPage`: Main virtualized list with master-detail layout
- `CandidateDetail`: Individual candidate view with stage management
- `CandidateRow`: Optimized list item component
- `useUpdateCandidateStage`: Custom hook for stage transitions with optimistic updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Project Structure

```
app/
├── api/candidates/     # API routes for candidate operations
├── hooks/             # Custom React hooks
├── lib/               # Utilities, types, and API functions
└── mock_data/         # Generated candidate data

components/
├── candidates/        # Candidate-specific components
└── ui/               # Reusable UI components
```

## Development Notes

### Mock API Behavior
- **Latency**: Random delays between 300-1200ms to simulate real network conditions
- **Failure Rate**: 20% chance of API failures to test error handling
- **Data**: Generates realistic candidate data with various stages and activity histories

### Performance Optimizations
- List virtualization for handling large datasets
- Optimistic updates for immediate user feedback
- Background data fetching and caching
