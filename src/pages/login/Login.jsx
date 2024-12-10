import React, { useState } from "react";
import TextInputComponent from "../../components/TextInputComponent";
import "../registerForm/RegisterForm.css";
import { instance } from "../../controller/Common";
import { Link, useNavigate } from "react-router-dom";
import { cookie } from "../../controller/Common";
import { Toast } from "../../components/Tost";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await instance.post("/api/loginUser", {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          Toast.fire({ title: "User logged in successfully", icon: "success" });
          cookie.set("user", response?.data, {
            path: "/",
          });
          cookie.set("token", response?.data?.token, {
            path: "/",
          });
          setFormData({
            email: "",
            password: "",
          });
          if (response?.data?.role === "USER") {
            navigate("/dashboardLayout/viewUser");
          } else {
            navigate("/dashboardLayout/createUsers");
          }
        } else if (response.status === 203) {
          Toast.fire({
            title: "Email ID not found",
            icon: "error",
          });
        } else {
          console.error("Error during login:", response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 406) {
          Toast.fire({
            title: "Invalid password",
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
      <div className="card" style={{ maxWidth: "500px" }}>
        <h2 className="card-title">Login Form</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-col" style={{ textAlign: "center" }}>
            <span>
              Don't have an account?
              <Link
                className="nav-link"
                to="/"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                signup
              </Link>
            </span>
          </div>

          <div className="form-col" style={{ marginTop: "10px" }}>
            <button type="submit" className="btn-register btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
