/**
 * type={"text"}

 *label={"label"}

 *placeholder={"placeholder"}

 *name={"inputname"}

 *disabled={false}

 *className={"input input-bordered h-8"}

 *value={state}

 *setter={setState}
 
 *required={false} */
"use client";
import { useEffect, useState } from "react";

export default function InputBox({
  type,
  label,
  placeholder,
  name,
  disabled = false,
  className = "input input-bordered ",
  getter,
  setter,
  required = false,
  autofocus = false,
  readonly = false,
  validation,
  setIsValid,
  reset,
  startValidation,
}: any) {
  const [errorMessage, setErrorMessage] = useState([]);
  const [startType, setStartType] = useState(false);
  const validate = async (value: string) => {
    let valid: any = await validation(value);
    if (valid.message.length != 0) {
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
          location.pathname == "/" ||
          location.pathname.includes("forgotpassword") ||
          location.search.includes("Remove")
        )
      ) {
        validate(getter);
      }
    }
  }, [startValidation]);

  // useEffect(() => {
  //   console.log(reset);
  //   if (startType && !reset) {
  //     validate(getter);
  //   }
  // }, [getter]);
  return (
    <>
      <div id="input-form text-base-content px-10 w-auto">
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={`input input-bordered ${className}  ${
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
        <label className="label">
          <span className="label-text text-base">
            <ul className="max-w-md space-y-1 text-error text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
              {validation(getter).then((message: any) => {
                return message.map((message: string, key: number) => {
                  return <li key={key}>{message}</li>;
                });
              })}
            </ul>
          </span>
        </label>
      </div>
    </>
  );
}
