import "../css/CreateMemory.css";
import { useNavigate } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const CreateMemory = () => {
  const navigate = useNavigate();

  // Function to upload the memory to the database
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
      secondaryButton={
        <button
          onClick={() => {
            navigate("/");
          }}
          id="home-button"
        >
          Back Home
        </button>
      }
    />
  );
};

export default CreateMemory;
