import "../css/FilterPanel.css";
import FilterButton from "./FilterButton";

const FilterPanel = ({ title, options, onChange }) => {
  function handleSelection() {
    onChange();
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
