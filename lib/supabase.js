import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lgrcgqbkzpudpzjzojgd.supabase.co";
const supabaseAnonKey = "sb_publishable_5KVxr_lO3c4ET-YFANHQow_ge1H_FVH";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);