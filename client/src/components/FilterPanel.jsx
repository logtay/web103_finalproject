import "../css/FilterPanel.css";
import { useState } from "react";
import FilterButton from "./FilterButton";

const FilterPanel = ({ title, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleSelection(optionName, isSelected) {
    setSelectedOptions((prev) =>
      isSelected
        ? [...prev, optionName]
        : prev.filter((option) => option !== optionName)
    );
    onChange(selectedOptions);
  }

  return (
    <>
      {options && (
        <div className="filter-panel-container">
          <h3 className="filter-panel-title">{title}</h3>
          <ul className="options-list">
            {options.map((option) => (
              <FilterButton
                name={option.label}
                key={option.value}
                onClick={handleSelection}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
