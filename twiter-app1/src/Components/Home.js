//import { render } from "@testing-library/react";
import React from "react";
import TweetsMainScreen from "./TweetsMainScreen";
//import { Navigate } from "react-router-dom";
const Home = (props) => {
  //let homeScreen;
  console.log("InHome component", props.userProfilePic);
  console.log("InHome component", props.userDetails);

  if (props.name === "") {
    return (
      <div>
        <h1>Please Login or register</h1>
      </div>
    );
  } else {
    return (
      <div>
        <TweetsMainScreen
          name={props.name}
          userProfilePic={props.userProfilePic}
          userId={props.userId}
        />
      </div>
    );
  }

  //return <div>{homeScreen}</div>;

  //return <div>{props.name ? +props.name : "you are not logged in"}</div>;
};

export default Home;
