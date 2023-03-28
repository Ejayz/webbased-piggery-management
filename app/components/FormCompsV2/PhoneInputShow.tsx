"use client";

import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  readonly = false,
  triggerValidation = null,
  validateOnChange = false,
}: any) => (
  <div className="form-control text-base-content">
    <label className="label">
      <span className="label-text text-lg">
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
        onChange={() => {
          if (validateOnChange) {
            triggerValidation(name);
          }
        }}
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
