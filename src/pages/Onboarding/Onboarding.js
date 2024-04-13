import styles from "./Onboarding.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Onboarding = () => {
  // const [show, setShow] = useState(false)
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // get the authenticated user object from firestore.
  const userId = auth.currentUser.uid;

  const selectRole = async () => {
    await updateDoc(doc(db, "user", userId), {
      role: role,
    });

    role === "requester" ? navigate("/request") : navigate("/request-insider");
    setRole("");
  };

  return (
    <div className={styles.container}>
      {/* <div>
          <Link to="/signup"><button className={styles.back}>&lt; <u>Back</u></button></Link>
      </div> */}

      <div className={styles.role}>
        <div className={styles.title}>
          <h2>Please select your role of interest:</h2>
        </div>

        <button
          className={styles.roleButton}
          onClick={() => setRole("requester")}
        >
          <div className={styles.roleButtonOuter}>
            <div className={styles.roleButtonInner}>
              <div>
                <strong>Requester</strong>
              </div>
              <div>
                Currently seeking employment in the technology industry.
              </div>
            </div>

            <div>
              {role === "requester" && (
                <img src="/images/onboarding/checkmark_onboarding.svg" alt="checkmark"></img>
              )}
            </div>
          </div>
        </button>

        <button
          className={styles.roleButton}
          onClick={() => setRole("insider")}
        >
          <div className={styles.roleButtonOuter}>
            <div className={styles.roleButtonInner}>
              <div>
                <strong>Insider</strong>
              </div>
              <div>
                Currently a working professional in the technology industry.
              </div>
            </div>

            <div>
              {role === "insider" && (
                <img src="/images/onboarding/checkmark_onboarding.svg" alt="checkmark"></img>
              )}
            </div>
          </div>
        </button>

        {role ? (
          <button className={styles.continue} onClick={selectRole}>
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Onboarding;
