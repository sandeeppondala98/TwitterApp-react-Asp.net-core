import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./ProfileDetails.css";
import axios from "axios";

const defaultImageSrc = "/img/DefaultProfilePic.png";

const initialFieldValues = {
  imageName: "defaltProfileImage",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const ProfileDetails = ({
  closeModal,
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  addOrEdit,
  recordForEdit,
  userFirstName,
  userLastName,
  userEmail,
  userMobileNumber,
}) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const baseUrl = "https://localhost:7284";

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // console.log("InProfileDetails:", loggedInUserProfilePic);
  // console.log("InProfileDetails:", userFirstName);
  // console.log("InProfileDetails:", userLastName);
  // console.log("InProfileDetails:", userEmail);
  // console.log("InProfileDetails:", userMobileNumber);
  return (
    <>
      <div>
        <div className="modalBackgroundProfileDetails">
          <div className="modalContainerProfileDetails">
            <div className="titleCloseBtn">
              <button onClick={() => closeModal(false)} type="submit">
                X
              </button>
            </div>
            {/* <div className="container text-center">
              {loggedInUserProfilePic !== "https://localhost:7284/Images/" ? (
                <img src={defaultImageSrc} className="ProfileImageCard" />
              ) : (
                <img
                  src={loggedInUserProfilePic}
                  className="ProfileImageCard"
                />
              )}
            </div> */}

            {/* =========================================================================================== */}

            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="my-5">
                    <h3>My Profile</h3>
                  </div>

                  <form class="file-upload">
                    <div class="row mb-5 gx-5">
                      <div class="col-xxl-8 mb-5 mb-xxl-0">
                        <div class="bg-secondary-soft px-4 py-5 rounded">
                          <div class="row g-3">
                            <h4 class="mb-4 mt-0">Personal Information</h4>
                            <div class="col-md-6">
                              <label class="form-label">First Name *</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                aria-label="First name"
                                value={userFirstName}
                              />
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">Last Name *</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                aria-label="Last name"
                                value={userLastName}
                              />
                            </div>

                            <div class="col-md-6">
                              <label class="form-label">Mobile number *</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                aria-label="Phone number"
                                value={"+91 " + userMobileNumber}
                              />
                            </div>
                            <div class="col-md-6">
                              <label for="inputEmail4" class="form-label">
                                Email *
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail4"
                                value={userEmail}
                              />
                            </div>
                            <div class="col-md-6">
                              <label class="form-label">UserName</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                aria-label="Phone number"
                                value={loggedInUserName}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*==========================================================================================*/}

                      <div className="col-xxl-4">
                        <div className="bg-secondary-soft px-4 py-5 rounded">
                          <div className="row g-3">
                            <div className="text-center">
                              <h4 className="mb-4 mt-0"> Profile Photo</h4>
                              <div className="square position-relative display-2 mb-3">
                                <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                              </div>

                              {loggedInUserProfilePic !==
                              baseUrl + "/Images/" ? (
                                <img
                                  src={loggedInUserProfilePic}
                                  className="ProfileImageCard"
                                />
                              ) : (
                                <img
                                  src={defaultImageSrc}
                                  className="ProfileImageCard"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*==========================================================================================*/}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/*==================================================================================================*/}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ProfileDetails;
