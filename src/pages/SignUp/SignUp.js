import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { Credentials } from "../../components/Forms";
import { signUpWithGoogle } from "../../firebase/auth/google_signin";
import styles from "./SignUp.module.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "../../hooks/useAuthState";

const SignUp = () => {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //if the user is authenticated, redirect to the home page
  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }
  return (
    <div className={styles.container}> 
      {!isMobile && <div className={styles.leftHalf} />}
      <div className={styles.rightHalf}>
        <Credentials title="Sign up for TeamWyrk" submitBtnText="Sign up" />
        
        <div className={styles.dividerWrapper}>
          <p className={styles.divider}>or</p>
        </div>

        <button
          className={styles.googleButton}
          onClick={() => signUpWithGoogle(navigate)}
        >
          <img src="/icons/google.svg" alt="Google Icon" />
          Sign up with Google
        </button>
        <p className={styles.helperText}>
          Already have an account?{" "}
          <Link to="/signin" replace style={{ textDecoration: "underline" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;