import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerRoute } from "../utils/APIRoute.js";

import ReactLoading from "react-loading";

import axios from "axios";

import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (username.length === 0) {
      toast.error("Username is required!", toastOptions);
      return false;
    } else if (email.length === 0) {
      toast.error("Email is required!", toastOptions);
      return false;
    } else if (password.length === 0) {
      toast.error("Password is required!", toastOptions);
      return false;
    } else if (confirmPassword.length === 0) {
      toast.error("Confirm password is required!", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords don't match", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password } = values;
      setLoading(true);
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status) {
          setLoading(false);
          alert(data.message);
          navigate("/");
        }

        setValues({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
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
      <div className="register">
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          <h1>Register</h1>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={values.username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">
            {!loading ? (
              "Cadastrar"
            ) : (
              <ReactLoading type="spin" color="white" height={25} width={25} />
            )}
          </button>
          <p>
            Already registered? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
