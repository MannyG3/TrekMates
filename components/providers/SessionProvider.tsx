"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types";

interface SessionContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  profile: null,
  loading: true,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      setProfile(data);
    };

    const init = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      }
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <SessionContext.Provider value={{ user, profile, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
