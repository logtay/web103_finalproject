import "../css/MemoryForm.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CreatableSelect from "react-select/creatable";

const MemoryForm = ({ initData, onSubmit }) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
    });

  const [formData, setFormData] = useState({
    title: initData.title,
    description: initData.description,
    date: initData.date,
    lovedOnes: initData.lovedOnes,
    tags: initData.tags,
  });

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

  const submitForm = async (event) => {
    event.preventDefault();
    // Check input
    if (acceptedFiles.length === 0) {
      alert("Please upload an image before submitting.");
      return;
    }

    console.log(formData.title);
    console.log(formData.description);
    console.log(formData.date);
    console.log(formData.lovedOnes);
    console.log(formData.tags);
    console.log(acceptedFiles[0]);

    onSubmit({ ...formData, media: acceptedFiles[0] });
  };

  return (
    <div className="create-memory-container">
      <form
        className="create-memory-form"
        onSubmit={(event) => submitForm(event)}
      >
        <h2 id="memory-form-title">Upload your memories</h2>
        <div
          {...getRootProps()}
          className={`file-drop-zone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
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
          name="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter a title"
          maxLength={128}
          required
        />
        <label htmlFor="memory-date">Date</label>
        <input
          type="date"
          id="memory-date"
          name="date"
          value={formData.date.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              date: e.target.value ? new Date(e.target.value) : null,
            }))
          }
          required
        />
        <label htmlFor="memory-loved-ones">Loved Ones Names</label>
        <CreatableSelect
          inputId="memory-loved-ones"
          isMulti={true}
          isSearchable={true}
          placeholder="Tag your loved ones"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
          name="lovedOnes"
          value={formData.lovedOnes}
          onChange={(selectedOptions) =>
            setFormData((prev) => ({ ...prev, lovedOnes: selectedOptions }))
          }
        />
        <label htmlFor="memory-description">Description</label>
        <textarea
          id="memory-description"
          placeholder="Give some details"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          maxLength={500}
        />
        <label htmlFor="memory-tag">Tags</label>
        <CreatableSelect
          inputId="memory-tag"
          isMulti={true}
          isSearchable={true}
          placeholder="Tag your memories"
          menuPlacement="auto"
          maxMenuHeight="30vh"
          styles={selectStyles}
          name="tags"
          value={formData.tags}
          onChange={(selectedOptions) =>
            setFormData((prev) => ({ ...prev, tags: selectedOptions }))
          }
        />
        <button id="upload-button" type="onSubmit">
          Upload Memory
        </button>
      </form>
    </div>
  );
};

export default MemoryForm;
