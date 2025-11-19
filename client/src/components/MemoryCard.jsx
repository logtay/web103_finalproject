import "../css/MemoryCard.css";
import { Link } from "react-router-dom";

const MemoryCard = ({ id, title, body, date, file_path }) => {
  return (
    <Link className="memory-card" to={`/memory/${id}`}>
      <img className="memory-card-image" src={file_path} alt={title} />

      <div className="memory-card-content">
        <div className="memory-card-text-container">
          <h3 className="memory-card-title">{title}</h3>
          <span className="memory-card-date">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <p className="memory-card-description">{body}</p>
      </div>
    </Link>
  );
};

export default MemoryCard;
