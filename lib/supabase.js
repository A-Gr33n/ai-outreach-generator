import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpsasdvtjparokjbprfk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwc2FzZHZ0anBhcm9ramJwcmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTgwNzYsImV4cCI6MjA5MTIzNDA3Nn0.9fvoJHYVqOl8XqhkhD01LO7sQkSEYlAZcJ7vHSrjN0U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);