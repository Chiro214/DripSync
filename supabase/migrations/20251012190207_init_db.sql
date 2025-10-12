-- Enable required extension
create extension if not exists "pgcrypto";

-- USERS TABLE
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  name text,
  role text check(role in ('user','admin','superadmin')) default 'user',
  created_at timestamp with time zone default now()
);

-- EVENTS TABLE
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamptz not null,
  venue text,
  price numeric(10,2),
  image_url text,
  created_by uuid references users(id),
  created_at timestamptz default now()
);

-- BOOKINGS TABLE
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  status text check(status in ('booked','cancelled')) default 'booked',
  created_at timestamptz default now()
);
