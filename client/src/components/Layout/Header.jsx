import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useAuth } from "../context/Auth.jsx";
import main_logo from "../../assets/main_logo.png";
import "../../assets/Custom.css";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // login
  // form function
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div>
        <div>
          <nav
            className="navbar navbar-expand-lg "
            style={{ backgroundColor: "#fff" }}
          >
            <div className="container wrapper">
              <a className="navbar-brand" href="/">
                <img
                  src={main_logo}
                  style={{ maxWidth: "50px", borderRadius: "11px" }}
                />
              </a>
              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon border-none" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav m-auto mb-2 mb-lg-0 carpent-head ">
                  <li className="nav-item dropdown">
                    <Link className="nav-link nav-main-home" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link nav-main-home" to="/">
                      About
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link nav-main-home" to="/">
                      Services
                    </Link>
                  </li>

                  <li className=" ">
                    <Link className="nav-link nav-main-home" to="/">
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <div className="d-flex head-icon flex-wrap">
                  {!auth?.user ? (
                    <>
                      <div className="m-2 sign-in">
                        <FaRegUser className="cursor-pointer" />
                        <NavLink
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="cursor-pointer"
                        >
                          Login
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <>
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown  dynamic-name">
                          <NavLink
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            style={{ border: "none" }}
                          >
                            {auth?.user?.name}
                          </NavLink>
                          <ul className="dropdown-menu">
                            <li></li>
                            <li>
                              <NavLink
                                onClick={handleLogout}
                                className="dropdown-item"
                              >
                                Logout
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </>
                  )}

                  <div className="m-2">
                    <CiHeart />
                  </div>
                  <div className="m-2">
                    <Link to="/cart">
                      {" "}
                      <CiShoppingCart /> <span> </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* login form */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content p-3 rounded-0">
              <div className="modal-header" style={{ backgroundColor: "#fff" }}>
                <h2
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{
                    color: "#000",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Login Form
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div>
                  <form onSubmit={loginSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control border  shadow-lg rounded-0"
                          id="inputEmail4"
                          placeholder="Email"
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label htmlFor="inputPassword6">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control border  shadow-lg rounded-0"
                          id="inputPassword6"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  <div className="text-center">
                    <p>
                      Have you not account !{" "}
                      <NavLink
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                      >
                        Register
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
