import React, { useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import "./Distribute.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { doc, addDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./firebaseconfig";
import positions from "@mui/system";
import { Paper, Toolbar, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

Modal.setAppElement("#root");

const Distribute = () => {
  let subtitle;
  const [imgUrl, setImgUrl] = useState(null);
  const [progress, setProgresspercent] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleChange(event) {
    setFile(event.target.value);
    console.log(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[1]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          const name = document.getElementById("name").value;

          const date = document.getElementById("date").value;
          const dbRef = collection(db, "suppers");
          const data = {
            name: name,
            image: downloadURL,
            date: date.toString(),
            counter: 0,
          };

          addDoc(dbRef, data);
        });
      }
    );
  };

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
    <div className="main-wrapper-two">
      <Paper elevation={3} variant="outlined" square>
        {/* <Link to="/create"> */}
        <Button variant="contained" onClick={openModal}>
          Add Supper Event
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div className="modal">
            <Paper elevation={24} variant="outlined" sx={{ width: 400, m: 4 }}>
              <div className="formStyle">
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <h1>Create Supper Event</h1>

                <form onSubmit={handleSubmit}>
                  <p>
                    <label for="name">Name: </label>
                    <input type="text" id="name" />
                  </p>
                  <p>
                    <label for="picture">Picture: </label>
                    <input type="file" id="picture" />
                  </p>

                  <p>
                    <input type="date" id="date" />
                  </p>
                  <p>
                    <Button type="submit" variant="contained">
                      Upload
                    </Button>
                    {/* {progress < 100 && (
                  <CircularProgress variant="determinate" value={progress} />
                )} */}
                  </p>
                  <Button
                    onClick={closeModal}
                    variant="outlined"
                    backgroundColor="red"
                  >
                    Quit without saving
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
        </Modal>
        {/* </Link> */}
      </Paper>
      <Paper elevation={3} variant="outlined" square>
        <Link to="/admin">
          <Button variant="contained">View Orders</Button>
        </Link>
      </Paper>
    </div>
    </div>
  );
};

export default Distribute;
