import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { forwardRef, useState, useEffect } from "react";
import "./Post.css";
import { Button } from "@mui/material";
import ReplyTweetModal from "./ReplyTweetModal";
import Replies from "./Replies";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Tooltip } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

const Post = forwardRef(
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
      loggedinUserId,
    },
    ref
  ) => {
    const [openModal, setOpenModal] = useState(false);
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const [likeStatus, setLikeStatus] = useState([]);
    const baseUrl = "https://localhost:7284";
    //const [likeUpdate, setLikeUpdate] = useState(false);
    //const [likesCount, setLikesCount] = useState(0);
    //const [userTweetLikeStatus, setUserTweetLikeStatus] = useState(false);
    //console.log("The logged in UserId", loggedInUser);
    //console.log("log Status", likeStatus);

    // useEffect(() => {
    //   if (loggedInUser != null) {
    //     axios
    //       .get("https://localhost:7284/CheckUserLikedTweeetOrNot", {
    //         params: {
    //           TweetId: Id,
    //           UserId: loggedInUser,
    //         },
    //       })
    //       .then((response) => setLikeStatus(response.data))
    //       .catch((err) => console.log(err));
    //   }
    // }, []);

    useEffect(() => {
      axios
        .get(baseUrl + "/CheckUserLikedTweeetOrNot", {
          params: {
            TweetId: Id,
            UserId: loggedinUserId,
          },
        })
        .then((response) => setLikeStatus(response.data))
        .catch((err) => console.log(err));
    }, [loggedInUser]);

    const replyToTweet = (tweetId) => {
      console.log("replytoTweet is clicked ", tweetId);
    };

    //console.log("like count", likeStatus.LikesCount);
    //console.log("like status :", userTweetLikeStatus);

    const AddOrRemoveLike = (Id, loggedinUserId) => {
      axios
        .get(baseUrl + "/AddLike", {
          params: {
            TweetId: Id,
            UserId: loggedinUserId,
          },
        })
        .then((response) => setLikeStatus(response.data))
        .catch((err) => console.log(err));

      // if (likeUpdate) {
      //   setLikeUpdate(false);
      // } else {
      //   setLikeUpdate(true);
      // }
      // if (likeStatus.UserlikedStatus) {
      //   setLikeStatus(likeStatus.LikesCount, false);
      // } else {
      //   setLikeStatus(likeStatus.LikesCount, true);
      // }

      console.log("tweet liked effect", Id, likeStatus);
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
              <div className="post__footer">
                {likeStatus.UserlikedStatus ? (
                  <div>
                    <Tooltip title="DisLike">
                      <Button
                        onClick={() => {
                          AddOrRemoveLike(
                            Id,
                            loggedinUserId
                            //likeStatus.LikesCount - 1,
                            //false
                          );
                        }}
                      >
                        <FavoriteIcon className="likeStyle" fontSize="small" />
                        {" " + likeStatus.LikesCount + " Likes"}
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <Tooltip title="Like">
                    <Button
                      onClick={() => {
                        AddOrRemoveLike(
                          Id,
                          loggedinUserId
                          //likeStatus.LikesCount + 1,
                          //true
                        );
                      }}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                      {" " + likeStatus.LikesCount + " Likes"}
                    </Button>
                  </Tooltip>
                )}

                {/* <RepeatIcon fontSize="small" onClick={replyToTweet} /> */}

                <Tooltip title="Reply">
                  <Button>
                    <ReplyIcon
                      fontSize="small"
                      onClick={() => {
                        setOpenModal(true);
                        replyToTweet(Id);
                      }}
                    />
                  </Button>
                </Tooltip>
                {/* <Tooltip title="Chat">
                  <Button>
                    <ChatBubbleOutlinedIcon fontSize="small" />
                  </Button>
                </Tooltip> */}

                <Tooltip title="Show All Replies">
                  <Button>
                    <CommentIcon
                      fontSize="small"
                      onClick={() => {
                        setOpenReplyModal(true);
                        replyToTweet(Id);
                      }}
                    />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        {openModal && (
          <ReplyTweetModal
            closeModal={setOpenModal}
            loggedinUserProfilePic={loggedinUserProfilePic}
            loggedInUser={loggedInUser}
            parrentTweetId={Id}
            parentTweetSubject={subject}
          />
        )}

        {openReplyModal && (
          <Replies
            openReplyModal={setOpenReplyModal}
            parrentTweetId={Id}
            loggedinUserProfilePic={loggedinUserProfilePic}
            loggedInUser={loggedInUser}
            parentTweetSubject={subject}
          />
        )}
      </div>
    );
  }
);

export default Post;
