import React from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import { Paper, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import AppBar from "@mui/material/AppBar";
import { Image } from "@mui/icons-material";

const Home = () => {
  return (
    <div>
      <AppBar sx={{ bgcolor: "black" }}>
        <Toolbar>
          <div className="logo">
            <Box
              component="img"
              sx={{
                height: 30,
                width: 30,
                mr: 1,
              }}
              alt="The house from the offer."
              src="hamburger.png"
            />
            <p> Super Supper</p>
          </div>
        </Toolbar>
      </AppBar>

      <div className="main-wrapper">
        <Paper
          sx={{
            textAlign: "center",
            p: 2,
            width: "300px",
            height: "250px",
          }}
          elevation={3}
          variant="outlined"
          square
        >
          <Box
            component="img"
            sx={{
              height: 150,
              width: 150,
              mr: 1,
            }}
            alt="The house from the offer."
            src="reserve.png"
          />
          <p>Hungry?</p>
          <Link to="/collect">
            <Button variant="contained">Chope Supper</Button>
          </Link>
        </Paper>
        <Paper
          sx={{ textAlign: "center", p: 2, width: "300px", height: "250px" }}
          elevation={3}
          variant="outlined"
          square
        >
          <Box
            component="img"
            sx={{
              height: 150,
              width: 150,
              mr: 1,
            }}
            alt="The house from the offer."
            src="cooking.png"
          />
          <p>In charge of giving out supper?</p>
          <Link to="/distribute">
            <Button variant="contained">Distribute Supper</Button>
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
