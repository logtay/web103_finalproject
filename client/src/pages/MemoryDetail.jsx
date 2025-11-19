import "../css/MemoryDetails.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MemoryAPI from "../services/MemoryAPI.js";

const MemoryDetail = ({ userId }) => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetchMemory = async () => {
      const data = await MemoryAPI.getMemory(userId, id);
      setMemory(data);
    };
    fetchMemory();
  }, [id, userId]);

  if (!memory) return <div>Loading memory…</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString();
  };

  const isImage = (path) => {
    if (!path) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(path) || path.startsWith("data:");
  };

  return (
    <div className="memory-detail-container">
      <h2>Memory Details</h2>

      {memory.file_path && (
        <div className="memory-detail-media">
          {isImage(memory.file_path) ? (
            <img
              className="memory-detail-image"
              src={memory.file_path}
              alt={memory.title}
            />
          ) : (
            <p>
              File: <a href={memory.file_path}>{memory.file_path}</a>
            </p>
          )}
        </div>
      )}

      <div className="memory-detail-section">
        <h3>Title</h3>
        <p>{memory.title || "-"}</p>
      </div>

      <div className="memory-detail-section">
        <h3>Date</h3>
        <p>{formatDate(memory.date)}</p>
      </div>

      <div className="memory-detail-section">
        {memory.body && (
          <>
            <h3>Description</h3>
            <p>{memory.body || "-"}</p>
          </>
        )}
      </div>

      <div className="memory-detail-section">
        {memory.lovedones && memory.lovedones.length > 0 && (
          <>
            <h3>Loved Ones</h3>
            <div className="memory-detail-tags">
              {(memory.lovedones || []).map((lo, i) => (
                <span key={i} className="memory-detail-tag">
                  {lo}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="memory-detail-section">
        {memory.tags && memory.tags.length > 0 && (
          <>
            <h3>Tags</h3>
            <div className="memory-detail-tags">
              {memory.tags.map((tag, i) => (
                <span key={i} className="memory-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="memory-detail-buttons">
        <Link id="memory-detail-home-button" to="/">
          Back
        </Link>
        <Link id="memory-detail-edit-button" to={`/memory/${id}/edit`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default MemoryDetail;
