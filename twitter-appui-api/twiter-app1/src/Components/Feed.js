import React, { useEffect, useState } from "react";
import "./Feed.css";
import Tweetbox from "./Tweetbox";
import Post from "./Post";
import axios from "axios";
import FlipMove from "react-flip-move";

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [newpost, setNewPost] = useState(false);

  const onSaveTweetHandler = (postedTweet) => {
    if (newpost) setNewPost(false);
    else {
      setNewPost(true);
    }
  };

  //const r = posts.reverse();

  useEffect(() => {
    //refreshPostList();
    const baseUrL = "https://localhost:7284";
    axios
      .get(baseUrL + "/api/Tweets")
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));

    console.log(posts);
    //setpostsSorted([...posts].reverse());
  }, [newpost]);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <Tweetbox
        loggedInUser={props.loggedInUser}
        userProfilePic={props.userProfilePic}
        onSaveTweetData={onSaveTweetHandler}
      />
      {/* post */}

      {/* {console.log("sortedposts :", postsSorted)} */}
      <FlipMove>
        {posts
          .map((post) => (
            <Post
              key={post.Id}
              Id={post.Id}
              displayName={post.UserName}
              username={post.Email}
              text={post.Message}
              verified={true}
              avatar={post.ProfileImageSrc}
              subject={post.TweetSubject}
              // below are for sending data to reply tweet

              loggedInUser={props.loggedInUser}
              loggedinUserProfilePic={props.userProfilePic}
              loggedinUserId={props.userId}
            />
          ))
          .reverse()}
      </FlipMove>

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

export default Feed;
