-- Drop existing restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Admins can view subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update subscribers" 
ON public.newsletter_subscribers 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete subscribers" 
ON public.newsletter_subscribers 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);