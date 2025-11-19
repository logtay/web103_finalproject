import "../css/MemoryForm.css";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select/creatable";
import { lovedOnesOptions, tagsOptions } from "../data/data";

const MemoryForm = ({
  title,
  initData,
  onSubmit,
  submitLabel,
  secondaryButton,
}) => {
  const [formData, setFormData] = useState({
    title: initData.title || "",
    description: initData.description || "",
    date: initData.date || new Date(),
    file: initData.file_path || null,
    lovedOnes: initData.lovedOnes || [],
    tags: initData.tags || [],
  });
  const [uploadedFile, setUploadedFile] = useState(formData.file);
  const [availableLovedOnesOptions, setAvailableLovedOnesOptions] =
    useState(lovedOnesOptions);
  const [availableTagOptions, setAvailableTagOptions] = useState(tagsOptions);

  useEffect(() => {
    setFormData(initData);
    setUploadedFile(initData.file);
    setAvailableLovedOnesOptions(
      lovedOnesOptions.filter(
        (option) =>
          !initData.lovedOnes.some(
            (selected) => selected.value === option.value
          )
      )
    );
    setAvailableTagOptions(
      tagsOptions.filter(
        (option) =>
          !initData.tags.some((selected) => selected.value === option.value)
      )
    );
  }, [initData]);

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/auto/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    return await res.json();
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile({
      file,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.5rem",
      backgroundColor: state.isFocused
        ? "rgb(210,210,210)"
        : "rgb(230,230,230)",
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
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "6px",
      padding: "2px 4px",
    }),
    multiValueLabel: (provided) => ({ ...provided, fontSize: "0.9rem" }),
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!uploadedFile) {
      alert("Require an image!");
      return;
    }
    const mediaUrl = await uploadFile(uploadedFile.file);
    onSubmit({ ...formData, media: mediaUrl.secure_url });
  };

  return (
    <div className="create-memory-container">
      <form className="create-memory-form" onSubmit={submitForm}>
        <h2 id="memory-form-title">{title}</h2>

        <div
          {...getRootProps()}
          className={`file-drop-zone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          {!uploadedFile && <p>Click or Drag a file here</p>}
          {uploadedFile && (
            <div className="preview">
              {uploadedFile.previewUrl ? (
                <img
                  className="preview-image"
                  src={uploadedFile.previewUrl}
                  alt="preview"
                />
              ) : (
                <p>
                  File ready to upload:{" "}
                  <strong>{uploadedFile.file.name}</strong>
                </p>
              )}
            </div>
          )}
        </div>
        {uploadedFile && (
          <button
            type="button"
            id="remove-file-button"
            onClick={() => setUploadedFile(null)}
          >
            Remove File
          </button>
        )}

        <label htmlFor="memory-title">Title</label>
        <input
          type="text"
          id="memory-title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter a title"
          maxLength={50}
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

        <label htmlFor="memory-description">Description</label>
        <textarea
          id="memory-description"
          placeholder="Give some details"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          maxLength={500}
        />

        <label htmlFor="memory-loved-ones">Loved Ones Names</label>
        <Select
          inputId="memory-loved-ones"
          isMulti
          isSearchable={false}
          options={availableLovedOnesOptions}
          placeholder="Tag your loved ones"
          menuPlacement="auto"
          minMenuHeight="30vh"
          maxMenuHeight="50vh"
          styles={selectStyles}
          value={formData.lovedOnes}
          onChange={(selected) =>
            setFormData((prev) => ({ ...prev, lovedOnes: selected }))
          }
        />

        <label htmlFor="memory-tags">Tags</label>
        <Select
          inputId="memory-tags"
          isMulti
          isSearchable={false}
          options={availableTagOptions}
          placeholder="Tag your memories"
          menuPlacement="auto"
          minMenuHeight="30vh"
          maxMenuHeight="50vh"
          styles={selectStyles}
          value={formData.tags}
          onChange={(selected) =>
            setFormData((prev) => ({ ...prev, tags: selected }))
          }
        />

        <div className="memory-form-buttons">
          {secondaryButton}
          <button id="upload-button" type="submit">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoryForm;
