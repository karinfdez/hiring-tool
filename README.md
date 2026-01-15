# Hiring Tool

A fast, resilient internal hiring tool UI built with React and TypeScript.

## Features

- **Candidate Management**: Browse and manage thousands of candidates (1,000-5,000+) with virtualized lists for optimal performance
- **Stage Tracking**: Track candidates through hiring pipeline stages
- **Real-time Updates**: Optimistic updates with automatic rollback on failures
- **Activity Timeline**: Complete audit trail of candidate interactions
- **Responsive Design**: Smooth performance with large datasets

## Tech Stack

- React + TypeScript
- Next.js 16
- TanStack Query for data management
- TanStack Virtual for list virtualization
- Tailwind CSS for styling

## Persistence

This project uses an in-memory mock API to simulate network latency and failures. In a production system, persistence would live behind the API without changing the frontend data flow or optimistic update logic.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
