import { useNavigate } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const CreateMemory = () => {
  const navigate = useNavigate();

  const uploadMemory = async (formData) => {
    await MemoryAPI.createMemory(
      formData.title,
      formData.description,
      formData.date,
      formData.lovedOnes,
      formData.tags,
      formData.media
    );

    navigate("/");
  };
  return (
    <MemoryForm
      title="Upload your memories"
      initData={{
        title: "",
        description: "",
        date: new Date(),
        lovedOnes: [],
        tags: [],
      }}
      onSubmit={uploadMemory}
      submitLabel={"Upload Memory"}
    />
  );
};

export default CreateMemory;
