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
    file: null,
  });

  useEffect(() => {
    if (location.state?.memory) {
      setMemory(location.state.memory);
    } else {
      const fetchMemory = async () => {
        const data = await MemoryAPI.getMemory(userId, id.id);

        setMemory(data);
      };
      fetchMemory();
    }
  }, [id.id, location.state, userId]);

  // Function to update the memory
  const updateMemory = async (formData) => {
    await MemoryAPI.updateMemory(
      id.id,
      formData.title,
      formData.description,
      formData.date,
      formData.media,
      formData.lovedOnes,
      formData.tags
    );
    navigate(`/memory/${id.id}`);
  };

  // Function to delete the memory
  const removeMemory = async () => {
    await MemoryAPI.deleteMemory(id.id);
    navigate("/", { replace: true });
  };

  return (
    <>
      <MemoryForm
        title="Update your memories"
        initData={{
          title: memory.title,
          description: memory.body,
          date: memory.date ? new Date(memory.date) : new Date(),
          file: memory.file_path
            ? { file: memory.file_path, previewUrl: memory.file_path }
            : null,
          lovedOnes: (memory.lovedones || []).map((item) => ({
            value: item.toLowerCase(),
            label: item,
          })),
          tags: (memory.tags || []).map((item) => ({
            value: item.toLowerCase(),
            label: item,
          })),
        }}
        onSubmit={updateMemory}
        submitLabel={"Update Memory"}
        secondaryButton={
          <button type="button" onClick={removeMemory} id="remove-button">
            Remove Memory
          </button>
        }
      />
    </>
  );
};

export default EditMemory;
