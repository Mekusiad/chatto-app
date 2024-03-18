import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { urlAvatarApi, insertAvatarRoute } from "../utils/APIRoute";

import axios from "axios";

import "../styles/SetAvatar.css";

const SetAvatar = () => {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [seletedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const avatarImage = `${urlAvatarApi}${randomId}.png`;

    return avatarImage;
  };

  const validationAvatar = () => {
    if (avatars[seletedAvatar] === undefined) {
      toast.error("Avatar not selected.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSelectedAvatar = (index) => {
    setSelectedAvatar(index);
  };

  const handleSetAvatar = async () => {
    if (validationAvatar()) {
      const user = JSON.parse(localStorage.getItem("user-chattoApp"));

      const URI = `${insertAvatarRoute}/${user}`;
      try {
        if (user) {
          const image = avatars[seletedAvatar];

          const { data } = await axios.put(URI, { data: image });

          if (data.status) {
            alert(data.message);
            navigate("/");
          }
        }
      } catch (error) {
        toast.error("Something went wrong", toastOptions);
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user-chattoApp");
    if (!user) navigate("/");
    const data = [];

    for (let i = 0; i < 4; i++) {
      const image = getAvatar();
      data.push(image);
    }
    setAvatars(data);
  }, []);

  return (
    <>
      <div className="container-page-avatar">
        <div className="container-avatar">
          <h2>Choose Avatar</h2>
          <div className="choose-avatar">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  seletedAvatar === index ? "selected" : ""
                }`}
                onClick={() => handleSelectedAvatar(index, avatar)}
              >
                <img src={avatar} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={handleSetAvatar}>Set Avatar</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
