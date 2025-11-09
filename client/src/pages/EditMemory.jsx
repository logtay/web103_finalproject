import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const EditMemory = () => {
  const navigate = useNavigate();
  const id = useParams();
  const location = useLocation();
  const [memory, setMemory] = useState({
    title: "",
    description: "",
    date: new Date(),
    lovedOnes: [],
    tags: [],
  });

  useEffect(() => {
    if (location.state?.memory) {
      setMemory(location.state.memory);
    } else {
      const fetchMemory = async () => {
        const data = await MemoryAPI.getMemory(id);
        //setMemory(data);
      };
      fetchMemory();
    }
  }, [id, location.state]);

  // Function to update the memory
  const updateMemory = async (formData) => {
    try {
      await MemoryAPI.updateMemory(
        formData.title,
        formData.description,
        formData.date,
        formData.lovedOnes,
        formData.tags,
        formData.media
      );

      navigate(`/memory/:${id}`);
    } catch (error) {
      console.log("Error updating:", error);
    }
  };
  return (
    <MemoryForm
      title="Update your memories"
      initData={{
        title: memory.title,
        description: memory.description,
        date: memory.date,
        lovedOnes: memory.lovedOnes,
        tags: memory.tags,
      }}
      onSubmit={updateMemory}
      submitLabel={"Update Memory"}
    />
  );
};

export default EditMemory;
