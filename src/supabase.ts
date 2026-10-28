import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://nnkkjnxywzomwshzvpxk.supabase.co';

export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ua2tqbnh5d3pvbXdzaHp2cHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxOTU1ODUsImV4cCI6MjEwODc3MTU4NX0.w3dVDqDNUrKFI_aNS0UIzkrxoAZ3eInXK-0-mTQds1g';

export const SUPABASE_SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ua2tqbnh5d3pvbXdzaHp2cHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzE5NTU4NSwiZXhwIjoyMTA4NzcxNTg1fQ.19LFukvMrgdIsBuGw52CK1_WfUv1fSXKmRqdkFi7zOQ';

export const BUCKET_NAME = 'portfolio';

/**
 * Supabase client configured with the service_role key to bypass Row-Level Security (RLS)
 * for unrestricted, high-speed image uploads and storage management in the admin portal.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Supabase client configured with the public anonymous key for read-only / client operations.
 */
export const supabasePublic = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
