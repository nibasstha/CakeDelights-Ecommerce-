import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  //get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  //logout function
  const logout = () => {
    localStorage.clear();
  };

  //get cart value from reducer
  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <Link to={"/"} class="navbar-brand me-2">
            <h2 className="text-danger">
              CAKE-
              <span className="text-black">SHOP</span>
            </h2>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#"></a>
              </li>
            </ul>
            <Link to={"/cart"} className="m-4">
              <i className="fa fa-shopping-cart fa-lg"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                {cart.length}
              </span>
            </Link>

            <div class="d-flex align-items-center">
              {user ? (
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.fname}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {user.isAdmin ? (
                      <>
                        <li>
                          <Link to={"/admin-dashboard"} class="dropdown-item">
                            Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to={"/admin/orders"} class="dropdown-item">
                            My Orders
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to={"/Profile"} class="dropdown-item">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={"/order"} class="dropdown-item">
                            My Orders
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to={"/login"}
                        class="dropdown-item"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to={"/login"}>
                    <button type="button" class="btn btn-primary px-3 me-2">
                      Login
                    </button>
                  </Link>

                  <Link to={"/register"}>
                    <button type="button" class="btn btn-primary px-3 me-2">
                      Register
                    </button>
                  </Link>
                </>
              )}

              {/* <Link to={"/register"}>
                <button type="button" class="btn btn-primary px-3 me-2">
                  Register
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
