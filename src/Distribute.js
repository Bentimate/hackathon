import React, { useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import "./Home.css";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { doc, addDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import db from "./firebaseconfig";
import storage from "./firebaseconfig.js";

Modal.setAppElement("#root");

const Distribute = () => {
  let subtitle;
  const [imgUrl, setImgUrl] = useState("");
  const [percent, setProgresspercent] = useState("");
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
    const file = e.target[0]?.files[0];
    console.log(file);

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
        });
      }
    );
  };

  return (
    <div className="main-wrapper" id="add-event-modal">
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
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Create Supper Event
          </h2>
          <p>
            <button onClick={closeModal}>quit</button>
          </p>
          <form>
            <p>
              {/* <label for="name">Name: </label> */}
              <input type="text" id="name" />
            </p>
            <p>
              {/* <label for="picture">Picture: </label> */}
              <input type="file" id="picture" onChange={handleChange} />
            </p>
            <p>
              {/* <label for="date">Name: </label> */}
              <input type="date" id="date" />
            </p>
            <p>
              <button
                onClick={(e) => {
                  const name = document.getElementById("name").value;
                  const picture = document.getElementById("picture").value;
                  const date = document.getElementById("date").value;

                  handleSubmit(e);
                  const dbRef = collection(db, "suppers");
                  const data = {
                    name: name,
                    image: picture,
                    date: date.toString(),
                    counter: 0,
                  };

                  addDoc(dbRef, data);
                }}
              >
                Create Event
              </button>
            </p>
          </form>
        </Modal>
        {/* </Link> */}
      </Paper>
      <Paper elevation={3} variant="outlined" square>
        <Link to="/admin">
          <Button variant="contained">View Orders</Button>
        </Link>
      </Paper>
    </div>
  );
};

export default Distribute;
