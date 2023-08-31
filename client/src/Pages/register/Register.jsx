import React from "react";
import axios from "axios";
import { useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../apis/api";

const Register = () => {
  const navigate=useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2,setPass2] = useState("");

  // error state
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [pass2Error, setPass2Error] = useState("");

  const validate = () => {
    let isValid = true;

    if(fname === "") {
      setFnameError("Firstname is required");
      isValid = false;
    }

    if(lname === "") {
      setLnameError("Lastname is required");
      isValid = false;
    }

    if(email === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if(pass === "") {
      setPassError("Password is required");
      isValid = false;
    }

    if(pass2 === "") {
      setPass2Error("Confirm password is required");
      isValid = false;
    }

    if (pass !== pass2){
      setPass2Error("PAssword doesnt match");
      isValid = false;
    }

    return isValid;
  }

  const handleFname = (e) => {
    setFname(e.target.value);
  };
  const handleLname = (e) => {
    setLname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handlePass2 = (e) => {
    setPass2(e.target.value);
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname, email, pass, pass2);

    if(!validate()) {
      return;
    }

    try {
      registerApi({
        fname: fname,
        lname: lname,
        email: email,
        password: pass,
        password2: pass2
      })
        .then((res) => {
          toast.success("User registered successfully");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          toast.error("User registration failed");
        });
    } catch (error) {
      toast.error("Regisration failed");
    }

    //     try{
    //     axios.post("http://localhost:5000/api/user/register", {
    //       fname: fname,
    //       lname: lname,
    //       email: email,
    //       password: pass,
    //     }).then((res)=>{
    //       toast.success("User registration sucessfully");
    //     })

    //   .catch((err)=>{
    //     toast.error("User registrarion failed ");
    //   });
    // }
    //   catch(error){
    //     toast.error("Error in frontend");
    //   }
  };

  return (
    <div>
      <div className="container1">
        <form className="form">
          {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
          <div class="row mb-4">
            <div class="col">
              <div class="form-group">
                <input
                  onChange={handleFname}
                  type="text"
                  name="fname"
                  id="form3Example1"
                  class="form-control"
                  placeholder="First Name"
                />
                {
                  fnameError && <div className="text-danger">{fnameError}</div>
                }
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <input
                  onChange={handleLname}
                  type="text"
                  name="lname"
                  id="form3Example2"
                  class="form-control"
                  placeholder="Last Name"
                />
                {
                  lnameError && <div className="text-danger">{lnameError}</div>
                }
              </div>
            </div>
          </div>

          {/* <!-- Email input --> */}
          <div class="form-group mb-4">
            <input
              onChange={handleEmail}
              type="email"
              name="email"
              id="form3Example3"
              class="form-control"
              placeholder="Email Address"
            />
            {
              emailError && <div className="text-danger">{emailError}</div>
            }
          </div>

          {/* <!-- Password input --> */}
          <div class="form-group mb-4">
            <input
              onChange={handlePass}
              type="password"
              name="password"
              id="form3Example4"
              class="form-control"
              placeholder="Password"
            />
            {
              passError && <div className="text-danger">{passError}</div>
            }
          </div>

          <div class="form-group mb-4">
            <input
              onChange={handlePass2}
              type="password"
              name="password"
              id="form3Example4"
              class="form-control"
              placeholder="Confirm Password"
            />
            {
              pass2Error && <div className="text-danger">{pass2Error}</div>
            }
          </div>

          {/* <!-- Checkbox --> */}
          <div class="form-check d-flex justify-content-center mb-4">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example33"
            />
            <label class="form-check-label" for="form2Example33">
              Subscribe to our newsletter
            </label>
          </div>

          {/* <!-- Submit button --> */}

          <button
            type="submit"
            class="btn btn-primary btn-block mb-4"
            onClick={handleSubmit}
          >
             Register
          </button>

          {/* <!-- Register buttons --> */}
          <div class="text-center">
            <p>or sign up with:</p>
            <button type="button" class="btn btn-secondary btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-secondary btn-floating mx-1">
              <i class="fab fa-google"></i>
            </button>

            <button type="button" class="btn btn-secondary btn-floating mx-1">
              <i class="fab fa-twitter"></i>
            </button>

            <button type="button" class="btn btn-secondary btn-floating mx-1">
              <i class="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
