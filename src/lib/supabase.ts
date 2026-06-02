import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

// Server-side Supabase client (safe for RSC usage)
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

export async function fetchCourses(): Promise<Course[]> {
  // Return mock data if env vars not set (for preview/demo)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project")) {
    // Demo fallback data
    return [
      {
        id: "1",
        title: "Advanced React Patterns",
        progress: 75,
        icon_name: "Layers",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "TypeScript Deep Dive",
        progress: 45,
        icon_name: "Code2",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        title: "System Design Mastery",
        progress: 60,
        icon_name: "Network",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Next.js & App Router",
        progress: 30,
        icon_name: "Zap",
        created_at: new Date().toISOString(),
      },
    ];
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data as Course[]) ?? [];
}
