"use client";

import { ErrorMessage } from "@hookform/error-message";

const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  readonly = false,
}: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">
        {" "}
        {label}
        {required && "*"}
      </span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      readOnly={readonly}
      placeholder={label}
      className={`input input-bordered text-base-content ${
        errors[name] != undefined ? "input-error" : ""
      }`}
      {...register(name, validationSchema)}
    />
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="mt-2 text-sm  text-error">
          <span className="font-medium">{message}</span>{" "}
        </p>
      )}
    />
  </div>
);
export default Input;
