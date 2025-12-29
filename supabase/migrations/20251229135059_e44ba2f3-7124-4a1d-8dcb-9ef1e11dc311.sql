-- Create function to prevent user_id modification on saved_forms
CREATE OR REPLACE FUNCTION public.prevent_saved_forms_user_id_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Cannot modify user_id field';
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to enforce user_id immutability
CREATE TRIGGER prevent_saved_forms_user_id_change_trigger
  BEFORE UPDATE ON public.saved_forms
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_saved_forms_user_id_change();