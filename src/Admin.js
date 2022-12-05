import "./Home.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";
import FoodTile from "./FoodTile";
import React, { useState, useEffect } from "react";
import ReserveTile from "./ReserveTile";
import "./admin.css";

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
      <h1 id="title">Orders</h1>
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
  );
};

export default Admin;
