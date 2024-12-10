import React, { useState } from "react";
import DropDown from "./DropDown";
import TextInputComponent from "./TextInputComponent";
import { Toast } from "./Tost";
import { instance } from "../controller/Common";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const RaiseQuestionModal = ({ open, setOpen, getQuestion }) => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    userId: userDetails.userId,
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await instance.post("/api/createQuestion", formData);

      if (response.status === 200) {
        Toast.fire({
          title: "Question created successfully",
          icon: "success",
        });
        getQuestion();
        setFormData({
          title: "",
          description: "",
          status: "Pending",
          userId: userDetails.userId,
        });
        handleClose();
      } else {
        Toast.fire({
          title: response.data.message,
          icon: "error",
        });
        console.error("Error during registration:", response.data.message);
      }
    } catch (error) {
      Toast.fire({
        title: "An error occurred while submitting the task",
        icon: "error",
      });
      console.error("An error occurred while submitting the form:", error);
    }
  };

  if (!open) return null;

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
            <h5 className="modal-title">Raise Question</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <TextInputComponent
                label="Title"
                type="text"
                placeholder="Enter the task title"
                value={formData.title}
                onChange={handleChange}
                id="title-input"
                name="title"
                error={errors.title}
              />
              <div>
                <label htmlFor="description-input-label" className="form-label">
                  Description
                </label>
                <textarea
                  id="description-input-label"
                  rows="5"
                  cols="100"
                  name="description"
                  placeholder="Enter the task description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
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

export default RaiseQuestionModal;
