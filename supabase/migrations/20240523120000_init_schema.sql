
-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  organization_name text,
  role text default 'member',

  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Grant Opportunities
create table if not exists grant_opportunities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  funder_name text,
  description text,
  url text,
  amount_min numeric,
  amount_max numeric,
  deadline timestamp with time zone,
  category text,
  match_probability integer,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table grant_opportunities enable row level security;

create policy "Opportunities are viewable by everyone." on grant_opportunities
  for select using (true);

create policy "Authenticated users can insert opportunities." on grant_opportunities
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update opportunities." on grant_opportunities
  for update using (auth.role() = 'authenticated');
  
-- Applications
create table if not exists applications (
    id uuid default gen_random_uuid() primary key,
    opportunity_id uuid references grant_opportunities(id) on delete cascade,
    assigned_to uuid references profiles(id),
    status text not null default 'identified',
    priority text default 'medium',
    submission_date timestamp with time zone,
    outcome_date timestamp with time zone,
    awarded_amount numeric,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table applications enable row level security;

create policy "Authenticated users can view applications." on applications 
    for select using (auth.role() = 'authenticated');

create policy "Authenticated users can insert applications." on applications 
    for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update applications." on applications 
    for update using (auth.role() = 'authenticated');

-- Documents
create table if not exists documents (
    id uuid default gen_random_uuid() primary key,
    application_id uuid references applications(id) on delete cascade,
    uploader_id uuid references profiles(id),
    name text not null,
    file_path text not null,
    file_type text,
    size_bytes bigint,
    version integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table documents enable row level security;

create policy "Authenticated users can view documents." on documents 
    for select using (auth.role() = 'authenticated');

create policy "Authenticated users can insert documents." on documents 
    for insert with check (auth.role() = 'authenticated');

-- Activity Logs
create table if not exists activity_logs (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references profiles(id),
    entity_type text,
    entity_id uuid,
    action text,
    details jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table activity_logs enable row level security;

create policy "Authenticated users can view logs." on activity_logs 
    for select using (auth.role() = 'authenticated');

-- Functions & Triggers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
