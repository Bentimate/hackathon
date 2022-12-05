import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  collection,
  getDoc,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebaseconfig";

export default function FoodTile(props) {
  const [isDisabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("Reserve");
  const updateDatabase = () => {
    const targetRef = doc(db, "suppers", props.id);

    updateDoc(targetRef, {
      counter: increment(1),
    });
  };
  return (
    <Card sx={{ width: 200, m: 4 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.date}
          </Typography>
        </CardContent>

        <Button
          fullWidth
          variant="contained"
          disabled={isDisabled}
          onClick={() => {
            setDisabled(true);
            setMessage("Your supper has been reserved");
            updateDatabase();
          }}
        >
          {message}
        </Button>
      </CardActionArea>
    </Card>
  );
}
