import React from "react";

const DropDown = ({
  label,
  name,
  id,
  value,
  onChange,
  errors,
  className,
  options,
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={id}
        className={`form-control ${errors ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

export default DropDown;
