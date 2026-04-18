<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ClientIn Ad Maker — Copilot Instructions

This is a Next.js 15 App Router project with TypeScript and Tailwind CSS v4.

## Project Purpose
A tool for generating premium social media content and ads from ClientIn app screenshots using OpenAI GPT-4o vision and chat APIs.

## Key Conventions
- All API routes live in `src/app/api/`
- Components are in `src/components/` — functional, client-side where needed
- Types defined in `src/types/index.ts`
- AI prompt logic in `src/lib/prompts.ts`
- API client helpers in `src/lib/api.ts`
- Use `clsx` for conditional classes
- Use `lucide-react` for all icons
- Design language: minimal, premium, stone/amber color palette

## Content Philosophy
- ClientIn markets around outcomes: turning first-time customers into regulars
- Avoid generic AI copy — content should feel sharp and startup-quality
- Target industries: barbershops, cafés, salons, restaurants
