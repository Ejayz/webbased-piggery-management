"use client";

import { ErrorMessage } from "@hookform/error-message";

export function Input({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  readonly = false,
  id,
  search,
}: any) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">
          {label}
          {required && "*"}
        </span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        readOnly={readonly}
        required={required}
        placeholder={label}
        className={`input input-bordered text-base-content ${
          errors[name] != undefined ? "input-error" : ""
        }`}
        {...register(name, validationSchema)}
        step="any"
      />
    </div>
  );
}
