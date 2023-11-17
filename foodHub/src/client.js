import { createClient } from '@supabase/supabase-js'

const URL = 'https://trhiqckbsrwlkajzjvif.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaGlxY2tic3J3bGthanpqdmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3Mjc1NzMsImV4cCI6MjAxNTMwMzU3M30.4A-qcS-yDc5G1sG1HaCbXMUNhKL2CO-616olORaqGac';


export const supabase = createClient(URL, API_KEY);
