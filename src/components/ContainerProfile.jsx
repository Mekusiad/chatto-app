import { useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import Button from "../components/Button.jsx";
import Contact from "../components/Contact.jsx";

import "../styles/ContainerProfile.css";

const ContainerProfile = ({ userProfile, contacts, setSelectedChatUser }) => {
  const [selectContact, setSelectContact] = useState(false);

  const handleSelected = (index, userSelectTask) => {
    setSelectContact(index);
    setSelectedChatUser(userSelectTask);
  };

  return (
    <div className="container-left">
      <div className="container-profile">
        <Button userProfile={userProfile}>
          <BiPowerOff />
        </Button>
        <img src={userProfile.avatarImage} alt="profile-avatar" />
        <p>{userProfile.username}</p>
      </div>
      <div className="contacts">
        {contacts.map(
          (user, index) =>
            user.avatarImage && (
              <Contact
                key={index}
                user={user}
                index={index}
                selectContact={selectContact}
                handleSelected={handleSelected}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ContainerProfile;
