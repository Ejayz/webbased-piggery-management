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
  <div className="form-control text-base-content">
    <label className="label">
      <span className="label-text text-base">
        {label}
        {required && "*"}
      </span>
    </label>
    <label className="input-group">
      <span>+63</span>
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
        required={required}
      />
    </label>
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="mt-2 text-sm  text-error">
          <span className="font-bold">{message}</span>{" "}
        </p>
      )}
    />
  </div>
);
export default Input;
