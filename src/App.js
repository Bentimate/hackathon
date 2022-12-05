import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Collect from "./Collect";
import Distribute from "./Distribute";
import Admin from "./Admin";
import Navigation from "./Navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="collect" element={<Collect />}></Route>
        <Route path="distribute" element={<Distribute />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
