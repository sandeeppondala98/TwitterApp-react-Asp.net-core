import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";

const defaultImageSrc = "/img/DefaultProfilePic.png";

const initialFieldValues = {
  imageName: "defaltProfileImage",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const Profile = ({
  closeModal,
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  addOrEdit,
  recordForEdit,
}) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

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

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    //temp.employeeName = values.employeeName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(values);
      const formData = new FormData();
      //formData.append("employeeID", values.employeeID);
      //formData.append("employeeName", values.employeeName);
      formData.append("username", loggedInUserName);
      formData.append("profileImageName", values.imageName);
      formData.append("profileImageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };
  const baseUrl = "https://localhost:7284";
  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " invalid-field" : "";

  console.log(loggedInUserProfilePic);
  return (
    <>
      {loggedInUserProfilePic !== baseUrl + "/Images/" ? (
        <div className="modalBackground">
          <div className="modalContainer1">
            <div>
              <div className="titleCloseBtn">
                <button
                  onClick={() => closeModal(false)}
                  type="submit"
                  //className="tweetBox__tweetButton"
                >
                  X
                </button>
              </div>
              <h2>
                <span className="UsernameStyle">
                  Profile pic already added to the user "
                </span>
                {loggedInUserName}

                <span className="UsernameStyle">"</span>
              </h2>
              <div className="card1">
                <img
                  src={loggedInUserProfilePic}
                  alt=""
                  className="card-img-top rounded-circle"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                  <div className="card-body"></div>
                </div>
              </form> */}
          {/*=======================================================================*/}

          <div className="modalBackgroundProfilePicture2">
            <div className="modalContainerProfilePicture2">
              <div className="titleCloseBtn">
                {/* <Button
                  onClick={() => closeModal(false)}
                  type="submit"
                  className="tweetBox__tweetButton"
                >
                  Close
                </Button> */}
                <button
                  onClick={() => closeModal(false)}
                  type="submit"
                  //className="tweetBox__tweetButton"
                >
                  X
                </button>
              </div>
              <div className="container text-center">
                <h2>Add Profile Picture</h2>
              </div>
              <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                  <img src={values.imageSrc} className="card-img-top" />
                  <div className="card-body">
                    <div className="form-group">
                      <input
                        type="file"
                        accept="image/*"
                        className={
                          "form-control-file" + applyErrorClass("imageSrc")
                        }
                        onChange={showPreview}
                        id="image-uploader"
                      />
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn btn-primary submitModelbutton"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/*=======================================================================*/}
        </div>
      )}
    </>
  );
};

export default Profile;
