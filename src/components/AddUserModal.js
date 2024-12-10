import React, { useState } from "react";
import TextInputComponent from "./TextInputComponent";
import DropDown from "./DropDown";
import { instance } from "../controller/Common";
import { Toast } from "./Tost";

const AddUserModal = ({ addOpen, setAddOpen, fetchUsers }) => {
  const handleClose = () => {
    setAddOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    bankDetails: "",
    role: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    bankDetails: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.bankDetails) {
      newErrors.bankDetails = "Bank Details is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (formData.password !== formData.repassword) {
      newErrors.repassword = "Passwords must match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await instance.post(`/api/registerUser`, formData);
      if (response.status === 200) {
        Toast.fire({
          title: "User created successfully",
          icon: "success",
        });
        fetchUsers();
        setAddOpen(false);
      } else {
        Toast.fire({
          title: response.data.message,
          icon: "error",
        });
        console.error("Error during registration:", response.data.message);
      }
    } catch (error) {
      Toast.fire({
        title: "An error occurred while editing the task",
        icon: "error",
      });
      console.error("An error occurred while editing the form:", error);
    }
  };

  if (!addOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h5 className="modal-title">Create Users</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleCreate} style={{ margin: "20px" }}>
            <div className="form-row">
              <div className="form-col">
                <TextInputComponent
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name-input"
                  name="name"
                  error={errors.name}
                />
              </div>
              <div className="form-col">
                <TextInputComponent
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  id="email-input"
                  name="email"
                  error={errors.email}
                />
              </div>
              <div className="form-col">
                <TextInputComponent
                  label="Mobile"
                  type="number"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  id="mobile-input"
                  name="mobile"
                  error={errors.mobile}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <DropDown
                  value={formData.gender}
                  onChange={handleChange}
                  errors={errors.gender}
                  label="Gender"
                  name="gender"
                  id="gender-dropdown"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                />
              </div>
              <div className="form-col">
                <DropDown
                  value={formData.role}
                  onChange={handleChange}
                  errors={errors.role}
                  label="Role"
                  name="role"
                  id="role-dropdown"
                  options={[
                    { value: "ADMIN", label: "ADMIN" },
                    { value: "USER", label: "USER" },
                  ]}
                />
              </div>
              <div className="form-col">
                <TextInputComponent
                  label="Address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  id="address-input"
                  name="address"
                  error={errors.address}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <TextInputComponent
                  label="Bank Details"
                  type="bankDetails"
                  placeholder="Enter your Bank Details"
                  value={formData.bankDetails}
                  onChange={handleChange}
                  id="bankDetails-input"
                  name="bankDetails"
                  error={errors.bankDetails}
                />
              </div>
              <div className="form-col">
                <TextInputComponent
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password-input"
                  name="password"
                  error={errors.password}
                />
              </div>

              <div className="form-col">
                <TextInputComponent
                  label="Re-enter Password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.repassword}
                  onChange={handleChange}
                  id="repassword-input"
                  name="repassword"
                  error={errors.repassword}
                />
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

export default AddUserModal;
