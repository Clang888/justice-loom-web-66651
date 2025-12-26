-- Rename newsletter_subscribers table to contact_enquiries
ALTER TABLE public.newsletter_subscribers RENAME TO contact_enquiries;

-- Rename policies to match new table purpose
ALTER POLICY "Anyone can subscribe to newsletter" ON public.contact_enquiries RENAME TO "Anyone can submit contact enquiry";
ALTER POLICY "Admins can view subscribers" ON public.contact_enquiries RENAME TO "Admins can view contact enquiries";
ALTER POLICY "Admins can update subscribers" ON public.contact_enquiries RENAME TO "Admins can update contact enquiries";
ALTER POLICY "Admins can delete subscribers" ON public.contact_enquiries RENAME TO "Admins can delete contact enquiries";