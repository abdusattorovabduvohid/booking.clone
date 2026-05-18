import axios from "axios";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ubcptukukovnymesuzro.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_7sDVHEGWHe_Uo35_u389fQ_0nuWRaaU";

export const supabaseApi = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  },
});
