import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import React, { forwardRef, useState } from "react";
import "./Post.css";
import { Button } from "@mui/material";
import ReplyTweetModal from "./ReplyTweetModal";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const Reply = forwardRef(
  (
    {
      displayName,
      text,
      avatar,
      username,
      verified,
      image,
      subject,
      Id,
      loggedinUserProfilePic,
      loggedInUser,
    },
    ref
  ) => {
    const [openModal, setOpenModal] = useState(false);
    const [openReplyModal, setOpenReplyModal] = useState(false);

    const replyToTweet = (tweetId) => {
      console.log("replytoTweet is clicked ", tweetId);
    };

    return (
      <div className="postreplycontainer">
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src={avatar}></Avatar>
          </div>
          <div>
            <div className="post__body">
              <div className="post__header">
                <div className="post__headerText">
                  <h3>
                    {displayName}{" "}
                    <span>
                      {verified && <VerifiedIcon className="post__badge" />} @
                      {username}
                    </span>
                  </h3>
                </div>
                <div className="post__headerDescription">
                  <h6>subject : {subject}</h6>
                  <p>{text}</p>
                </div>
              </div>
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Reply;
