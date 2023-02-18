"use client";
import { Input } from "@nextui-org/react";

export default function NextInput({
  variant = "normal",
  type = "text",
  setValue,
  value,
  required = false,
  label,
}: any) {
  if (variant == "normal") {
    if (type == "date" || type == "time") {
      return (
        <>
          <Input
            color="primary"
            type={type}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            required={required}
          />
        </>
      );
    } else {
      return (
        <>
          <Input
            type={type}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            required={required}
            labelPlaceholder={label}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <Input.Password
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required={required}
          clearable={true}
          value={value}
          labelPlaceholder="NextUI"
        />
      </>
    );
  }
}
