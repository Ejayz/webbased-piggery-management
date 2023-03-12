"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
export default function Input({
  name,
  label,
  register,
  errors,
  required,
  options,
  disabled = false,
  validationSchema,
}: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {label} {required && "*"}
        </span>
      </label>
      <div className="input-group">
        <select
          required={required}
          className={`select text-base-content w-full max-w-xs select-bordered ${
            errors[name] != undefined ? "select-error" : ""
          }`}
          {...register(name, validationSchema)}
        >
          <option className="text-base-content" disabled={disabled} value="">
            {label}
          </option>
          {options.map((value: any, key: number) => {
            return (
              <option
                id={name}
                key={key}
                disabled={value.disabled}
                className="text-base-content"
                value={value.value}
              >
                {value.display}
              </option>
            );
          })}
        </select>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="label text-error">{message}</p>}
      />
    </div>
  );
}
