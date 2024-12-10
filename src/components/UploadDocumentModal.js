import React, { useState } from "react";
import DropDown from "./DropDown";
import { instance } from "../controller/Common";
import { Toast } from "./Tost";

const UploadDocumentModal = ({
  openDocument,
  setOpenDocument,
  selectedQuestion,
}) => {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleClose = () => {
    setOpenDocument(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError("File size exceeds 5MB. Please upload a smaller file.");
        setFile(null);
        setPreview(null);
      } else {
        setFileError("");
        setFile(selectedFile);

        if (selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setPreview(null);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("questionId", selectedQuestion.questionId);
      formData.append("status", status);
      formData.append("file", file);

      const response = await instance.put("/api/updateQuestion", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Toast.fire({
          title: "Question updated successfully",
          icon: "success",
        });
        handleClose();
        setStatus("");
        setFile(null);
      }
    } catch (error) {
      Toast.fire({
        title: "Something went wrong!",
        icon: "error",
      });
      console.error("An error occurred while submitting the form:", error);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h5 className="modal-title">Upload Document</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <DropDown
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                  name="status"
                  id="status-dropdown"
                  options={[
                    { value: "Pending", label: "Pending" },
                    { value: "Completed", label: "Completed" },
                  ]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="file-upload">
                  Upload Document (PDF or Image)
                </label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  id="file-upload"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {fileError && <p className="text-danger">{fileError}</p>}
              </div>
              {preview && (
                <div className="image-preview mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
