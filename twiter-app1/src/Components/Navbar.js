import "./Navbar.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import TweetsMainScreen from "./TweetsMainScreen";
import HomeCarosel from "./HomeCarosel";

const intialValues = {
  FirstName: "",
  LastName: "",
  Email: "",
  MobileNumber: "",
};

const Navbar = () => {
  const [name, setName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [userId, setUserId] = useState();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("");

  const logout = async () => {
    const baseUrl = "https://localhost:7284";
    await fetch(baseUrl + "/Logout", {
      credentials: "include",
      method: "POST",
      mode: "cors",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "access-control-allow-origin": "Content-Type, Authorization",
      },
    });

    setName("");
    setUserProfilePic("");
    setUserId("");
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    setUserMobileNumber("");
    //setUserData("");
  };

  let menu;

  if (name === "") {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <NavLink className="navbar-brand" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="navbar-brand" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <NavLink className="navbar-brand" to="/login" onClick={logout}>
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }

  useEffect(() => {
    (async () => {
      const baseUrl = "https://localhost:7284";
      const response = await fetch(baseUrl + "/GetUserBro", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        withCredentials: true,
      });

      const constant = await response.json();

      console.log("response is from get GetUserB is", constant);

      if (constant.UserName !== undefined) {
        console.log(constant);
        setName(constant.UserName);
        setUserProfilePic(constant.ProfileImageSrc);
        setUserId(constant.Id);
        setUserFirstName(constant.FirstName);
        setUserLastName(constant.LastName);
        setUserEmail(constant.Email);
        setUserMobileNumber(constant.MobileNumber);

        //setUserData(constant);
      }
    })();
  });

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-md navbar-dark  barStyle mb-4">
        <div className="container-fluid barStyle">
          <NavLink className="navbar-brand" to="/home">
            Home
          </NavLink>
          <div>{menu}</div>
        </div>
      </nav>

      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Home
              name={name}
              userProfilePic={userProfilePic}
              userId={userId}
              userFirstName={userFirstName}
              userLastName={userLastName}
              userEmail={userEmail}
              userMobileNumber={userMobileNumber}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              setName={setName}
              setUserProfilePic={setUserProfilePic}
              setUserId={setUserId}
              setUserFirstName={setUserFirstName}
              setUserLastName={setUserLastName}
              setUserEmail={setUserEmail}
              setUserMobileNumber={setUserMobileNumber}
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        {name !== "" ? (
          <Route
            exact
            path="/tweetsMainScreen"
            element={
              <TweetsMainScreen
                name={name}
                userProfilePic={userProfilePic}
                userId={userId}
                userFirstName={userFirstName}
                userLastName={userLastName}
                userEmail={userEmail}
                userMobileNumber={userMobileNumber}
              />
            }
          />
        ) : (
          <Route exact path="/tweetsMainScreen" element={<HomeCarosel />} />
        )}
        {/* <Route
          exact
          path="/tweetsMainScreen"
          element={
            <TweetsMainScreen
              name={name}
              userProfilePic={userProfilePic}
              userId={userId}
              userFirstName={userFirstName}
              userLastName={userLastName}
              userEmail={userEmail}
              userMobileNumber={userMobileNumber}
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
