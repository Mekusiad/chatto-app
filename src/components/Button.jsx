import { useNavigate } from "react-router-dom";

import { BiPowerOff } from "react-icons/bi";

import "../styles/Button.css";

const Button = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-chattoApp");
    navigate("/");
  };

  return (
    <button className="button" onClick={() => handleLogout()}>
      <BiPowerOff />
    </button>
  );
};

export default Button;
