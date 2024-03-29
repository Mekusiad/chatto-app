import ChatInput from "./ChatInput";
import ChatTask from "./ChatTask";

import "../styles/Chat.css";

import { useState } from "react";

const Chat = ({ userProfile, selectedChatUser }) => {
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  return (
    <div className="chat">
      <div className="chat-output">
        <div className="chat-output-profile">
          <img
            src={selectedChatUser.avatarImage}
            alt={`${selectedChatUser.username}`}
          />
          <p>{selectedChatUser.username}</p>
        </div>

        <ChatTask
          selectedChatUser={selectedChatUser}
          userProfile={userProfile}
          loadingMessage={loadingMessage}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
      <ChatInput
        selectedChatUser={selectedChatUser}
        userProfile={userProfile}
        loadingMessage={loadingMessage}
        setLoadingMessage={setLoadingMessage}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Chat;
<div></div>;
