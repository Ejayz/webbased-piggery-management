"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function passwordBox({
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
  const [showPassword, setShowPassword] = useState(false);
  let [errorMessage, setErrorMessage] = useState([]);
  const validate = async (value: string) => {
    let valid: any = await validation(value);
    if (valid.message.length !== 0) {
      setErrorMessage(valid.message);
      setter(value);
      setIsValid(false);
    } else {
      setErrorMessage([]);
      setter(value);
      setIsValid(true);
    }
  };
  useEffect(() => {
    setErrorMessage([]);
  }, [reset]);
  useEffect(() => {
    if (startValidation) {
      if (
        !(
          location.pathname.includes("Create") ||
          location.pathname == "/" ||
          location.pathname.includes("forgotpassword") ||
          location.search.includes("Remove")
        )
      ) {
        validate(getter);
      }
    }
  }, []);
  return (
    <div className="form-control text-base-content">
      <label className="label">
        <span className="label-text text-base">Password</span>
      </label>
      <label className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`input text-base-content my-auto input-bordered ${className} ${
            errorMessage.length == 0 ? "" : "input-error"
          }`}
          name={name}
          value={getter}
          onChange={(e) => {
            validate(e.target.value);
          }}
          required={required}
          autoFocus={autofocus}
          readOnly={readonly}
          disabled={disabled}
        />
        <button
          type="button"
          name="showpassword"
          className={`btn tooltip h-6 btn-square bg-base-200 flex  `}
          onClick={() => setShowPassword(!showPassword)}
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
      </label>
      <label className="label">
        <span className="label-text text-base">
          <ul className="max-w-md space-y-1 text-sm text-error text-gray-500 list-disc list-inside dark:text-gray-400">
            {errorMessage.map((message: string, key: number) => {
              return <li key={key}>{message}</li>;
            })}
          </ul>
        </span>
      </label>
    </div>
  );
}
