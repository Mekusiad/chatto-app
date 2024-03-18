import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";
import { loginRoute } from "../utils/APIRoute.js";

import axios from "axios";

import "../styles/Login.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user-chattoApp")) navigate("/home");
  }, []);

  const validateForm = () => {
    const { username, password } = values;

    if (username === "") {
      toast.error("Username is required. ", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required. ", toastOptions);
    } else {
      return true;
    }
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const { username, password } = values;

    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const { data } = await axios.post(loginRoute, { username, password });

        if (data.status) {
          localStorage.setItem("user-chattoApp", JSON.stringify(data.id));
          alert(data.message);
          setLoading(false);
          navigate("/setAvatar");
        }
      } catch (error) {
        const { response } = error;
        const { data } = response;
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="login">
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              min="3"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">
            {!loading ? (
              "Entrar"
            ) : (
              <ReactLoading type="spin" color="white" height={25} width={25} />
            )}
          </button>
          <p>
            Not registered yet? <Link to="/register">Register</Link>{" "}
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
