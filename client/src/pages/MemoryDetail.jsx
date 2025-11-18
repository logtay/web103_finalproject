import "../css/MemoryForm.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MemoryAPI from "../services/MemoryAPI.js";

const MemoryDetail = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetchMemory = async () => {
      const data = await MemoryAPI.getMemory(userId, id);
      setMemory(data || null);
    };
    fetchMemory();
  }, [id, userId]);

  if (!memory) return <div>Loading memory…</div>;

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0];
  };

  const isImage = (path) => {
    if (!path) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(path) || path.startsWith("data:");
  };

  return (
    <div className="create-memory-container">
      <form className="create-memory-form">
        <h2 id="memory-form-title">Memory Details</h2>

        <div className="file-drop-zone">
          {memory.file_path ? (
            <div className="preview">
              {isImage(memory.file_path) ? (
                <img
                  className="preview-image"
                  src={memory.file_path}
                  alt={memory.title}
                />
              ) : (
                <p>
                  File: <a href={memory.file_path}>{memory.file_path}</a>
                </p>
              )}
            </div>
          ) : (
            <p>No file attached</p>
          )}
        </div>

        <label htmlFor="memory-title">Title</label>
        <input
          type="text"
          id="memory-title"
          value={memory.title || ""}
          readOnly
        />

        <label htmlFor="memory-date">Date</label>
        <input
          type="date"
          id="memory-date"
          name="date"
          value={formatDateForInput(memory.date)}
          readOnly
        />

        <label htmlFor="memory-description">Description</label>
        <textarea
          id="memory-description"
          placeholder="Give some details"
          value={memory.body || ""}
          readOnly
        />

        <label> Loved Ones </label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(memory.lovedOnes || []).map((lo, i) => (
            <span
              key={i}
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "4px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: "0.95rem",
              }}
            >
              {lo}
            </span>
          ))}
        </div>

        <label> Tags </label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(memory.tags || []).map((tag, i) => (
            <span
              key={i}
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "4px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: "0.95rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="memory-form-buttons">
          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoryDetail;