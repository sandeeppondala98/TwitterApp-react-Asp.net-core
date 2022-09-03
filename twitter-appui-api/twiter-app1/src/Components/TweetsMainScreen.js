import React from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import "./TweetsMainScreen.css";

const TweetsMainScreen = (props) => {
  //const [name, setName] = useState("");
  //setName(props.name);

  //   return (
  //     <div>
  //       <li>Yes this is {props.name}</li>
  //     </div>
  //   );
  return (
    <div>
      <h6 className="LoggedInUserDisplayText">
        {props.name
          ? "Logged in as " + props.name + ","
          : "you are not logged in"}
      </h6>
      <div className="tweetsMainScreen">
        {/* Sidebar */}
        <Sidebar
          loggedInUserName={props.name}
          loggedInUserProfilePic={props.userProfilePic}
          logedInUserId={props.userId}
          userFirstName={props.userFirstName}
          userLastName={props.userLastName}
          userEmail={props.userEmail}
          userMobileNumber={props.userMobileNumber}
        />
        {/* Feed */}
        <Feed
          loggedInUser={props.name}
          userProfilePic={props.userProfilePic}
          userId={props.userId}
        />
        {/* Sidebar */}
        <Widgets />
      </div>
    </div>
  );
};

export default TweetsMainScreen;
