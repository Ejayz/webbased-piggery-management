export default function SelectBox({
  label,
  name,
  selected,
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
          <option
            selected={selected == "default" ? true : false}
            value={"default"}
          >
            {" "}
            {default_option}
          </option>
          {options.map((item: any, index: number) => {
            return (
              <option
                key={index}
                selected={selected == item.value ? true : false}
                value={item.value}
              >
                {item.display}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
