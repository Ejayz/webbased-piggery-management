/**
 * 
            label={"Cage Type"}

              name={"selectName"}

              selected={state}

              disabled={false}

              default_option={"Default"}

              options={[
                {
                  value: "option1",
                  display: "Option 1",
                },
                
              ]}

              setter={set}

              required={true}
 */
"use client";

import { useEffect, useState } from "react";

export default function SelectBox({
  label,
  name,
  selected,
  disabled = false,
  default_option = "Options",
  options,
  setter,
  required = false,
  className,
  validation,
  setIsValid,
  reset,
  startValidation,
}: any) {
  const [errorMessage, setErrorMessage] = useState([]);
  const validate = async (value: string) => {
    const valid = await validation(value);
    if (valid.message.lenght) {
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
        validate(selected);
      }
    }
  }, []);
  return (
    <>
      <div className="input-control   w-auto">
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <select
          name={name}
          className={`select  select-bordered text-base-content ${className} ${
            errorMessage.length == 0 ? "" : "select-error"
          }`}
          onChange={(e) => validate(e.target.value)}
          value={selected}
          required={required}
        >
          <option value={""}>{default_option}</option>
          {options.map((item: any, index: number) => {
            return (
              <option key={index} value={item.value} disabled={item.disabled}>
                {item.display}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
