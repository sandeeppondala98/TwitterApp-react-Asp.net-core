import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SearchUserModal.css";
import axios from "axios";

const defaultImageSrc = "/img/DefaultProfilePic.png";

const UpdatePassword = ({
  closeModal,
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  addOrEdit,
  //recordForEdit,
}) => {
  const initialValues = {
    password: "",
    confirmPassword: "",
    userId: logedInUserId,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const fetchDbUpdate = async (logedInUserId1, password, confirmPassword) => {
    console.log(
      "In fetch DB Update:",
      logedInUserId1,
      "In fetch DB Update: password :",
      password,
      "In fetch DB Update: Confirmpassword :",
      confirmPassword
    );
    const baseUrl = "https://localhost:7284";

    const response = await fetch(baseUrl + "/ResetPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: logedInUserId1,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      }),
    });

    console.log("Response is in updatePassword:", response);

    //setRedirect(true);

    closeModal(false);

    const content = response.json();

    console.log(content);
  };

  //   const fetchDbUpdate = async (logedInUserId, password, confirmPassword) => {
  //     const formData = new FormData();
  //     formData.append("userId", logedInUserId);
  //     formData.append("password", password);
  //     formData.append("confirmNewPassword", confirmPassword);

  //     console.log("loginID is :", logedInUserId);
  //     console.log("passowrd :", password);
  //     console.log(" is :", logedInUserId);

  //     axios
  //       .post("https://localhost:7284/ResetPassword", formData)
  //       .then((response) => setTweet(response.data));
  //   };

  const validate = (values) => {
    const errors = {};

    console.log("we are in validation");
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const regexContactNum = /^([+]\d{2})?\d{10}$/;
    const regexPassLower = /^(?=.*[a-z])/;
    const regexPassUpper = /^(?=.*[A-Z])/;
    const regexPassNumber = /^(?=.*[0-9])/;
    const regexPassSpecialChar = /^(?=.*[!@#$%^&*])/;

    if (!values.password) {
      errors.password = "Password is required !";
    } else if (!regexPassLower.test(values.password)) {
      errors.password =
        "Password must contain at least 1 lowercase alphabetical character !";
    } else if (!regexPassUpper.test(values.password)) {
      errors.password =
        "Password must contain at least 1 Uppercase alphabetical character !";
    } else if (!regexPassNumber.test(values.password)) {
      errors.password = "Password must contain at least 1 numeric character !";
    } else if (!regexPassSpecialChar.test(values.password)) {
      errors.password =
        "Password must contain at least one special character !";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required !";
    } else {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword =
          "Password and Confirm password are Mismatching !";
      }
    }

    return errors;
  };

  const handleChange = (e) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));

    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("formErrors :", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //   console.log("userID is:", formValues.userId);
      //   console.log("password is:", formValues.password);
      //   console.log("confirmPassword is:", formValues.confirmPassword);
      //fetchDataRegister();
      fetchDbUpdate(
        formValues.userId,
        formValues.password,
        formValues.confirmPassword
      );
      //console.log("formValues: in updatePass", loggedInUserName);
    }
  }, [formErrors]);

  return (
    <>
      <div className="modalBackgroundSearchUser">
        <div className="modalContainerSearchUser">
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
            <div>
              <main className="form-signin">
                <form onSubmit={submit}>
                  <h2 className="h3 mb-3 fw-normal registerHeader">
                    Update Password
                  </h2>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={formValues.password}
                      //required
                    />
                    <label htmlFor="floatingInput">Password</label>
                    <p className="ErrorText">{formErrors.password}</p>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={formValues.confirmPassword}
                      //required
                    />
                    <label htmlFor="floatingInput">Confirm Password</label>
                    <p className="ErrorText">{formErrors.confirmPassword}</p>
                  </div>

                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                  >
                    Update
                  </button>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
