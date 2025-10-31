# Supabase Task Manager - Production Deployment Demo

![Architecture Diagram](https://i.imgur.com/3GjDzcC.png)

A production-ready task management application built with Next.js and Supabase, demonstrating authentication, database operations, and deployment best practices.

## Features

- 🔐 User authentication with Supabase Auth
- ✅ Task management with real-time updates
- 🎨 Modern UI with Tailwind CSS
- 🚀 Deployed on Vercel with CI/CD
- 📦 PostgreSQL database with Supabase

## Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) - React framework
- **Backend**: [Supabase](https://supabase.com/) - Open-source Firebase alternative
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A GitHub account
- A Vercel account (for deployment)

## Getting Started

Follow the detailed tutorial in the accompanying article to set up and deploy this application.

### Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and add your Supabase credentials
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
supabase-task-manager-demo/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utilities and configurations
│   └── supabase.ts       # Supabase client setup
├── supabase/             # Supabase configuration
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## Database Schema

The app uses a simple `tasks` table with the following structure:

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `title` (text)
- `description` (text)
- `completed` (boolean)
- `created_at` (timestamp)

## Deployment

See the full tutorial article for step-by-step deployment instructions to Vercel.

## Learn More

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

## License

MIT
