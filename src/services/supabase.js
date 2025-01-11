import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://agtfouvvvhjtauknvcoz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndGZvdXZ2dmhqdGF1a252Y296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTg1MzUsImV4cCI6MjA1MTEzNDUzNX0.6Rl-pf2et9U_NdDO3OFJzoxy_CPrD7rsywVjkaF-T3I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
