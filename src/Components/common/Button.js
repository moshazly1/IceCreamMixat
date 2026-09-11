import { Button as BsButton } from "react-bootstrap";
import "./Button.css";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...rest
}) {
  return (
    <BsButton
      bsPrefix="btn"
      onClick={onClick}
      className={`app-btn app-btn-${variant} ${className}`}
      {...rest}
    >
      {children}
    </BsButton>
  );
}
