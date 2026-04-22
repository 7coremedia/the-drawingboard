-- Run this entire script in your Supabase SQL Editor

-- 1. Add PIN column to onboarding_responses (for secure client login)
ALTER TABLE onboarding_responses 
ADD COLUMN IF NOT EXISTS portal_pin VARCHAR(6);

-- 2. Ensure project_milestones table exists and is structured correctly
CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES onboarding_responses(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    date_label VARCHAR,
    status VARCHAR DEFAULT 'pending', -- pending, in-progress, completed
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Ensure client_invoices table exists
CREATE TABLE IF NOT EXISTS client_invoices (
    id VARCHAR PRIMARY KEY, -- e.g., INV-001
    brand_id UUID REFERENCES onboarding_responses(id) ON DELETE CASCADE,
    date_label VARCHAR,
    amount VARCHAR,
    status VARCHAR DEFAULT 'unpaid', -- unpaid, paid
    download_url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Ensure client_deliverables table exists
CREATE TABLE IF NOT EXISTS client_deliverables (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES onboarding_responses(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    file_type VARCHAR,
    file_size VARCHAR,
    download_url VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Setup Storage Bucket for Assets (if not already existing)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portal_assets', 'portal_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for portal_assets
-- Allow public viewing of files
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'portal_assets' );

-- Allow authenticated admins to upload files
CREATE POLICY "Admin Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'portal_assets' AND auth.role() = 'authenticated' );

-- Allow authenticated admins to update/delete files
CREATE POLICY "Admin Update Delete" 
ON storage.objects FOR ALL 
USING ( bucket_id = 'portal_assets' AND auth.role() = 'authenticated' );
