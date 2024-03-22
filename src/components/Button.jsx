import { useNavigate } from "react-router-dom";

import "../styles/Button.css";

const Button = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (children === "Home") {
      navigate("/home");
    } else {
      localStorage.removeItem("user-chattoApp");
      navigate("/");
    }
  };

  return (
    <button className="button" onClick={() => handleLogout()}>
      {children}
    </button>
  );
};

export default Button;
