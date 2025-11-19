import "../css/ReadMemories.css";
import { useState, useEffect } from "react";
import { lovedOnesOptions, tagsOptions } from "../data/data.js";
import MemoryCard from "../components/MemoryCard.jsx";
import FilterPanel from "../components/FilterPanel";
import MemoryAPI from "../services/MemoryAPI.js";

const ReadMemories = ({ userId }) => {
  const [selectedLovedOnes, setSelectedLovedOnes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    async function fetchMemories() {
      const data = await MemoryAPI.getMemories(userId);
      setMemories(data);
    }
    fetchMemories();
  }, [userId]);

  function handleLovedOnes(lovedOnes) {
    setSelectedLovedOnes(lovedOnes);
  }

  function handleTags(tags) {
    setSelectedTags(tags);
  }

  async function filterMemories() {}

  return (
    <div>
      <div className="filter-container">
        <button id="filter-button" onClick={filterMemories}>
          Filter
        </button>
        <div className="filter-panels">
          <FilterPanel
            title={"Loved Ones"}
            options={lovedOnesOptions}
            onChange={handleLovedOnes}
          />
          <FilterPanel
            title={"Tags"}
            options={tagsOptions}
            onChange={handleTags}
          />
        </div>
      </div>
      <div className="memories-container">
        {memories.map((memory) => {
          return (
            <MemoryCard
              key={memory.id}
              id={memory.id}
              title={memory.title}
              body={memory.body}
              date={memory.date}
              file_path={memory.file_path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReadMemories;
