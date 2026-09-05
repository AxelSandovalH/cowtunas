-- Allow anonymous visitors (the public site) to CREATE bookings and client
-- records from the booking wizard and the newsletter widget.
-- They can only INSERT — never read, update or delete.
-- Run this once in the Supabase SQL Editor.

create policy "public can create clients"
  on clients for insert
  to anon
  with check (true);

create policy "public can create bookings"
  on bookings for insert
  to anon
  with check (true);
