-- Make the legal-forms storage bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'legal-forms';

-- Drop the existing public access policy
DROP POLICY IF EXISTS "Anyone can view legal forms" ON storage.objects;

-- Add authenticated-only access policy
CREATE POLICY "Authenticated users can view legal forms"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'legal-forms');