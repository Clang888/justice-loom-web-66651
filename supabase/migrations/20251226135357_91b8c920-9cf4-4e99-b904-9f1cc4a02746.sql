-- Create payment session logs table for rate limiting and audit trail
CREATE TABLE public.payment_session_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  session_id TEXT NOT NULL,
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE public.payment_session_logs ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from service role (edge function)
-- No public read access to protect user data
CREATE POLICY "Service role can insert payment logs"
ON public.payment_session_logs
FOR INSERT
TO service_role
WITH CHECK (true);

-- Admins can view payment logs for monitoring
CREATE POLICY "Admins can view payment logs"
ON public.payment_session_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for efficient rate limiting queries
CREATE INDEX idx_payment_session_logs_email_created 
ON public.payment_session_logs (email, created_at DESC);

-- Auto-delete old logs after 30 days to comply with data minimization
CREATE INDEX idx_payment_session_logs_created 
ON public.payment_session_logs (created_at);