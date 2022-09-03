import React, { useState } from "react";
import "./SidebarOptions.css";
import { Button } from "@mui/material";
//import Icon from "@mui/material";
import Profile from "./Profile";
import ListsOfUsers from "./ListOfUsers";
import axios from "axios";
import SearchUserModal from "./SearchUserModal";
import ProfileDetails from "./ProfileDetails";
import UpdatePassword from "./UpdatePassword";

const SidebarOptions = ({
  active,
  text,
  OptionIcon,
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  userFirstName,
  userLastName,
  userEmail,
  userMobileNumber,
}) => {
  const [openProfilePicModal, setOpenProfilePicModal] = useState(false);
  const [openProfileDetailsModal, setOpenProfileDetailsModal] = useState(false);
  const [openGetAllUsersModal, setOpenGetAllUsersModal] = useState(false);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);

  const baseUrl = "https://localhost:7284";
  const profileAPI = (url = baseUrl + "/api/Account") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  // function refreshEmployeeList() {
  //   profileAPI()
  //     .fetchAll()
  //     .then((res) => {
  //       setEmployeeList(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  const addOrEdit = (formData, onSuccess) => {
    profileAPI()
      .create(formData)
      .then((res) => {
        onSuccess();

        //refreshEmployeeList();
      })
      .catch((err) => console.log(err));
    setOpenProfilePicModal(false);
    //window.location.reload();
  };

  return (
    <div className={`sidebarOptions ${active && "sidebarOption--active"}`}>
      <h5>{OptionIcon}</h5>
      <h2>
        {/* {text} */}
        <Button
          className="sidebarOptionsBtn"
          onClick={() => {
            if (text == "DisplayPicture") setOpenProfilePicModal(true);
            if (text == "Users") setOpenGetAllUsersModal(true);
            if (text == "Search") setOpenSearchUserModal(true);
            if (text == "Profile") setOpenProfileDetailsModal(true);
            if (text == "Update Password") setOpenUpdatePasswordModal(true);
          }}
        >
          {text}
        </Button>
      </h2>
      {openProfilePicModal && (
        <Profile
          closeModal={setOpenProfilePicModal}
          loggedInUserName={loggedInUserName}
          loggedInUserProfilePic={loggedInUserProfilePic}
          logedInUserId={logedInUserId}
          addOrEdit={addOrEdit}
        />
      )}
      {openProfileDetailsModal && (
        <ProfileDetails
          closeModal={setOpenProfileDetailsModal}
          loggedInUserName={loggedInUserName}
          loggedInUserProfilePic={loggedInUserProfilePic}
          logedInUserId={logedInUserId}
          userFirstName={userFirstName}
          userLastName={userLastName}
          userEmail={userEmail}
          userMobileNumber={userMobileNumber}
          addOrEdit={addOrEdit}
        />
      )}
      {openSearchUserModal && (
        <SearchUserModal
          closeModal={setOpenSearchUserModal}
          // loggedInUserName={loggedInUserName}
          // loggedInUserProfilePic={loggedInUserProfilePic}
          // logedInUserId={logedInUserId}
          // addOrEdit={addOrEdit}
        />
      )}
      {openGetAllUsersModal && (
        <ListsOfUsers
          closeModal={setOpenGetAllUsersModal}
          loggedInUserName={loggedInUserName}
          loggedInUserProfilePic={loggedInUserProfilePic}
          logedInUserId={logedInUserId}
          addOrEdit={addOrEdit}
        />
      )}
      {openUpdatePasswordModal && (
        <UpdatePassword
          closeModal={setOpenUpdatePasswordModal}
          loggedInUserName={loggedInUserName}
          loggedInUserProfilePic={loggedInUserProfilePic}
          logedInUserId={logedInUserId}
          addOrEdit={addOrEdit}
        />
      )}
    </div>
  );
};

export default SidebarOptions;
