import React, { useState } from "react";
import TextInputComponent from "../../components/TextInputComponent";
import DropDown from "../../components/DropDown";
import "./RegisterForm.css";
import { instance } from "../../controller/Common";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../../components/Tost";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
    bankDetails: "",
    role: "USER",
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await instance.post(`/api/registerUser`, formData);
        if (response.status === 200) {
          Toast.fire({
            title: "User registered successfully",
            icon: "success",
          });
          navigate("/login");
          console.log("User registered successfully:", response.data);
          setFormData({
            name: "",
            email: "",
            mobile: "",
            gender: "",
            address: "",
            bankDetails: "",
            password: "",
            repassword: "",
          });
        } else {
          console.error("Error during registration:", response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 402) {
          Toast.fire({
            title: "Email ID already exists",
            icon: "error",
          });
        } else {
          Toast.fire({
            title: "Something went wrong!",
            icon: "error",
          });
        }
        console.error("An error occurred while submitting the form:", error);
      }
    }
  };

  return (
    <div className="register-form">
      <div className="card">
        <h2 className="card-title">Register Form</h2>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div className="form-row">
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
          </div>
          <div className="form-row">
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
          </div>
          <div className="form-row">
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
          <div
            className="form-col"
            style={{ textAlign: "center", width: "100%" }}
          >
            <span>
              Already have an account?
              <Link
                className="nav-link"
                to="/login"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Login
              </Link>
            </span>
          </div>
          <div className="form-col" style={{ marginTop: "10px" }}>
            <button type="submit" className="btn-register btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
