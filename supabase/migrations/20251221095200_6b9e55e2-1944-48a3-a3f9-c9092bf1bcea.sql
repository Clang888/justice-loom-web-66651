-- Create table for Form E calculator beta testers
CREATE TABLE public.form_e_beta_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.form_e_beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup)
CREATE POLICY "Anyone can sign up for beta" 
ON public.form_e_beta_signups 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view the signups
CREATE POLICY "Admins can view beta signups" 
ON public.form_e_beta_signups 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));