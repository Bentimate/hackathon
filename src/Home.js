import React from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="main-wrapper">
      <Paper elevation={3} variant="outlined" square>
        <p>I am collecting supper</p>
        <Link to="/collect">
          <Button variant="contained">Collect Supper</Button>
        </Link>
      </Paper>
      <Paper elevation={3} variant="outlined" square>
        <p>I am giving out supper</p>
        <Link to="/distribute">
          <Button variant="contained">Distribute Supper</Button>
        </Link>
      </Paper>
    </div>
  );
};

export default Home;
