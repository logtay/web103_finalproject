
import "../css/MemoryCard.css";
import { FiFile } from "react-icons/fi";

const MemoryCard = ({ memory }) => {
  const { title, body, date, tags, lovedones, file_path } = memory;

  return (
    <div className="memory-card">
      {file_path && (
        <div className="memory-card-file">
          <FiFile size={40} />
        </div>
      )}

      <div className="memory-card-content">
        <h3 className="memory-card-title">{title}</h3>
        <p className="memory-card-description">{body}</p>

        <div className="memory-card-footer">
          <span className="memory-card-date">{new Date(date).toLocaleDateString()}</span>
          <div className="memory-card-tags">
            {tags.map((tag, i) => (
              <span key={i} className="memory-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;