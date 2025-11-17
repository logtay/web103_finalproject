import "../css/FilterButton.css";
import { useState } from "react";

const FilterButton = ({ name, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    const nextState = !isSelected;
    setIsSelected(nextState);
    onClick(name, nextState);
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
