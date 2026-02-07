import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = 'https://mrtrqinxglhdduzsiluo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydHJxaW54Z2xoZGR1enNpbHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTYxNjksImV4cCI6MjA4NTk5MjE2OX0.JB39mjYSOuUvGYqW3au1vBXQruOyMrten54OFhCKffo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});