-- IronLedger Marketplace schema
-- Run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text default '',
  company_name text default '',
  phone text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null default '',
  category text not null,
  manufacturer text not null default '',
  model text not null default '',
  year integer,
  hours numeric,
  price numeric not null check (price >= 0),
  currency text not null default 'USD',
  location_city text default '',
  location_region text default '',
  country text default '',
  condition text not null default 'used',
  status text not null default 'draft' check (status in ('draft','active','sold','archived')),
  cover_image_url text default '',
  serial_number text default '',
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.set_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.set_listing_slug()
returns trigger
language plpgsql
as $$
declare
  base_slug text;
begin
  if new.slug is null or new.slug = '' then
    base_slug := lower(regexp_replace(coalesce(new.title, 'listing'), '[^a-zA-Z0-9]+', '-', 'g'));
    base_slug := trim(both '-' from base_slug);
    new.slug := base_slug || '-' || substr(new.id::text, 1, 8);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_timestamp();

drop trigger if exists trg_listings_updated_at on public.listings;
create trigger trg_listings_updated_at
before update on public.listings
for each row execute procedure public.set_timestamp();

drop trigger if exists trg_set_listing_slug on public.listings;
create trigger trg_set_listing_slug
before insert on public.listings
for each row execute procedure public.set_listing_slug();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.leads enable row level security;

-- Profiles
create policy "profiles are readable by everyone"
on public.profiles for select
using (true);

create policy "users manage own profile"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

-- Listings
create policy "active listings are readable by everyone"
on public.listings for select
using (status = 'active' or auth.uid() = owner_id);

create policy "owners can insert listings"
on public.listings for insert
with check (auth.uid() = owner_id);

create policy "owners can update listings"
on public.listings for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "owners can delete listings"
on public.listings for delete
using (auth.uid() = owner_id);

-- Listing images
create policy "listing images are readable by everyone"
on public.listing_images for select
using (true);

create policy "owners can insert listing images"
on public.listing_images for insert
with check (auth.uid() = owner_id);

create policy "owners can update listing images"
on public.listing_images for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "owners can delete listing images"
on public.listing_images for delete
using (auth.uid() = owner_id);

-- Leads
create policy "listing owners can read leads"
on public.leads for select
using (
  exists (
    select 1 from public.listings l
    where l.id = leads.listing_id and l.owner_id = auth.uid()
  )
);

create policy "anyone can create leads"
on public.leads for insert
with check (true);

-- Storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do nothing;

-- Storage policies
create policy "public can view listing images"
on storage.objects for select
using (bucket_id = 'listing-images');

create policy "authenticated users can upload listing images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "owners can update own listing images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'listing-images'
  and owner = auth.uid()
)
with check (
  bucket_id = 'listing-images'
  and owner = auth.uid()
);

create policy "owners can delete own listing images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'listing-images'
  and owner = auth.uid()
);
