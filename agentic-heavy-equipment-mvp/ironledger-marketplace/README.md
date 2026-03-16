# IronLedger Marketplace

A real marketplace scaffold for heavy equipment with:
- auth via Supabase magic links
- listing creation
- photo uploads to Supabase Storage
- public listing feed
- seller dashboard
- Facebook share links for each listing
- Supabase SQL schema and RLS policies

## 1. Set env
Copy `.env.local.example` to `.env.local` and paste your values.

## 2. Run SQL
Open Supabase SQL editor and run `supabase/schema.sql`.

## 3. Auth
In Supabase Auth settings, add your site URL to redirect URLs.

## 4. Run
```bash
npm install
npm run dev
```

## Current scope
This is a strong MVP scaffold, not a complete production marketplace.
What is included:
- buyer browsing
- seller posting
- image uploads
- share links
- row-level security model

What still needs later:
- saved searches
- transport quote integrations
- inspections workflow
- lender / escrow integrations
- moderation queue
- Meta Graph API posting to Pages/Groups

## Facebook note
This project implements browser-based share links. Direct automated posting to Pages/Groups requires Meta app setup, permissions, and review.
