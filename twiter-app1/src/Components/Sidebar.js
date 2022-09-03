import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SidebarOptions from "./SidebarOptions";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import UpdateIcon from "@mui/icons-material/Update";

const Sidebar = ({
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  userFirstName,
  userLastName,
  userEmail,
  userMobileNumber,
}) => {
  console.log("in Sidebar", loggedInUserName);
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      {/* Twitter icon */}
      <SidebarOptions active OptionIcon={<HomeIcon />} text="Home" />
      <SidebarOptions OptionIcon={<SearchIcon />} text="Search" />

      <SidebarOptions
        OptionIcon={<ListAltIcon />}
        text="Users"
        loggedInUserName={loggedInUserName}
        loggedInUserProfilePic={loggedInUserProfilePic}
        logedInUserId={logedInUserId}
      />
      <SidebarOptions
        OptionIcon={<InsertPhotoIcon />}
        text="DisplayPicture"
        loggedInUserName={loggedInUserName}
        loggedInUserProfilePic={loggedInUserProfilePic}
        logedInUserId={logedInUserId}
      />

      <SidebarOptions
        OptionIcon={<PermIdentityIcon />}
        text="Profile"
        loggedInUserName={loggedInUserName}
        loggedInUserProfilePic={loggedInUserProfilePic}
        logedInUserId={logedInUserId}
        userFirstName={userFirstName}
        userLastName={userLastName}
        userEmail={userEmail}
        userMobileNumber={userMobileNumber}
      />

      <SidebarOptions
        OptionIcon={<UpdateIcon />}
        text="Update Password"
        loggedInUserName={loggedInUserName}
        logedInUserId={logedInUserId}
      />
      {/* <SidebarOptions
        OptionIcon={<MailOutlineOutlinedIcon />}
        text="Messages"
      />
      <SidebarOptions OptionIcon={<BookmarkBorderIcon />} text="Bookmarks" />

      <SidebarOptions OptionIcon={<MoreHorizIcon />} text="More" /> */}

      {/* SidebarOption */}
      {/* SidebarOption */}
      {/* SidebarOption */}
      {/* SidebarOption */}
      {/* SidebarOption */}
      {/* SidebarOption */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      {/* Button -> Tweet */}
    </div>
  );
};

export default Sidebar;
