import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ReserveTile.css";

export default function ReserveTile(props) {
  const [orders, setOrders] = useState(0);
  return (
    <Card sx={{ maxWidth: 200, m: 4 }}>
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
          <div className="orders">Orders: {props.orders}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
