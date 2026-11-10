-- Tuna-by-the-kilo orders. Run once in the Supabase SQL Editor.

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text,
  email text,
  address text,
  kg integer not null check (kg between 1 and 50),
  total_mxn numeric(10,2) not null,
  status text not null default 'pending', -- pending | paid | delivered | cancelled
  notes text,
  created_at timestamptz default now()
);

alter table orders enable row level security;

-- The public site can create orders (insert-only, never read)
create policy "public can create orders"
  on orders for insert
  to anon
  with check (true);

-- The admin (authenticated) manages them
create policy "authenticated users full access"
  on orders for all
  to authenticated
  using (true);
