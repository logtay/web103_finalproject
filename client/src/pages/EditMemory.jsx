import "../css/EditMemory.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MemoryForm from "../components/MemoryForm.jsx";
import MemoryAPI from "../services/MemoryAPI.js";

const EditMemory = ({ userId }) => {
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
        await MemoryAPI.getMemory(userId, id);
        //setMemory(data);
      };
      fetchMemory();
    }
  }, [id, location.state, userId]);

  // Function to update the memory
  const updateMemory = async (formData) => {
    await MemoryAPI.updateMemory(
      id,
      formData.title,
      formData.description,
      formData.date,
      formData.media,
      formData.lovedOnes,
      formData.tags
    );
    navigate(`/memory/:${id}`);
  };

  // Function to delete the memory
  const removeMemory = async () => {
    await MemoryAPI.deleteMemory(id);
    navigate("/");
  };

  return (
    <>
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
        secondaryButton={
          <button onClick={removeMemory} id="remove-button">
            Remove Memory
          </button>
        }
      />
    </>
  );
};

export default EditMemory;
