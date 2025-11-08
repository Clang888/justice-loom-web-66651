-- Create storage policies for legal-forms bucket allowing admins to upload
CREATE POLICY "Admins can upload legal forms"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'legal-forms' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update legal forms"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'legal-forms' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete legal forms"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'legal-forms' AND
  has_role(auth.uid(), 'admin'::app_role)
);