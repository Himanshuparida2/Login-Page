import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import NameContext from "../context/name"

export default function LoginPage() {
  const [showPassword, setshowPassword] = useState("false");
  let nav=useNavigate();
  // eslint-disable-next-line
  const { state, updateName } = useContext(NameContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =
        await fetch("http://localhost:8080/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZDliODU5ZDhkYWE2ZWY3NzhhZjlhIn0sImlhdCI6MTcyMTA5NzAxMX0.qLd3Tu43oZR0PQT4lusgsPGqcIYzU7zlByYnlpkwNhY",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        //
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token',json.token)
        updateName(json.name.user.name);
        alert('Loggedin Successfully!!');
        nav("/");
      }
      else{
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
    <div>
      <div className="contain">
        <div className="login">
          <form onSubmit={handleSubmit} className='my-3'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
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
          <p className="my-3">don't have an acc?</p>
          <Link to="/signup">click here</Link>
        </div>
      </div>
    </div>
  );
}