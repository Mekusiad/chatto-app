import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import NotFound from "./routes/NotFound";
import Register from "./routes/Register";
import Login from "./routes/Login";
import SetAvatar from "./routes/SetAvatar";
import Home from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
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
