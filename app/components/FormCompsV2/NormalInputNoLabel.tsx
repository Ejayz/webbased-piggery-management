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
  id,
}: any) => (
  <div className="form-control">
    <input
      id={id}
      name={name}
      type={type}
      readOnly={readonly}
      required={required}
      placeholder={label}
      className={`input  text-base-content ${
        errors[name] != undefined ? "input-error" : ""
      }`}
      {...register(name, validationSchema)}
      step="any"
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
