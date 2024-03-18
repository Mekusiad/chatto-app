import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from "./routes/Home";

import "./App.css";
import SetAvatar from "./routes/SetAvatar";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
