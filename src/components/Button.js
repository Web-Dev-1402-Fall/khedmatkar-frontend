import classJoin from "../utils/classJoin";

const Button = (props) => {
  const {
    variant = "primary",
    label,
    disabled = false,
    className,
    children,
    ...otherProps
  } = props;
  const mode = {
    primary: "bg-gray-primary text-white active:bg-gray-secondary",
    secondary: "bg-transparent border border-gray-primary text-gray-primary",
    brand: "bg-[#cd9c6a] border border-gray-primary text-gray-primary",
    danger: "bg-red text-white",
  }[variant];

  return (
    <button
      type="button"
      className={classJoin([
        "rounded-xl p-4 text-sm font-medium",
        disabled ? "bg-gray-disabled text-white cursor-not-allowed" : mode,
        className,
      ])}
      disabled={disabled}
      aria-label={label}
      {...otherProps}
    >
      {label ? label : children}
    </button>
  );
};

export default Button;
