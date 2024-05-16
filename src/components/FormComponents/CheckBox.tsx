import { cn } from "../../lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface ICheckBoxProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldErrors;
  name: Path<T>;
  label: string;
  value?: number | string;
  ServerErrors?: string;
  className?: string;
  Bgcolor?: string;
  children?: React.ReactNode | string;
  required?: boolean;
}
function CheckBox<T extends FieldValues>({
  register,
  name,
  label,
  value,
  errors,
  ServerErrors,
  className,
  Bgcolor = "light",
  children,
  required = false,
}: ICheckBoxProps<T>) {
  return (
    <div
      className={cn(
        `custom_checkbox w-fit  ${Bgcolor === "dark" ? "text-" : "text-"}   `,
        className
      )}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultValue={value}
        {...register(`${name}`, { valueAsNumber: true, required: required })}
      />
      <label className="custom_checkbox-label" htmlFor={name}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          className="checkbox-svg"
        >
          <mask fill="white" id="path-1-inside-1_476_5-37">
            <rect height="200" width="200"></rect>
          </mask>
          <rect
            mask="url(#path-1-inside-1_476_5-37)"
            strokeWidth="40"
            className="checkbox-box"
            height="200"
            width="200"
          ></rect>
          <path
            strokeWidth="15"
            d="M52 111.018L76.9867 136L149 64"
            className="checkbox-tick"
          ></path>
        </svg>
        <span className="label-text">{children ? children : label}</span>
      </label>
    </div>
  );
}

export default CheckBox;
