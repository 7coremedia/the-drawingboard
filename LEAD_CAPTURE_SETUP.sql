-- Run this script in your Supabase SQL Editor

-- 1. Create the lead_captures table
CREATE TABLE IF NOT EXISTS lead_captures (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR NOT NULL,
    source VARCHAR DEFAULT 'exit-intent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE lead_captures ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anyone (public) to insert their email
CREATE POLICY "Public can insert emails" 
ON lead_captures FOR INSERT 
WITH CHECK (true);

-- Allow ONLY authenticated admins to view the emails
CREATE POLICY "Admins can view emails" 
ON lead_captures FOR SELECT 
TO authenticated 
USING (true);
