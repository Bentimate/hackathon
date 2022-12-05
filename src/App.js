import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Collect from "./Collect";
import Distribute from "./Distribute";
import Thanks from "./Thanks";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="collect" element={<Collect />}></Route>
        <Route path="distribute" element={<Distribute />}></Route>
        <Route path="thanks" element={<Thanks />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
