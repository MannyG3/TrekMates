import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Demo middleware - using local authentication
  // TODO: Replace with real Supabase middleware when ready
  
  const supabaseResponse = NextResponse.next({ request });

  // No-op for demo purposes - demo auth uses localStorage
  // When integrating Supabase, restore the createServerClient logic

  return supabaseResponse;
}
