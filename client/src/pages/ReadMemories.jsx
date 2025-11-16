import "../css/ReadMemories.css";
import { useState, useEffect } from "react";
import { lovedOnesOptions, tagsOptions } from "../data/data.js";
import FilterPanel from "../components/FilterPanel";

const ReadMemories = () => {
  const [selectedLovedOnes, setSelectedLovedOnes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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
    </div>
  );
};

export default ReadMemories;
