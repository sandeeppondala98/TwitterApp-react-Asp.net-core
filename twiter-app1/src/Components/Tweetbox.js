import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const initialTweetValues = {
  message: "",
  tweetSubject: "",
  username: "",
};

const Tweetbox = (props) => {
  const [message, setMessage] = useState("");
  const [tweetSubject, setTweetSubject] = useState("");
  const [username, setUsername] = useState(props.loggedInUser);
  const [tweet, setTweet] = useState(initialTweetValues);
  const baseUrl = "https://localhost:7284";

  // const response = await fetch("https://localhost:7284/api/Tweets", {
  //   method: "POST",
  //   mode: "cors",
  //   credentials: "include",
  //   withCredentials: true,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-type": "application/json",
  //     "access-control-allow-origin": "Content-Type, Authorization",
  //   },
  //   body: JSON.stringify({
  //     message,
  //     tweetSubject,
  //   }),
  // });

  // const content = response.json();

  // console.log("content is:", content);

  // if (response.status === 200) {
  //   setMessage("");
  //   setTweetSubject("");
  // }
  const sendTweet = async (e) => {
    e.preventDefault();
    setUsername(props.loggedInUser);
    //console.log(props.loggedInUser);
    const formData = new FormData();
    formData.append("tweetSubject", tweetSubject);
    formData.append("message", message);
    formData.append("username", props.loggedInUser);

    console.log("fomsdata is :", tweetSubject);
    console.log("message :", message);
    console.log("username is :", props.loggedInUser);

    axios
      .post(baseUrl + "/api/Tweets", formData)
      .then((response) => setTweet(response.data));

    const tweetData = {
      message: message,
      tweetSubject: tweetSubject,
    };
    props.onSaveTweetData(tweetData);

    setMessage("");
    setTweetSubject("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={props.userProfilePic} />
          <input
            placeholder="Add Subject Here ..."
            type="text"
            value={tweetSubject}
            onChange={(e) => setTweetSubject(e.target.value)}
          />
        </div>
        <input
          className="tweetBox__imageInput"
          placeholder="whats happening ?"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <input
          className="tweetBox__imageInput"
          placeholder="Optional : Enter image URL"
          type="text"
        /> */}
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default Tweetbox;
