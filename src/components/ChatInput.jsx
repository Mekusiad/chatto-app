import { useState } from "react";
import { addTask } from "../utils/APIRoute.js";

import { BiSend } from "react-icons/bi";
import axios from "axios";

import "../styles/ChatInput.css";

const ChatInput = ({
  userProfile = undefined,
  selectedChatUser = undefined,
  loadingMessage,
  setLoadingMessage,
}) => {
  const [currentTask, setCurrentTask] = useState(undefined);
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
    });

    if (!data.status) {
      console.log("Failed to send a message: ", data.message);
    }

    if (data.status) {
      setCurrentTask("");
      setLoadingMessage(!loadingMessage);
      console.log(loadingMessage);

      console.log(data.message);
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
