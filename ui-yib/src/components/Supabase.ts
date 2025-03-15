import { createClient } from "@supabase/supabase-js";

// 🔹 Replace with your actual Supabase credentials
const supabaseUrl = "https://wdnkqtedhkhmjpudcsqm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbmtxdGVkaGtobWpwdWRjc3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMzU2NTQsImV4cCI6MjA1NzYxMTY1NH0.xM1C82Fcy7FbuSxoXHddeLqM8qqz9qJADkmhf9fhTL0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
