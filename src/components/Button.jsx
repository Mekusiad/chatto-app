import { useNavigate } from "react-router-dom";

import "../styles/Button.css";

const Button = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (children.type.name && children.type.name === "BiPowerOff") {
      localStorage.removeItem("user-chattoApp");
      navigate("/");
    } else if (children.toLowerCase() === "home") {
      navigate("/home");
    }
  };

  return (
    <button className="button" onClick={() => handleLogout()}>
      {children}
    </button>
  );
};

export default Button;
