import { Link, NavLink } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useAuthState } from "../../../hooks/useAuthState";
import styles from "./Header.module.css";
import ProfileDropDown from "./ProfleDropDown";
import { auth,db } from "../../../firebase";
import { Firestore, doc,getDoc } from "firebase/firestore";
import useSnapshot from "../../../hooks/useSnapshot";

const activeStyle = {
  borderBottom: "3px solid #222f65",
  paddingTop: "3px",
};

const Header = () => {
  const { user, isAuthenticated } = useAuthState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {val:user1}= useSnapshot('user', user.uid)

  // console.log(user1);
  // const user1 = doc(db,`user/${user.uid}`)
  // console.log(user1);

  return (
    <header className={styles.navHeader}>
      <nav className={styles.navContainer}>
        <Link to="/">
          <div className={styles.navBrand}>
            <span className={styles.brandText}>TeamWyrk</span>
            <span className={styles.builtByText}>built by Bootcamp2</span>
          </div>
        </Link>
        <div className={styles.linkWrapper}>
          <ul className={styles.navLinks}>
            {isAuthenticated && user1?.role==='requester'&&(
              <li>
                <NavLink
                  to="/request"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Requests
                </NavLink>
              </li>
            )}
            {isAuthenticated && user1?.role==='insider'&&(
              <li>
                <NavLink
                  to="/request-insider"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Insider
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                FAQ
              </NavLink>
            </li>
            <li>
              <a
                href="https://airtable.com/shrDiI6bJ3SaDJE5V"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isMobile ? "Contact" : "Contact Us"}
              </a>
            </li>
          </ul>
          {!isMobile && (
            <div className={styles.accessButtons}>
              {isAuthenticated ? (
                <ProfileDropDown user={user} />
              ) : (
                <>
                  <Link to="/signin">
                    <button className={styles.signInButton}>Log In</button>
                  </Link>
                  <Link to="/signup">
                    <button className={styles.signUpButton}>Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
