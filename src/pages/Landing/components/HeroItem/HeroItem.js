import { useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Button from "../../../../components/Button/";
import { Header } from "../../../../components/Typography";
import styles from "./HeroItem.module.css";

const HeroItem = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className={styles.container}>
      {/* add properties to motion.divs to animate */}
      {/* heroLeft logo container */}
      <motion.div
        className={styles.heroLeft}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          ease: "easeIn",
        }}
      >
        <img
          className={styles.heroLeftLogo}
          src="/images/landing_page/herosectionleft.png"
          alt="hero logo left"
        />
      </motion.div>

      {/* center text container */}
      <div className={styles.heroCenterText}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.1,
            ease: "backIn",
          }}
        >
          <Header color="primary">Get ready for TeamWyrk.</Header>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            ease: "backIn",
          }}
        >
          {isMd ? (
            <>
              <p className={styles.textBodyTop}>
                It takes a team to find work. We'll be your team, connecting you
                with insiders at top companies to land your next role at no
                extra cost. <br />
              </p>
              <p className={styles.textBodyBottom}>
                Join the waitlist to be among the first to know when TeamWyrk
                launches.
              </p>
            </>
          ) : (
            <>
              <p className={styles.textBodyTop}>
                It takes a team to find work. We'll be your team, <br />{" "}
                connecting you with insiders at top companies to land <br />
                your next role at no extra cost. <br />
              </p>
              <p className={styles.textBodyBottom}>
                Join the waitlist to be among the first to know when <br />
                TeamWyrk launches.
              </p>{" "}
            </>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.45,
            ease: "backIn",
          }}
        >
          <a
            href="https://airtable.com/shrDiI6bJ3SaDJE5V"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button event="hover" color="yellow">
              Join the waitlist
            </Button>
          </a>
        </motion.div>
      </div>

      {/* heroRight logo container */}
      <motion.div
        className={styles.heroRight}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          ease: "easeIn",
        }}
      >
        <img
          className={styles.heroRightLogo}
          src="/images/landing_page/herosectionright.png"
          alt="hero logo right"
        />
      </motion.div>
    </div>
  );
};

export default HeroItem;
