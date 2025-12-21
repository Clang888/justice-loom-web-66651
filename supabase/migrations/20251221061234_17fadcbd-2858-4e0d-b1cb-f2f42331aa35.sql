-- Insert Family Court Forms into the legal_forms table
INSERT INTO public.legal_forms (form_name, form_number, category, description, pdf_file_path, keywords, common_scenarios) VALUES
-- Divorce Petition Forms
('General Form of Joint Application', 'Form 2C', 'Family Law', 'Joint application form for divorce proceedings when both parties agree', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/form2c.pdf', ARRAY['joint application', 'divorce', 'mutual consent', 'form 2c'], ARRAY['Both spouses agree to divorce', 'Uncontested divorce proceedings']),

('Petition (2 years'' Separation)', 'Form 2', 'Family Law', 'Divorce petition based on 2 years separation with consent', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/petition_2years_separation_form2.pdf', ARRAY['petition', 'separation', '2 years', 'divorce', 'form 2'], ARRAY['Spouses separated for 2 years', 'Divorce with respondent consent after separation']),

('Petition (Adultery)', 'Form 2', 'Family Law', 'Divorce petition based on adultery', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/sc391s.pdf', ARRAY['petition', 'adultery', 'divorce', 'form 2'], ARRAY['Spouse committed adultery', 'Divorce due to infidelity']),

('Petition (Behaviour)', 'Form 2', 'Family Law', 'Divorce petition based on unreasonable behaviour', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/petition_behaviour_form2.pdf', ARRAY['petition', 'behaviour', 'unreasonable', 'divorce', 'form 2'], ARRAY['Unreasonable behaviour by spouse', 'Cannot reasonably be expected to live together']),

('Petition (Consent 1 year)', 'Form 2', 'Family Law', 'Divorce petition based on 1 year separation with mutual consent', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/petition_consent1year_form2.pdf', ARRAY['petition', 'consent', '1 year', 'separation', 'divorce', 'form 2'], ARRAY['Spouses separated for 1 year with consent', 'Mutual agreement to divorce after 1 year']),

('Petition (Desertion)', 'Form 2', 'Family Law', 'Divorce petition based on desertion for 2 years', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/sc397s.pdf', ARRAY['petition', 'desertion', 'divorce', 'form 2'], ARRAY['Spouse deserted for 2 years', 'Abandonment by spouse']),

-- Children Arrangements
('Statement as to Arrangement for Children', 'Form 2B', 'Family Law', 'Statement regarding arrangements for children in divorce proceedings', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/form2b.pdf', ARRAY['children', 'arrangements', 'custody', 'form 2b'], ARRAY['Children under 18 involved in divorce', 'Custody and care arrangements']),

('Statement as to Arrangement for Children', 'Form 2D', 'Family Law', 'Detailed statement for children arrangements in joint applications', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/form2d.pdf', ARRAY['children', 'arrangements', 'joint application', 'form 2d'], ARRAY['Joint application with children', 'Agreed children arrangements']),

-- Decree Absolute Applications
('Notice of Application for Decree Nisi to be Made Absolute (Petition)', 'Form 5', 'Family Law', 'Application to make the decree nisi absolute in petition cases', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/form5.pdf', ARRAY['decree nisi', 'decree absolute', 'final divorce', 'form 5'], ARRAY['6 weeks after decree nisi', 'Finalizing divorce from petition']),

('Notice of Application for Decree Nisi to be Made Absolute (Joint Application)', 'Form 5A', 'Family Law', 'Application to make the decree nisi absolute in joint application cases', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/form5a.pdf', ARRAY['decree nisi', 'decree absolute', 'joint application', 'form 5a'], ARRAY['6 weeks after decree nisi', 'Finalizing joint divorce application']),

-- Financial Statement
('Financial Statement', 'Form E', 'Family Law', 'Comprehensive financial disclosure statement for ancillary relief proceedings', 'https://www.judiciary.hk/doc/en/court_services_facilities/fc/forme.pdf', ARRAY['financial statement', 'form e', 'ancillary relief', 'assets', 'disclosure'], ARRAY['Ancillary relief proceedings', 'Financial disclosure for divorce', 'Asset division'])

ON CONFLICT DO NOTHING;