import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
//import { ReactModal, Button } from "react-modal";
import "./ReplyTweetModal.css";
import axios from "axios";

const initialTweetValues = {
  message: "",
  username: "",
};
const ReplyTweetModal = ({
  closeModal,
  loggedinUserProfilePic,
  loggedInUser,
  parrentTweetId,
  parentTweetSubject,
}) => {
  const [message, setMessage] = useState("");
  const [pTweetId, setpTweetId] = useState(loggedInUser);
  const [username, setUsername] = useState(loggedInUser);
  const [tweet, setTweet] = useState(initialTweetValues);

  const replyTweet = async (e) => {
    e.preventDefault();
    setUsername(loggedInUser);
    setpTweetId(parrentTweetId);
    console.log("parentTweetI is", parrentTweetId);
    const formData = new FormData();
    formData.append("pTweetId", parrentTweetId);
    formData.append("message", message);
    formData.append("username", loggedInUser);

    console.log("fomsdata in reply tweet message:", message);
    console.log("username is :", loggedInUser);
    const baseUrl = "https://localhost:7284";
    axios
      .post(baseUrl + "/ReplyTweet", formData)
      .then((response) => setTweet(response.data));

    // const tweetData = {
    //   message: message,
    //   tweetSubject: tweetSubject,
    // };
    // props.onSaveTweetData(tweetData);

    setMessage("");
    closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        Reply to the tweet with Subject :{parrentTweetId}
        <h4>{parentTweetSubject}</h4>
        {/* <div className="tittle">
          <h1>Are you Sure you want to continue</h1>
        </div>
        <div className="body">
          <p>
            The next page is awesome. You should move forward, you will enjoy
            it.
          </p>
        </div> */}
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              <Avatar src={loggedinUserProfilePic} />
              <input
                className="tweetBox__imageInput"
                placeholder="whats happening ?"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* <input
          className="tweetBox__imageInput"
          placeholder="Optional : Enter image URL"
          type="text"
        /> */}

            <Button
              onClick={replyTweet}
              type="submit"
              className="tweetBox__tweetButton"
            >
              Reply
            </Button>
          </form>
        </div>
        {/* <div className="footer"></div> */}
      </div>
    </div>
  );
};

export default ReplyTweetModal;
