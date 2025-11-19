import "../css/CreateMemory.css";
import { useNavigate } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const CreateMemory = ({ userId }) => {
  const navigate = useNavigate();

  const uploadMemory = async (formData) => {
    await MemoryAPI.createMemory(
      userId,
      formData.title,
      formData.description,
      formData.date,
      formData.media,
      formData.lovedOnes,
      formData.tags
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
        file: null,
        lovedOnes: [],
        tags: [],
      }}
      onSubmit={uploadMemory}
      submitLabel={"Upload Memory"}
      secondaryButton={
        <button type="button" id="home-button" onClick={() => navigate("/")}>
          Back Home
        </button>
      }
    />
  );
};

export default CreateMemory;
