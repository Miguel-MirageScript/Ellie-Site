import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Stub client for environments without Lovable Cloud configured.
// Prevents the whole app from crashing on import.
const stub: any = new Proxy(
  {},
  {
    get() {
      return () => Promise.resolve({ data: null, error: new Error("Supabase not configured") });
    },
  }
);

export const supabase: SupabaseClient =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : (stub as SupabaseClient);
