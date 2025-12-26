-- Drop existing restrictive policies on form_e_feedback
DROP POLICY IF EXISTS "Admins can view feedback" ON public.form_e_feedback;
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.form_e_feedback;

-- Create proper PERMISSIVE policies
-- Only admins can view feedback (protects email addresses)
CREATE POLICY "Admins can view feedback"
ON public.form_e_feedback
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Anyone can submit feedback (public insert)
CREATE POLICY "Anyone can submit feedback"
ON public.form_e_feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);