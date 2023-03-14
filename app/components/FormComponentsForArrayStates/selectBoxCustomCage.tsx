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
  keys,
  add,
  deduct,
}: any) {
  console.log(options);
  const [errorMessage, setErrorMessage] = useState([]);
  const validate = async (value: string) => {
    const valid = await validation(value);
    if (valid.message.lenght) {
      setErrorMessage(valid.message);
    } else {
      setErrorMessage([]);
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

  useEffect(() => {
    validate(selected);
  }, [selected]);

  return (
    <>
      <select
        name={name}
        className={`select  text-base-content ${className} ${
          errorMessage.length == 0 ? "" : "select-error"
        }`}
        onChange={(e) => {
          if (selected == "") {
            add(e.target.value);
            setter(keys, e.target.value);
          } else if (selected != e.target.value) {
            deduct(selected);
            add(e.target.value);
            setter(keys, e.target.value);
          } else {
            add(e.target.value);
            setter(keys, e.target.value);
          }
        }}
        value={selected}
        required={required}
      >
        <option value={""} disabled={true}>
          {default_option}
        </option>
        {options.map((item: any, index: number) => {
          return (
            <option
              key={index}
              value={item.value}
              disabled={item.max == item.current_capacity}
            >
              {item.display}
            </option>
          );
        })}
      </select>
      <label className="label">
        <span className="label-text text-base">
          <ul className="max-w-md space-y-1 text-error text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
            {errorMessage.map((message: string, key: number) => {
              return <li key={key}>{message}</li>;
            })}
          </ul>
        </span>
      </label>
    </>
  );
}
