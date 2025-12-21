-- Create feedback table for Form E beta feedback
CREATE TABLE public.form_e_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT,
  what_liked TEXT,
  what_not_liked TEXT,
  what_could_improve TEXT,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  additional_comments TEXT
);

-- Enable RLS
ALTER TABLE public.form_e_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback (public form)
CREATE POLICY "Anyone can submit feedback"
ON public.form_e_feedback
FOR INSERT
WITH CHECK (true);

-- Only admins can view feedback
CREATE POLICY "Admins can view feedback"
ON public.form_e_feedback
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));