"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import Image from "next/image";
export default function Input({
  name,
  label,
  register,
  errors,
  required,
  validationSchema,
}: any) {
  console.log(errors);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">
          {label} {required && "*"}
        </span>
      </label>
      <div className="input-group">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={label}
          required={required}
          className={`input text-base-content input-bordered w-full ${
            errors.password != undefined ? "input-error" : ""
          }`}
          {...register(name, validationSchema)}
        />
        <button
          type="button"
          name="showpassword"
          className={`btn tooltip btn-square bg-base-200 flex  `}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          aria-label={"show/hide password"}
        >
          {!showPassword ? (
            <Image
              src={`/assets/icons/eye-slash-solid.svg`}
              alt={"eyes"}
              className="w-6 h-6"
              width={576}
              height={512}
            ></Image>
          ) : (
            <Image
              src={`/assets/icons/eye-solid.svg`}
              alt={"eyes"}
              className="w-6 h-6"
              width={576}
              height={512}
            ></Image>
          )}
        </button>
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
}
