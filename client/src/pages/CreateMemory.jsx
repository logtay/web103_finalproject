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
      initData={{
        title: "",
        description: "",
        date: new Date(),
        lovedOnes: [],
        tags: [],
      }}
      onSubmit={uploadMemory}
    />
  );
};

export default CreateMemory;
