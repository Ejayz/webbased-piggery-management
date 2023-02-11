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
export default function InputBox({
  type,
  label,
  placeholder,
  name,
  disabled = false,
  className = "input input-bordered",
  value = "",
  setter,
  required = false,
  autofocus = false,
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
          className={className}
          name={name}
          disabled={disabled}
          onChange={(e) => setter(e.target.value)}
          required={required}
          autoFocus={autofocus}
        />
      </div>
    </>
  );
}
