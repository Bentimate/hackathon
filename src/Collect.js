import "./Home.css";
import { collection, getDocs, setDoc, increment } from "firebase/firestore";
import { db } from "./firebaseconfig";
import FoodTile from "./FoodTile";
import "./Collect.css";
import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Collect = () => {
  const [suppers, setSuppers] = useState([]);

  useEffect(() => {
    // collection ref
    const colRef = collection(db, "suppers");

    // get collection data
    getDocs(colRef)
      .then((snapshot) => {
        // console.log(snapshot.docs)
        let suppers = [];
        snapshot.docs.forEach((doc) => {
          suppers.push({ ...doc.data(), id: doc.id });
        });
        console.log(suppers);
        setSuppers(suppers);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
      <Typography gutterBottom variant="h4x" component="div">
        Here are some upcoming suppers
      </Typography>

      <div className="tileWrappertwo">
        {suppers.map((supper) => {
          return (
            <div>
              <FoodTile
                name={supper.name}
                date={supper.date}
                image={supper.image}
                id={supper.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collect;
