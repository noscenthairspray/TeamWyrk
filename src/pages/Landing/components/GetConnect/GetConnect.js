import { Link } from "react-router-dom";
import Insiders from "./Insiders";
import styles from "./GetConnect.module.css";
import { insiders } from "../../data";
import { SubHeader } from "../../../../components/Typography";
import StyledButton from "../../../../components/StyledButton";

const GetConnect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <SubHeader color="darkBlue">
            Get connected to insiders from top companies
          </SubHeader>
        </div>
        <div className={styles.cardWrapper}>
          {insiders.map((insider, index) => (
            <Insiders insider={insider} position={index} key={insider.name} />
          ))}
        </div>
        <Link to="/signup">
          <StyledButton color="primary" hover>
            Become an Insider
          </StyledButton>
        </Link>
      </div>
    </div>
  );
};

export default GetConnect;