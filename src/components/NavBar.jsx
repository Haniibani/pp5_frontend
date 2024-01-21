import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import removeTokenTimestamp from "../utils/removeTokenTimestamp";
import Notifications from "./Notifications";
import Avatar from "./Avatar";
import SignIn from "../icons/SignIn";
import SignOut from "../icons/SignOut";
import Add from "../icons/Add";
import Heart from "../icons/Heart";
import House from "../icons/House";
import SignUp from "../icons/SignUp";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  };

  const IconLink = ({ to, icon: Icon, children }) => (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to={to}>
      <span className={styles.IconLink}>
        <Icon />
        <span className={styles.IconText}>{children}</span>
      </span>
    </NavLink>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <IconLink to="/feed" icon={House}>
              Home
            </IconLink>
            {currentUser ? (
              <>
                <IconLink to="/posts/create" icon={Add}>
                  Add
                </IconLink>
                <IconLink to="/liked" icon={Heart}>
                  Liked
                </IconLink>

                <Notifications />
                <NavLink
                  className={styles.NavLink}
                  to={`/profiles/${currentUser?.profile_id}`}
                >
                  <Avatar
                    src={currentUser?.profile_image}
                    text="Profile"
                    height={16}
                  />
                </NavLink>
                <NavLink
                  className={styles.NavLink}
                  to="/"
                  onClick={handleSignOut}
                >
                  <span className={styles.IconLink}>
                    <SignOut />
                    <span className={styles.IconText}>Sign out</span>
                  </span>
                </NavLink>
              </>
            ) : (
              <>
                <IconLink to="/signin" icon={SignIn}>
                  Sign in
                </IconLink>
                <IconLink to="/signup" icon={SignUp}>
                  Sign up
                </IconLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
