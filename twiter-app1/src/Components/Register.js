import React, { useEffect, useState } from "react";
import "./Register.css";
import { Navigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  loginId: "",
  confirmPassword: "",
  contactNumber: "",
};
const Register = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setlastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loginId, setLoginId] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

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
    if (!values.loginId) {
      errors.loginId = "LoginId is required !";
    }
    if (!values.firstName) {
      errors.firstName = "First Name is required !";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required !";
    }
    if (!values.email) {
      errors.email = "Email is required !";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required !";
    } else {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword =
          "Password and Confirm password are Mismatching !";
      }
    }
    if (!values.contactNumber) {
      errors.contactNumber = "Contact Number is required !";
    } else if (!regexContactNum.test(values.contactNumber)) {
      errors.contactNumber = "This is not a valid Contact Number Format";
    }

    return errors;
  };

  const handleChange = (e) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fetchDataRegister = async () => {
    const baseUrl = "https://localhost:7284";
    const response = await fetch(baseUrl + "/Register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        loginId: formValues.loginId,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        contactNumber: formValues.contactNumber,
      }),
    });

    console.log("Response is:", response);

    setRedirect(true);

    const content = response.json();

    console.log(content);
  };

  const submit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));

    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("formErrors :", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetchDataRegister();
      console.log("formValues:", formValues);
    }
  }, [formErrors]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h2 className="h3 mb-3 fw-normal registerHeader">Please Register</h2>
        <div className="form-floating">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Type your Name ..!"
            value={formValues.firstName}
            onChange={handleChange}
            //required
          />
          <label htmlFor="floatingInput">First Name</label>
          <p className="ErrorText">{formErrors.firstName}</p>
        </div>

        <div className="form-floating">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Type your Name ..!"
            onChange={handleChange}
            value={formValues.lastName}
            //required
          />
          <label htmlFor="floatingInput">Last Name</label>
          <p className="ErrorText">{formErrors.lastName}</p>
        </div>

        <div className="form-floating">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            value={formValues.email}
            onChange={handleChange}
            //required
          />
          <label htmlFor="floatingInput">Email </label>
          <p className="ErrorText">{formErrors.email}</p>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="loginId"
            name="loginId"
            onChange={handleChange}
            value={formValues.loginId}
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

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Contactnumber"
            title="Please enter valid Phone number"
            //pattern="[1-9]{1}[0-9]{9}"
            maxLength="10"
            name="contactNumber"
            onChange={handleChange}
            value={formValues.contactNumber}
            //required
          />
          <label htmlFor="floatingInput">ContactNumber</label>
          <p className="ErrorText">{formErrors.contactNumber}</p>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
