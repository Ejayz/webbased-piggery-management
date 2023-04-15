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
    <label className="label">
      <span className="label-text text-lg">
        {" "}
        {label}
        {required && "*"}
      </span>
    </label>
    <textarea
      id={id}
      name={name}
      type={type}
      readOnly={readonly}
      required={required}
      placeholder={label}
      className={`textarea textarea-bordered textarea-sm w-full max-w-xs ${
        errors[name] != undefined ? "textarea-error" : ""
      }`}
      {...register(name, validationSchema)}
  
    ></textarea>

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
