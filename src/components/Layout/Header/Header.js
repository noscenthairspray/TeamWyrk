import { Link, NavLink } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useAuthState } from "../../../hooks/useAuthState";
import styles from "./Header.module.css";
import ProfileDropDown from "./ProfleDropDown";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";

const activeStyle = {
  borderBottom: "3px solid #222f65",
  paddingTop: "3px",
};

const Header = () => {
  const { user, isAuthenticated } = useAuthState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [userObj, setUserObj] = useState({});

  //grab doc from user collection in firebase and return object as user1
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "user", user.uid);
      const unsub = onSnapshot(docRef, (doc) => setUserObj(doc.data()));
      return () => unsub();
    }
  }, []);

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
            {isAuthenticated && (
              <>
                {userObj.role === "requester" ? (
                  <li>
                    <NavLink
                      to="/request"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Requests
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/request-insider"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Requests
                    </NavLink>
                  </li>
                )}
              </>
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
            {isAuthenticated && (
                  <li>
                    <NavLink
                      to="/chat"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Chat
                    </NavLink>
                  </li>
                )}
          </ul>
          {!isMobile && (
            <div className={styles.accessButtons}>
              {isAuthenticated ? (
                <>
                {/* <Link className={styles.messageBox}>
                  <svg className={styles.messageBubble} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6.5H14M6 10.5H12M16 1.5C16.7956 1.5 17.5587 1.81607 18.1213 2.37868C18.6839 2.94129 19 3.70435 19 4.5V12.5C19 13.2956 18.6839 14.0587 18.1213 14.6213C17.5587 15.1839 16.7956 15.5 16 15.5H11L6 18.5V15.5H4C3.20435 15.5 2.44129 15.1839 1.87868 14.6213C1.31607 14.0587 1 13.2956 1 12.5V4.5C1 3.70435 1.31607 2.94129 1.87868 2.37868C2.44129 1.81607 3.20435 1.5 4 1.5H16Z" stroke="#37447E" strokeWidth="2" strokeLinecap="round" stroke-Linejoin="round"/>
                  </svg>
                  <div className={styles.messageAlert}>3</div>
                </Link> */}
                <ProfileDropDown user={user} />
                </>
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
