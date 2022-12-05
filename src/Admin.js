import "./Home.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";
import FoodTile from "./FoodTile";
import React, { useState, useEffect } from "react";
import ReserveTile from "./ReserveTile";
import "./admin.css";
import { AppBar, Toolbar, Box } from "@mui/material";

const Admin = () => {
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
      <h1 id="title">Orders</h1>
      <div className="tileWrapper">
        {suppers.map((supper) => {
          return (
            <div>
              <ReserveTile
                name={supper.name}
                date={supper.date}
                image={supper.image}
                orders={supper.counter}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
