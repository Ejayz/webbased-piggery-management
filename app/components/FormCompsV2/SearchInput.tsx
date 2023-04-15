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
  item_unit,
  showModal,
}: any) => (
  <div className="form-control">
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">{label}</span>
      </label>
      <label className="input-group">
        <input
          id={id}
          name={name}
          type={type}
          readOnly={true}
          required={required}
          placeholder={label}
          className={`input input-bordered w-full text-base-content ${
            errors[name] != undefined ? "input-error" : ""
          }`}
          {...register(name, validationSchema)}
          step="any"
        />
        <button
          type="button"
          disabled={readonly}
          onClick={() => {
            showModal(true);
          }}
          className="btn"
        >
          {label}
        </button>
      </label>
    </div>
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
