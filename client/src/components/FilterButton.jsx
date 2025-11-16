import "../css/FilterButton.css";
import { useState } from "react";

const FilterButton = ({ name, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected((prev) => !prev);
    onClick(name);
  }

  return (
    <button
      className={`filter-button ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default FilterButton;
