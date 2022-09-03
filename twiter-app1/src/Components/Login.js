import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";

const initialValues = {
  password: "",
  loginId: "",
};
const Login = (props) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [password, setPassword] = useState("");
  // const [loginId, setLoginId] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    console.log("we are in validation in  logining");

    if (!values.password) {
      errors.password = "Password is required !";
    }
    if (!values.loginId) {
      errors.loginId = "Login Id is required !";
    }

    return errors;
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const changeRememberMe = (e) => {
    if (rememberMe === true) {
      setRememberMe(false);
    } else {
      setRememberMe(true);
    }
  };

  const fetchDataLogin = async () => {
    const errors = {};
    const baseUrL = "https://localhost:7284";
    const response = await fetch(baseUrL + "/Login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "access-control-allow-origin": "Content-Type, Authorization",
      },
      body: JSON.stringify({
        loginId: formValues.loginId,
        password: formValues.password,
      }),
    });

    const content = response.json();
    if (response.status === 200) {
      setRedirect(true);
      props.setName(content);
      props.setUserProfilePic(content);
    } else {
      errors.password = "Invalid login attempt, Please check loginId/Password";
      setFormErrors(errors);
    }

    console.log("content is:", content);
  };

  const submit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));

    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("formErrors :", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchDataLogin();
      console.log("formValues:", formValues);
    }
  }, [formErrors]);

  if (redirect) {
    return <Navigate to="/TweetsMainScreen" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="loginId"
            value={formValues.loginId}
            name="loginId"
            onChange={handleChange}
            //required
          />
          <label htmlFor="floatingInput">Login Id</label>
          <p className="ErrorText">{formErrors.loginId}</p>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={formValues.password}
            name="password"
            onChange={handleChange}
            //required
          />
          <label htmlFor="floatingPassword">Password</label>
          <p className="ErrorText">{formErrors.password}</p>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" onChange={changeRememberMe} /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
