import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/config";
import { SUPABASE_KEY } from "@/config";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);
const channel = client.channel("room-1").subscribe();

export { channel };
