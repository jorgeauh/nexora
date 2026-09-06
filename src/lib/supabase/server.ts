import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client. Uses the service role key so inserts bypass RLS —
 * the anon key is never exposed to the browser for writes.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
