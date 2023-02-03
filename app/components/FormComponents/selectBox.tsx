export default function SelectBox({
  label,
  name,
  disabled = false,
  default_option = "Options",
  options,
  setter,
  required = false,
}: any) {
  return (
    <>
      <div className="input-control  w-auto">
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <select
          disabled={disabled}
          name={name}
          className="select select-bordered"
          onChange={(e) => setter(e.target.value)}
          required={required}
        >
          <option value={"default"}>{default_option}</option>
          {options.map((item: any, index: number) => {
            return (
              <option key={index} defaultValue={item.value}>
                {item.display}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
