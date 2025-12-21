-- First, insert Form E into legal_forms if it doesn't exist
INSERT INTO public.legal_forms (form_name, form_number, category, description, pdf_file_path)
VALUES (
  'Form E: Financial Statement',
  'Form E',
  'financial',
  'Financial statement form for divorce proceedings - comprehensive disclosure of assets, liabilities, income and expenses',
  '/forms/form-e.pdf'
)
ON CONFLICT DO NOTHING;