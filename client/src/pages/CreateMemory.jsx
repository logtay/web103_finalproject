import "../css/CreateMemory.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatableSelect from "react-select/creatable";

const CreateMemory = () => {
  //const [memoryDetail, setMemoryDetail] = useState({});

  //const handleChange = () => {};
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: { "image/*": [] },
    });

  const createMemory = () => {};

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.5rem",
      backgroundColor: state.isFocused
        ? "rgb(210, 210, 210)"
        : "rgb(230, 230, 230)",
      border: "2px solid",
      borderColor: state.isFocused ? "rgb(45, 45, 45)" : "gray",
      borderRadius: "8px",
      fontSize: "1rem",
      boxShadow: "none",
      minHeight: "unset",
      "&:hover": {
        backgroundColor: "rgb(210, 210, 210)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "6px",
      padding: "2px 4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "0.9rem",
    }),
  };

  return (
    <div className="create-memory-container">
      <form className="create-memory-form" onSubmit={createMemory}>
        <h2 id="memory-form-title">Upload your memories</h2>
        <div
          {...getRootProps()}
          className={`file-drop-zone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} required />
          {acceptedFiles.length > 0 ? (
            <p id="memory-file">{acceptedFiles[0].name}</p>
          ) : (
            <p id="memory-file">Click/Drag to Upload Media</p>
          )}
        </div>
        <label htmlFor="memory-title">Title</label>
        <input
          type="text"
          id="memory-title"
          placeholder="Enter a title"
          required
        />
        <label htmlFor="memory-date">Date</label>
        <input type="date" id="memory-date" required />
        <label htmlFor="memory-loved-ones">Loved Ones Names</label>
        <CreatableSelect
          id="memory-loved-ones"
          isMulti={true}
          isSearchable={true}
          placeholder="Tag your loved ones"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
        />
        <label htmlFor="memory-description">Description</label>
        <textarea id="memory-description" placeholder="Give some details" />
        <label htmlFor="memory-tag">Tags</label>
        <CreatableSelect
          id="memory-tag"
          isMulti={true}
          isSearchable={true}
          placeholder="Tag your memories"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
        />
        <button id="upload-button" type="onSubmit">
          Upload Memory
        </button>
      </form>
    </div>
  );
};

export default CreateMemory;
