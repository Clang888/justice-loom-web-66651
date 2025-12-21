import PDFEditor from "./PDFEditor";

interface FormEEditorProps {
  onClose: () => void;
}

const FormEEditor = ({ onClose }: FormEEditorProps) => {
  return (
    <PDFEditor
      pdfUrl="/forms/form-e.pdf"
      formName="Form E: Financial Statement"
      onClose={onClose}
    />
  );
};

export default FormEEditor;
