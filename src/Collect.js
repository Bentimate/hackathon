import "./Home.css";
import { collection, getDocs, setDoc, increment } from "firebase/firestore";
import { db } from "./firebaseconfig";
import FoodTile from "./FoodTile";
import React, { useState, useEffect } from "react";

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
  );
};

export default Collect;
