"use client";

import { useEffect, useState } from "react";

export default function InputBoxLeft({
  type,
  label,
  placeholder,
  name,
  disabled = false,
  className = "input input-bordered text-base-content",
  getter,
  setter,
  required = false,
  autofocus = false,
  readonly = false,
  startingData,
  validation,
  setIsValid,
  reset,
  startValidation,
}: any) {
  const [errorMessage, setErrorMessage] = useState([]);
  const [startType, setStartType] = useState(false);

  const validate = async (value: string) => {
    let valid: any = await validation(value);
    if (valid.message.length !== 0) {
      setErrorMessage(valid.message);
      setIsValid(false);
    } else {
      setErrorMessage([]);
      setIsValid(true);
    }
  };
  useEffect(() => {
    setStartType(false);
  }, [reset]);

  
  useEffect(() => {
    console.log("triggered");
    setErrorMessage([]);
  }, [startType]);


  useEffect(() => {
    if (startValidation) {
      if (
        !(
          location.pathname.includes("Create") ||
          location.pathname.includes("Remove") ||
          location.pathname == "/" ||
          location.pathname.includes("forgotpassword")
        )
      ) {
        validate(getter);
      }
    }
  }, []);
  useEffect(() => {
    if (startType) {
      validate(getter);
    }
  }, [getter]);
  return (
    <>
      <div className="form-control text-base-content">
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <label className="input-group">
          <span>{startingData}</span>
          <input
            type={type}
            placeholder={placeholder}
            className={`input text-base-content input-bordered ${className} ${
              errorMessage.length == 0 ? "" : "input-error"
            }`}
            name={name}
            value={getter}
            onClick={() => {
              setStartType(true);
            }}
            onChange={(e) => {
              setter(e.target.value);
            }}
            required={required}
            autoFocus={autofocus}
            readOnly={readonly}
            disabled={disabled}
          />
        </label>
        <label className="label">
          <span className="label-text text-base">
            <ul className="max-w-md space-y-1 text-error text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
              {errorMessage.map((message: string, key: number) => {
                return <li key={key}>{message}</li>;
              })}
            </ul>
          </span>
        </label>
      </div>
    </>
  );
}
