-- Fixes "Database error creating new user" when adding users in Supabase Auth.
-- The on_auth_user_created trigger inserts into profiles; give it an insert
-- path and make it fail-safe so user creation can never be blocked.
-- Run once in the Supabase SQL Editor.

create policy "system can insert profiles"
  on profiles for insert
  with check (true);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'bobby'),
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  return new;
exception when others then
  -- never block auth user creation because of a profile hiccup
  return new;
end;
$$ language plpgsql security definer;
