export type Difficulty = "easy" | "moderate" | "hard" | "expert";

export type BuddyStatus = "open" | "closed" | "filled";

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  home_region: string | null;
  difficulty_level: Difficulty | null;
  trek_count: number;
  created_at: string;
}

export interface Trail {
  id: string;
  created_by: string | null;
  name: string;
  region: string;
  distance_km: number;
  difficulty: Difficulty;
  best_season: string | null;
  description: string | null;
  cover_image_url: string | null;
  avg_rating: number;
  review_count: number;
  created_at: string;
}

export interface TrailPost {
  id: string;
  user_id: string;
  trail_id: string;
  body: string;
  photos: string[];
  rating: number | null;
  visited_on: string | null;
  created_at: string;
}

export interface TrailPostWithJoins extends TrailPost {
  profile: Profile;
  trail: Trail;
}

export interface BuddyRequest {
  id: string;
  user_id: string;
  trail_id: string;
  trek_date: string;
  group_size: number;
  description: string | null;
  status: BuddyStatus;
  created_at: string;
}

export interface BuddyRequestWithJoins extends BuddyRequest {
  profile: Profile;
  trail: Trail;
}

export interface BuddyResponse {
  id: string;
  buddy_request_id: string;
  user_id: string;
  message: string | null;
  created_at: string;
}

export interface ForumThread {
  id: string;
  user_id: string;
  region: string;
  title: string;
  body: string;
  reply_count: number;
  created_at: string;
}

export interface ForumThreadWithProfile extends ForumThread {
  profile: Profile;
}

export interface ForumReply {
  id: string;
  thread_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

export interface ForumReplyWithProfile extends ForumReply {
  profile: Profile;
}

export interface GearListing {
  id: string;
  user_id: string;
  title: string;
  category: string;
  daily_rate: number;
  deposit: number;
  location: string | null;
  description: string | null;
  photos: string[];
  available: boolean;
  created_at: string;
}

export interface GearListingWithProfile extends GearListing {
  profile: Profile;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const INDIAN_REGIONS = [
  "All Regions",
  "Uttarakhand",
  "Himachal Pradesh",
  "Ladakh",
  "Sikkim",
  "West Bengal",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Jammu & Kashmir",
] as const;

export type IndianRegion = (typeof INDIAN_REGIONS)[number];

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "text-altitude-easy",
  moderate: "text-altitude-moderate",
  hard: "text-altitude-hard",
  expert: "text-altitude-expert",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy stroll",
  moderate: "Moderate ascent",
  hard: "Hard climb",
  expert: "Expert only",
};

export const DIFFICULTY_SHORT: Record<Difficulty, string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
  expert: "Expert",
};
