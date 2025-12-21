import { useNavigate } from "react-router-dom";
import FormEEditor from "@/components/FormEEditor";

const FormE = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/services");
  };

  return <FormEEditor onClose={handleClose} />;
};

export default FormE;
