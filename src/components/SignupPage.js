import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NameContext from "../context/name"

function SignupPage() {
  const [showPassword, setshowPassword] = useState(false);
  let nav = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {state,updateName}=useContext(NameContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      //
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.Authorization);
        updateName(json.name.user.name);
        alert("Loggedin Successfully!!");
        nav("/");
      } else {
        alert("Login Failed!!");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const togglepassicon = () => {
    setshowPassword(!showPassword);
  };

  return (
    <div className="contain">
      <div className="login signup">
        <form onSubmit={handleSubmit} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Please Enter Your Email"
              aria-describedby="emailHelp"
            />
            <label htmlFor="exampleInputEmail1" className="my-3 form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Please Enter Your Email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "password" : "text"}
              className="form-control"
              onChange={onChange}
              value={credentials.password}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              minLength="5"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglepassicon}
              id="open"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p className="my-3">have an acc?</p>
        <Link to="/login">click here</Link>
      </div>
    </div>
  );
}

export default SignupPage;
