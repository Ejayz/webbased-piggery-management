"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
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
  onChangeAddFunction,
  onChangeSubtractFunction,
}: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [stores, setStores] = useState({ current: "", prev: "" });
  useEffect(() => {
    console.log("asddd")
    if (stores.current !== "") {
      onChangeAddFunction(stores.current);
    }
  }, [stores.current]);
  useEffect(() => {
    console.log("asd")
    if (stores.prev !== "") {
      onChangeSubtractFunction(stores.prev);
    }
  }, [stores.prev]);
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {label} {required && "*"}
        </span>
      </label>
      <div className="input-group">
        <select
          id={id}
          onChange={(e) => {
            console.log("hello")
            console.log(stores);
            if (stores.current == "") {
              setStores({ current: e.target.value, prev: "" });
            } else {
              setStores({ current: e.target.value, prev: stores.current });
            }
          }}
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
                id={id + key}
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
