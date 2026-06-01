-- ============================================
-- CowTunas ERP — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enums
create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type user_role as enum ('admin', 'bobby');

-- ============================================
-- PROFILES (linked to Supabase Auth users)
-- ============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role user_role not null default 'bobby',
  full_name text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'bobby'),
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================
-- CLIENTS
-- ============================================
create table clients (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text,
  phone text,
  country text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- BOOKINGS
-- ============================================
create table bookings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete set null,
  trip_date date not null,
  anglers integer not null default 1,
  status booking_status not null default 'pending',
  total_price numeric(10,2) not null default 0,
  deposit_paid numeric(10,2) not null default 0,
  expenses numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Computed: net profit per trip
create or replace function booking_net(b bookings)
returns numeric as $$
  select b.total_price - b.expenses;
$$ language sql stable;

-- ============================================
-- MAINTENANCE LOG (Kailani)
-- ============================================
create table maintenance (
  id uuid default gen_random_uuid() primary key,
  service_date date not null,
  description text not null,
  cost numeric(10,2) not null default 0,
  next_service_date date,
  notes text,
  created_at timestamptz default now()
);

-- ============================================
-- CAMPAIGNS
-- ============================================
create table campaigns (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  channel text not null check (channel in ('whatsapp', 'email', 'both')),
  message text not null,
  sent_at timestamptz,
  recipients_count integer default 0,
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);

-- ============================================
-- updated_at triggers
-- ============================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at before update on clients
  for each row execute procedure set_updated_at();

create trigger bookings_updated_at before update on bookings
  for each row execute procedure set_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table profiles   enable row level security;
alter table clients    enable row level security;
alter table bookings   enable row level security;
alter table maintenance enable row level security;
alter table campaigns  enable row level security;

-- Profiles: cada usuario ve solo el suyo; admin ve todos
create policy "users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "admin can view all profiles"
  on profiles for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Clients, Bookings, Maintenance, Campaigns: solo usuarios autenticados
create policy "authenticated users full access"
  on clients for all using (auth.role() = 'authenticated');

create policy "authenticated users full access"
  on bookings for all using (auth.role() = 'authenticated');

create policy "authenticated users full access"
  on maintenance for all using (auth.role() = 'authenticated');

create policy "authenticated users full access"
  on campaigns for all using (auth.role() = 'authenticated');
