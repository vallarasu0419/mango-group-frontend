import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const TextInputComponent = ({
  type,
  placeholder,
  value,
  onChange,
  id,
  label,
  className,
  error,
  name,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="input-group">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ borderRadius: "5px" }}
        />
        {type === "password" && (
          <span
            className="input-group-text"
            onClick={togglePasswordVisibility}
            style={{
              cursor: "pointer",
              zIndex: 999,
              marginTop: error ? "-12px" : "0px",
              borderRadius: "20px",
            }}
          >
            <i
              className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextInputComponent;
