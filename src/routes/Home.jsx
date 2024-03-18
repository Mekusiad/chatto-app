import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserProfile, getContacts } from "../utils/APIRoute.js";

import axios from "axios";

import "../styles/Home.css";
import Contact from "../components/Contact.jsx";
import Chat from "../components/Chat.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [selectContact, setSelectContact] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState({});
  const [contacts, setContacts] = useState([]);

  const handleSelected = (index, userSelectTask) => {
    setSelectContact(index);
    setSelectedChatUser(userSelectTask);
  };

  const getUser = async (userId) => {
    try {
      const result = await axios.get(`${getUserProfile}/${userId}/`);

      if (result.status) {
        const { data } = result;
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error(error);
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
    console.log(userId);

    if (!userId) navigate("/");

    const getProfile = () => {
      getUser(userId);
      getContactsUser(userId);
    };
    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-chattoApp");
    navigate("/");
  };

  return (
    <div className="home">
      <div className="container-left">
        <div className="container-profile">
          <img src={userProfile.avatarImage} alt="profile-avatar" />
          <p>{userProfile.username}</p>
        </div>
        <div className="contacts">
          {contacts.map((user, index) => (
            <Contact
              key={index}
              user={user}
              index={index}
              selectContact={selectContact}
              handleSelected={handleSelected}
            />
          ))}
        </div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      {selectedChatUser === undefined ? (
        ""
      ) : (
        <Chat userProfile={userProfile} selectedChatUser={selectedChatUser} />
      )}
    </div>
  );
};

export default Login;
