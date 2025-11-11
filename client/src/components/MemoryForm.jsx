import "../css/MemoryForm.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatableSelect from "react-select/creatable";

const MemoryForm = ({ title, initData, onSubmit, submitLabel, secondaryButton }) => {
  const [formData, setFormData] = useState({
    title: initData.title || "",
    description: initData.description || "",
    lovedOnes: initData.lovedOnes || [],
    tags: initData.tags || [], // Tags not implemented yet
  });

  // File upload doesnt work yet
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: () => {}, // do nothing
  });

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.5rem",
      backgroundColor: state.isFocused ? "rgb(210,210,210)" : "rgb(230,230,230)",
      border: "2px solid",
      borderColor: state.isFocused ? "rgb(45,45,45)" : "gray",
      borderRadius: "8px",
      fontSize: "1rem",
      boxShadow: "none",
      minHeight: "unset",
      "&:hover": { backgroundColor: "rgb(210,210,210)" },
    }),
    valueContainer: (provided) => ({ ...provided, padding: 0 }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
    multiValue: (provided) => ({ ...provided, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "6px", padding: "2px 4px" }),
    multiValueLabel: (provided) => ({ ...provided, fontSize: "0.9rem" }),
  };

  const submitForm = (event) => {
    event.preventDefault();
    // We are not sending tags to backend yet
    const payload = {
      title: formData.title,
      description: formData.description,
      lovedOnes: formData.lovedOnes || [],
    };
    onSubmit(payload);
  };

  return (
    <div className="create-memory-container">
      <form className="create-memory-form" onSubmit={submitForm}>
        <h2 id="memory-form-title">{title}</h2>

        <div
          {...getRootProps()}
          className={`file-drop-zone ${isDragActive ? "active" : ""}`}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "2px dashed gray",
            borderRadius: "8px",
            textAlign: "center",
            color: "#555",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop your file here...</p> : <p>Click or Drag a file here (Optional)</p>}
        </div>

        <label htmlFor="memory-title">Title</label>
        <input
          type="text"
          id="memory-title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter a title"
          maxLength={128}
          required
        />

        <label htmlFor="memory-loved-ones">Loved Ones Names</label>
        <CreatableSelect
          inputId="memory-loved-ones"
          isMulti
          isSearchable
          placeholder="Tag your loved ones"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
          value={formData.lovedOnes}
          onChange={(selected) => setFormData(prev => ({ ...prev, lovedOnes: selected }))}
        />

        <label htmlFor="memory-description">Description</label>
        <textarea
          id="memory-description"
          placeholder="Give some details"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          maxLength={500}
        />

        {/* Keep tags visible but do NOT send them in payload */}
        <label htmlFor="memory-tags">Tags</label>
        <CreatableSelect
          inputId="memory-tags"
          isMulti
          isSearchable
          placeholder="Tag your memories"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
          value={formData.tags}
          onChange={(selected) => setFormData(prev => ({ ...prev, tags: selected }))}
        />

        <div className="memory-form-buttons">
          {secondaryButton}
          <button id="upload-button" type="submit">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
};

export default MemoryForm;
