import { useNavigate } from "react-router-dom";

import "../styles/Button.css";

const Button = ({ children, userProfile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (children === "Home") {
      navigate("/home");
    } else {
      if (localStorage.getItem("user-chattoApp")) {
        // socket.emit("logout", userProfile._id);
        localStorage.removeItem("user-chattoApp");

        navigate("/");
      }
    }
  };

  return (
    <button className="button" onClick={() => handleLogout()}>
      {children}
    </button>
  );
};

export default Button;
