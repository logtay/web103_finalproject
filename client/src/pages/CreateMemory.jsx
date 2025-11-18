import "../css/CreateMemory.css";
import { useNavigate } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`, 
    {
      method: "POST",
      body: data,
    }
  );

  return await res.json();
};

const CreateMemory = ({ userId }) => {
  const navigate = useNavigate();

  const uploadMemory = async (formData) => {
    let mediaUrl = null;

    if (formData.media?.file) {
      const uploaded = await uploadFile(formData.media.file);
      mediaUrl = uploaded.secure_url;
    }

    await MemoryAPI.createMemory(
      userId,
      formData.title,
      formData.description,
      formData.date,
      mediaUrl,
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
        lovedOnes: [],
        tags: [],
      }}
      onSubmit={uploadMemory}
      submitLabel={"Upload Memory"}
      secondaryButton={
        <button id="home-button" onClick={() => navigate("/")}>
          Back Home
        </button>
      }
    />
  );
};

export default CreateMemory;
