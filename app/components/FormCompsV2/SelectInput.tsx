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
  id = "0",
}: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="form-control">
      <label className="label ">
        <span className="label-text text-lg">
          {label} {required && "*"}
        </span>
      </label>
      <label className="input-group">
        <select
          id={id}
          required={required}
          className={`select text-base-content w-full select-bordered ${
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
                id={id + key}
                key={key}
                disabled={value.disabled}
                className={`text-base-content ${
                  value.disabled ? "hidden" : ""
                }`}
                value={value.value}
              >
                {value.display}
              </option>
            );
          })}
        </select>
      </label>
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
}
