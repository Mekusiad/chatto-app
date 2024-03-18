import axios from "axios";

import { getAllMessages } from "../utils/APIRoute";

import "../styles/ChatTask.css";
import { useEffect, useState } from "react";

const ChatTask = ({ selectedChatUser, userProfile, loadingMessage }) => {
  const [messages, setMessages] = useState([]);

  const getChatMessages = async () => {
    const idFrom = userProfile._id;
    const idTo = selectedChatUser._id;

    const { data } = await axios.get(`${getAllMessages}/${idFrom}/${idTo}`);

    if (!data.status) console.log(data.message);

    // console.log(data.chat[0].createdAt);
    // const today = new Date(data.chat[0].createdAt);
    // console.log(today.toLocaleTimeString());
    setMessages(data.chat);
  };

  useEffect(() => {
    const getMessages = () => {
      getChatMessages();
    };
    getMessages();
  }, []);

  // useEffect(() => {
  //   const getMessages = () => {
  //     getChatMessages();
  //   };
  //   getMessages();
  // }, [selectedChatUser._id]);

  useEffect(() => {
    const getMessages = () => {
      getChatMessages();
    };
    getMessages();
  }, [loadingMessage]);

  useEffect(() => {
    const getMessages = () => {
      getChatMessages();
    };
    getMessages();
  }, [messages]);

  return (
    <div className="chat-output-tasks">
      {messages.map((box, index) => (
        <div
          key={index}
          className={`chat-task ${box.sender === userProfile._id ? "" : "to"}`}
        >
          <img
            src={
              box.sender === userProfile._id
                ? userProfile.avatarImage
                : selectedChatUser.avatarImage
            }
            alt={
              box.sender === userProfile._id
                ? userProfile.username
                : selectedChatUser.username
            }
          />
          <div className="task-container">
            <div className="task">{box.message.text}</div>
            <p className="task-time">
              {new Date(box.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      {/* Aqui começa a */}
      {/* <div className="chat-task main">
        <img src={userTaskChat.avatarImage} alt={`${userTaskChat.username}`} />
        <p></p>
      </div>
      <div className="chat-task receive">
        <img src={userTaskChat.avatarImage} alt={`${userTaskChat.username}`} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tempora
          mollitia exercitationem similique dicta, fugiat molestias nostrum
          voluptatem blanditiis! Dolor!
        </p>
      </div> */}
      {/* Aqui termina*/}
    </div>
  );
};

export default ChatTask;
