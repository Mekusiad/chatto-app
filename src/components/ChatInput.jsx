import { useState } from "react";
import { addTask } from "../utils/APIRoute.js";
import { socket } from "../utils/socket.js";

import { BiSend } from "react-icons/bi";
import axios from "axios";

import "../styles/ChatInput.css";

const ChatInput = ({
  userProfile = undefined,
  selectedChatUser = undefined,
  loadingMessage,
  setLoadingMessage,
  messages,
  setMessages,
}) => {
  const [currentTask, setCurrentTask] = useState("");
  const idFrom = userProfile._id;
  const idTo = selectedChatUser._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentTask) return;
    if (userProfile === undefined || selectedChatUser === undefined) return;

    const { data } = await axios.post(`${addTask}/${idFrom}`, {
      message: currentTask,
      from: idFrom,
      to: idTo,
      createdAt: new Date(),
    });

    const sendMessage = {
      fromSelf: true,
      message: { text: currentTask },
      from: idFrom,
      to: idTo,
      sender: idFrom,
      createdAt: new Date(),
    };
    socket.emit("send-message", sendMessage);

    const mgs = [...messages];
    mgs.push(sendMessage);
    setMessages(mgs);

    if (!data.status) {
      console.log("Failed to send a message: ", data.message);
    }

    if (data.status) {
      setCurrentTask("");
      setLoadingMessage(!loadingMessage);
    }
  };

  return (
    <form
      className="chat-input"
      action="POST"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="..."
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
      />
      <button>
        <BiSend />
      </button>
    </form>
  );
};

export default ChatInput;
