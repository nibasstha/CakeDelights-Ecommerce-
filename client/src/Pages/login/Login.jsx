import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../../apis/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const validate = () => {
    let isValid = true;

    if (email === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if (password === "") {
      setPassError("Password is required");
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      loginApi({
        email: email,
        password: password,
      })
        .then((res) => {
          console.log(res.data);

          //setting token and user in local storage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/");

          toast.success("Login Success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Login Failed");
        });
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   try {
  //     loginApi({
  //       email: email,
  //       password: password,
  //     })
  //       .then((res) => {
  //         console.log(res.data);

  //         //dispatch to store
  //         dispatch(addUser(res.data.user));

  //         navigate("/");

  //         toast.success("Login Success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Login Failed");
  //       });
  //   } catch (error) {
  //     toast.error("Login Failed");
  //   }
  // };

  return (
    <div>
      <div className="container1">
        <form className="form">
          {/* <!-- Email input --> */}
          <div class="form-group mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              htmlFor="text"
              id="name"
              name="name"
              type="email"
              className="form-control"
              placeholder="Enter a valid email address"
            />
            {
              emailError && <div className="text-danger">{emailError}</div>
            }
          </div>

          {/* <!-- Password input --> */}
          <div class="form-group mb-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              htmlFor="text"
              id="name"
              name="name"
              type="password"
              className="form-control"
              placeholder="Password"
            />
            {
              passError && <div className="text-danger">{passError}</div>
            }
          </div>

          {/* <!-- 2 column grid layout for inline styling --> */}
          <div class="row mb-4">
            <div class="col d-flex justify-content-center">
              {/* <!-- Checkbox --> */}
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example34"
                  checked
                />
                <label class="form-check-label" for="form2Example34">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div class="col">
              {/* <!-- Simple link --> */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button
            onClick={handleSubmit}
            type="submit"
            class="btn btn-primary btn-block mb-4"
          >
            Log in
          </button>

          {/* <!-- Register buttons --> */}
          <div class="text-center">
            <p>
              Not a member? <Link to={"/register"}>Register</Link>
            </p>
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

export default Login;
