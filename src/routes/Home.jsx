import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { getUserProfile, getContacts } from "../utils/APIRoute.js";
import { socket } from "../utils/socket.js";
import "../styles/Home.css";

import Chat from "../components/Chat.jsx";
import ContainerProfile from "../components/ContainerProfile.jsx";

const Login = () => {
  const navigate = useNavigate();
  // const [selectContact, setSelectContact] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState({});
  const [contacts, setContacts] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getUser = async (userId) => {
    try {
      const result = await axios.get(`${getUserProfile}/${userId}/`);

      if (result.status) {
        const { data } = result;
        setUserProfile(data.user);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const getContactsUser = async (userId) => {
    try {
      const result = await axios.get(`${getContacts}/${userId}`);
      if (result.status) {
        const { data } = result;
        setContacts(data.users);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user-chattoApp"));
    if (!userId) navigate("/");

    socket.emit("add-user", userId);

    const getProfile = () => {
      getUser(userId);
    };
    getProfile();
  }, []);

  useEffect(() => {
    const loadingContact = () => {
      getContactsUser(userProfile._id);
    };
    loadingContact();
  }, [contacts]);

  return (
    <div className="home">
      <ContainerProfile
        userProfile={userProfile}
        contacts={contacts}
        setSelectedChatUser={setSelectedChatUser}
      />

      {selectedChatUser === undefined ? (
        ""
      ) : (
        <Chat userProfile={userProfile} selectedChatUser={selectedChatUser} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
