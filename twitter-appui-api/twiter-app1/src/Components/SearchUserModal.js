import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./SearchUserModal.css";
import axios from "axios";

const defaultImageSrc = "/img/DefaultProfilePic.png";

const initialFieldValues = {
  imageName: "defaltProfileImage",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const SearchUserModal = ({
  closeModal,
  loggedInUserName,
  loggedInUserProfilePic,
  logedInUserId,
  addOrEdit,
  //recordForEdit,
}) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [findUserName, setFindUserName] = useState();
  const baseUrl = "https://localhost:7284";

  const usersAPI = (url = baseUrl + "/GetAllUsers") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  useEffect(() => {
    refreshUserList();
  }, []);

  const OnSearchHandler = async (e) => {
    e.preventDefault();
    refreshUserList();
  };

  function refreshUserList() {
    const refresh = usersAPI()
      .fetchAll()
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => console.log(err));

    console.log("refresh", refresh);
    console.log("usersList", usersList);
  }

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const imageCard = (data) => (
    <div>
      {(data.UserName == findUserName || data.Email == findUserName) && (
        <div
          className="card"
          onClick={() => {
            showRecordDetails(data);
          }}
        >
          {data.ProfileImageSrc == baseUrl + "/Images/" &&
            (data.ProfileImageSrc = "/img/DefaultProfilePic.png")}
          <img
            src={data.ProfileImageSrc}
            className="card-img-top rounded-circle"
          />
          <div className="card-body">
            <h5>{data.UserName}</h5>
            <span>{data.Email}</span> <br />
            <button
              className="btn btn-light delete-button"
              //onClick={(e) => onDelete(e, parseInt(data.employeeID))}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
              <div className="tweetBox">
                <form>
                  <div className="tweetBox__input">
                    <input
                      className="userSearchBox"
                      placeholder="Enter UserName/Email address"
                      type="text"
                      value={findUserName}
                      onChange={(e) => setFindUserName(e.target.value)}
                    />
                  </div>

                  {/* <Button
                    type="submit"
                    className="tweetBox__tweetButton"
                    onClick={OnSearchHandler}
                  >
                    Search
                  </Button> */}
                </form>
              </div>
              <div className="usersList">
                {/* {usersList.map((user) => imageCard(user))} */}
                <table>
                  <tbody>
                    {console.log("users===", usersList)}
                    {[...Array(Math.ceil(usersList.length / 5))].map((e, i) => (
                      <tr key={i}>
                        <td>{imageCard(usersList[5 * i])}</td>
                        <td>
                          {usersList[5 * i + 1]
                            ? imageCard(usersList[5 * i + 1])
                            : null}
                        </td>
                        <td>
                          {usersList[5 * i + 2]
                            ? imageCard(usersList[5 * i + 2])
                            : null}
                        </td>
                        <td>
                          {usersList[5 * i + 3]
                            ? imageCard(usersList[5 * i + 3])
                            : null}
                        </td>
                        <td>
                          {usersList[5 * i + 4]
                            ? imageCard(usersList[5 * i + 4])
                            : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUserModal;
