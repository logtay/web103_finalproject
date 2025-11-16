import "../css/ReadMemories.css";
import { lovedOnesOptions, tagsOptions } from "../data/data.js";
import FilterPanel from "../components/FilterPanel";

const ReadMemories = () => {
  return (
    <div>
      <div className="filter-panels">
        <FilterPanel title={"Loved Ones"} options={lovedOnesOptions} />
        <FilterPanel title={"Tags"} options={tagsOptions} />
      </div>
    </div>
  );
};

export default ReadMemories;
