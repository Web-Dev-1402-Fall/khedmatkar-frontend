import { createElement } from "react";
import classJoin from "../utils/classJoin";

const TextInput = (props) => {
  const {
    variant = "outlined",
    label = "",
    id,
    elementClassName,
    labelClassName,
    element = "input",
    error,
    required,
    className,
    children,
    value,
    type = "text",
    disabled,
    isOptional,
    fullWidth,
    onChange,
    ...otherProps
  } = props;

  const inputStyles = {
    // other variants could be added here
    "outlined-input": "bg-white focus:border-gray-primary autofill:!bg-white",
    "outlined-label": "bg-white text-gray-line",
  };
  return (
    <div className={classJoin([fullWidth && "w-full", className])}>
      <div className="relative">
        {createElement(element, {
          id,
          placeholder: " ",
          value,
          type,
          className: classJoin([
            "peer block rounded-xl px-6 h-14 appearance-none focus:outline-none border border-gray-card_border focus:ring-0",
            inputStyles[variant + "-input"],
            fullWidth && "w-full",
            error && "!border-red",
            element === "textarea" && "py-4",
            Boolean(value) && "pl-10",
            disabled && "cursor-not-allowed",
            elementClassName,
          ]),
          disabled,
          onChange: (e) => {
            const val = e.target.value;
            onChange?.(val, e);
          },
          ...otherProps,
        })}
        <label
          htmlFor={id}
          className={classJoin([
            "absolute rounded-md duration-300 transform -translate-y-4 scale-75 top-2 z-[1] origin-[90%] right-4 px-2",
            inputStyles[variant + "-label"],
            /* placeholder-shown */
            "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
            /* empty input */
            !value && "scale-100 -translate-y-1/2 top-1/2",
            /* focused input */
            "peer-focus:-translate-y-4 peer-focus:text-gray-line peer-focus:top-2 peer-focus:scale-75",
            disabled && "cursor-not-allowed",
            labelClassName,
          ])}
        >
          {label}
          {required ? " *" : ""}
        </label>
      </div>
      {error && (
        <div className="mt-1 min-h-[20px] text-xs text-red">{error || ""}</div>
      )}
    </div>
  );
};

export default TextInput;
