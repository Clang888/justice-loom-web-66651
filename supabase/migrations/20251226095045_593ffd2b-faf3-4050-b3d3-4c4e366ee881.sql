-- Add length constraints to contact_enquiries table
ALTER TABLE contact_enquiries 
ADD CONSTRAINT contact_name_length CHECK (length(name) <= 255),
ADD CONSTRAINT contact_email_length CHECK (length(email) <= 255);

-- Add length constraints to form_e_feedback table
ALTER TABLE form_e_feedback
ADD CONSTRAINT feedback_email_length CHECK (email IS NULL OR length(email) <= 255),
ADD CONSTRAINT feedback_text_fields_length CHECK (
  (what_liked IS NULL OR length(what_liked) <= 2000) AND
  (what_not_liked IS NULL OR length(what_not_liked) <= 2000) AND
  (what_could_improve IS NULL OR length(what_could_improve) <= 2000) AND
  (additional_comments IS NULL OR length(additional_comments) <= 2000)
);

-- Add length constraint to form_e_beta_signups table
ALTER TABLE form_e_beta_signups
ADD CONSTRAINT beta_email_length CHECK (length(email) <= 255);