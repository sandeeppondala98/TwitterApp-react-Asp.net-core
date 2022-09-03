import React, { useEffect, useState } from "react";
import "./Replies.css";
import Reply from "./Reply";
import axios from "axios";
import FlipMove from "react-flip-move";
import { Button } from "@mui/material";

const Replies = (props) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    //refreshPostList();
    const baseUrl = "https://localhost:7284";
    axios
      .get(baseUrl + "/GetAllRepliesForTweet?", {
        params: {
          TweetId: props.parrentTweetId,
        },
      })
      .then((response) => setReplies(response.data))
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));

    console.log(replies);
    //setpostsSorted([...posts].reverse());
  }, []);

  return (
    <div className="replies">
      {replies.length === 0 ? (
        <h6 className="replytext1">No Replies for the tweet</h6>
      ) : (
        <h6 className="replytext1">Replies for above tweet</h6>
      )}

      <FlipMove>
        {replies.map((replies) => (
          <Reply
            key={replies.Id}
            Id={replies.Id}
            displayName={replies.UserName}
            username={replies.Email}
            text={replies.Message}
            verified={true}
            avatar={replies.ProfileImageSrc}
            subject={replies.TweetSubject}
            // below are for sending data to reply tweet

            loggedInUser={props.loggedInUser}
            loggedinUserProfilePic={props.userProfilePic}
          />
        ))}
      </FlipMove>

      <div className="titleCloseBtn">
        <button onClick={() => props.openReplyModal(false)}>Close</button>
      </div>

      {/* <Post
        displayName="Sonny Sangha"
        username="ssssangha"
        verified={true}
        text="YOO its working"
        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoCWk8yadZVvk-mePfTQFav7RKZePH7GySmQ&usqp=CAU"
        image="https://images.hindustantimes.com/img/2022/03/04/550x309/Virat_Anushka_1646394367547_1646394386420.jpg"
      /> */}
    </div>
  );
};

export default Replies;
