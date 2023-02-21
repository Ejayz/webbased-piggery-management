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
export default function InputBox({
  type,
  label,
  placeholder,
  name,
  disabled = false,
  className = "input input-bordered text-base-content",
  value = "",
  setter,
  required = false,
  autofocus = false,
  readonly = false,
}: any) {
  return (
    <>
      <div id="input-form px-10 w-auto">
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={className + " text-base-content"}
          name={name}
          disabled={disabled}
          onChange={(e) => setter(e.target.value)}
          required={required}
          autoFocus={autofocus}
          readOnly={readonly}
        />
      </div>
    </>
  );
}
