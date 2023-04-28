"use client";

import { ErrorMessage } from "@hookform/error-message";

const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
  readonly = false,
  id,
  item_unit,
  value,
  setValue,
  index,
}: any) => (
  <div className="form-control">
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">{label}</span>
      </label>
      <label className="input-group">
        <input
          value={value}
          onChange={(e) =>
            setValue((prevState: any) => {
              const newState = [...prevState];
              newState[index].quantity = e.target.value;
              return newState;
            })
          }
          className={`input input-bordered w-full text-base-content `}
          step="any"
          type="number"
          required={required}
        />
        <span className="uppercase">{item_unit}</span>
      </label>
    </div>
  </div>
);
export default Input;
