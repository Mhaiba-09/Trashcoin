// supabase.js
import { createClient } from '@supabase/supabase-js';

// 🔴 PUT YOUR KEYS HERE
const supabaseUrl = 'https://cuferjmilhosjovbrxjr.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_PcLv9mspUaD1K-KYqxMuyA_3HCRvUgc';

export const supabase = createClient(supabaseUrl, supabaseKey);