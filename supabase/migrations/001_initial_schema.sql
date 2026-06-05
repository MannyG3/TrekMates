-- TrailMates initial schema
-- Run this in Supabase SQL Editor or via supabase db push

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  home_region text,
  difficulty_level text check (difficulty_level in ('easy', 'moderate', 'hard', 'expert')),
  trek_count int default 0,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- TRAILS
-- ============================================================
create table public.trails (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles on delete set null,
  name text not null,
  region text not null,
  distance_km float not null,
  difficulty text not null check (difficulty in ('easy', 'moderate', 'hard', 'expert')),
  best_season text,
  description text,
  cover_image_url text,
  avg_rating float default 0,
  review_count int default 0,
  created_at timestamptz default now()
);

alter table public.trails enable row level security;

create policy "Trails are viewable by everyone"
  on public.trails for select
  using (true);

create policy "Authenticated users can create trails"
  on public.trails for insert
  with check (auth.role() = 'authenticated');

-- ============================================================
-- TRAIL POSTS
-- ============================================================
create table public.trail_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  trail_id uuid not null references public.trails on delete cascade,
  body text not null,
  photos text[] default '{}',
  rating int check (rating >= 1 and rating <= 5),
  visited_on date,
  created_at timestamptz default now()
);

alter table public.trail_posts enable row level security;

create policy "Trail posts are viewable by everyone"
  on public.trail_posts for select
  using (true);

create policy "Users can create their own trail posts"
  on public.trail_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own trail posts"
  on public.trail_posts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own trail posts"
  on public.trail_posts for delete
  using (auth.uid() = user_id);

-- ============================================================
-- BUDDY REQUESTS
-- ============================================================
create table public.buddy_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  trail_id uuid not null references public.trails on delete cascade,
  trek_date date not null,
  group_size int not null default 2,
  description text,
  status text default 'open' check (status in ('open', 'closed', 'filled')),
  created_at timestamptz default now()
);

alter table public.buddy_requests enable row level security;

create policy "Buddy requests are viewable by everyone"
  on public.buddy_requests for select
  using (true);

create policy "Users can create their own buddy requests"
  on public.buddy_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own buddy requests"
  on public.buddy_requests for update
  using (auth.uid() = user_id);

create policy "Users can delete their own buddy requests"
  on public.buddy_requests for delete
  using (auth.uid() = user_id);

-- ============================================================
-- BUDDY RESPONSES (for "I'm in" button)
-- ============================================================
create table public.buddy_responses (
  id uuid primary key default gen_random_uuid(),
  buddy_request_id uuid not null references public.buddy_requests on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  message text,
  created_at timestamptz default now(),
  unique (buddy_request_id, user_id)
);

alter table public.buddy_responses enable row level security;

create policy "Buddy responses are viewable by everyone"
  on public.buddy_responses for select
  using (true);

create policy "Authenticated users can respond to buddy requests"
  on public.buddy_responses for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own buddy responses"
  on public.buddy_responses for delete
  using (auth.uid() = user_id);

-- ============================================================
-- FORUM THREADS
-- ============================================================
create table public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  region text not null,
  title text not null,
  body text not null,
  reply_count int default 0,
  created_at timestamptz default now()
);

alter table public.forum_threads enable row level security;

create policy "Forum threads are viewable by everyone"
  on public.forum_threads for select
  using (true);

create policy "Authenticated users can create forum threads"
  on public.forum_threads for insert
  with check (auth.role() = 'authenticated');

create policy "Users can delete their own forum threads"
  on public.forum_threads for delete
  using (auth.uid() = user_id);

-- ============================================================
-- FORUM REPLIES
-- ============================================================
create table public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

alter table public.forum_replies enable row level security;

create policy "Forum replies are viewable by everyone"
  on public.forum_replies for select
  using (true);

create policy "Authenticated users can create forum replies"
  on public.forum_replies for insert
  with check (auth.role() = 'authenticated');

create policy "Users can delete their own forum replies"
  on public.forum_replies for delete
  using (auth.uid() = user_id);

-- ============================================================
-- GEAR LISTINGS
-- ============================================================
create table public.gear_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  title text not null,
  category text not null,
  daily_rate int not null,
  deposit int default 0,
  location text,
  description text,
  photos text[] default '{}',
  available bool default true,
  created_at timestamptz default now()
);

alter table public.gear_listings enable row level security;

create policy "Gear listings are viewable by everyone"
  on public.gear_listings for select
  using (true);

create policy "Users can create their own gear listings"
  on public.gear_listings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own gear listings"
  on public.gear_listings for update
  using (auth.uid() = user_id);

create policy "Users can delete their own gear listings"
  on public.gear_listings for delete
  using (auth.uid() = user_id);

-- ============================================================
-- FOLLOWS
-- ============================================================
create table public.follows (
  follower_id uuid not null references public.profiles on delete cascade,
  following_id uuid not null references public.profiles on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

alter table public.follows enable row level security;

create policy "Follows are viewable by authenticated users"
  on public.follows for select
  using (auth.role() = 'authenticated');

create policy "Users can follow others"
  on public.follows for insert
  with check (auth.uid() = follower_id);

create policy "Users can unfollow"
  on public.follows for delete
  using (auth.uid() = follower_id);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_trails_region on public.trails (region);
create index idx_trail_posts_created_at on public.trail_posts (created_at desc);
create index idx_trail_posts_trail_id on public.trail_posts (trail_id);
create index idx_buddy_requests_status on public.buddy_requests (status);
create index idx_buddy_requests_trek_date on public.buddy_requests (trek_date);
create index idx_forum_threads_region on public.forum_threads (region);
create index idx_gear_listings_category on public.gear_listings (category);

-- ============================================================
-- SEED DATA: Indian trekking trails
-- ============================================================
insert into public.trails (name, region, distance_km, difficulty, best_season, description, cover_image_url, avg_rating, review_count)
values
  (
    'Kedarkantha Summit Trek',
    'Uttarakhand',
    20,
    'moderate',
    'Dec–Apr',
    'A classic winter trek through pine forests and snow-covered meadows, culminating at 12,500 ft with panoramic views of Swargarohini and Bandarpoonch peaks.',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
    4.7,
    342
  ),
  (
    'Hampta Pass Trek',
    'Himachal Pradesh',
    26,
    'moderate',
    'Jun–Sep',
    'Cross from the lush Kullu Valley to the barren Lahaul desert in a dramatic 5-day traverse through alpine meadows and glacial streams.',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    4.8,
    289
  ),
  (
    'Valley of Flowers',
    'Uttarakhand',
    17,
    'easy',
    'Jul–Sep',
    'A UNESCO World Heritage Site carpeted with endemic alpine flowers — blue poppies, cobra lilies, and brahmakamal bloom across the valley floor.',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    4.9,
    512
  ),
  (
    'Roopkund Trek',
    'Uttarakhand',
    53,
    'hard',
    'May–Jun, Sep–Oct',
    'The mysterious Skeleton Lake trek through Bugyals, oak forests, and high-altitude campsites at 16,000 ft near Trishul massif.',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800',
    4.5,
    198
  ),
  (
    'Sandakphu–Phalut Trek',
    'West Bengal / Sikkim',
    51,
    'moderate',
    'Oct–Dec, Mar–May',
    'Walk along the Singalila Ridge with uninterrupted views of Kanchenjunga, Everest, Lhotse, and Makalu — four of the five highest peaks on Earth.',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    4.6,
    167
  ),
  (
    'Kumara Parvatha',
    'Karnataka',
    22,
    'hard',
    'Oct–Feb',
    'The most challenging trek in the Western Ghats, climbing through shola forests and grasslands to 5,600 ft with sweeping views of the Coorg hills.',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    4.4,
    423
  );
