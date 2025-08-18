import styles from "./Footer.module.scss";
import MobileStyles from "./FooterForMobile.module.scss";
import { Row, Container } from "react-bootstrap";
import { Copyright } from "./components/Copyright";
import LinkSection from "./components/LinkSection";
import ServiceBox from "./components/ServiceBox";
import Newsletter from "./components/Newsletter";
import LinkSectionForMobile from "./components/LinkSectionForMobile";

export const Footer = (props) => {
  return (
    <Row>
      <div className={styles.containerfluid}>
        <Container>
          <Newsletter styles={styles} />
          {/* <div className={styles.footerDiv}>
        <ServiceBox styles={styles} />
      </div> */}
          <div className={styles.footerDiv2}>
            <LinkSection styles={styles} />
          </div>
          <div className={styles.MobileFooterDiv2}>
            <LinkSectionForMobile styles={MobileStyles} />
          </div>
          {/* <Row className={styles.footerDivBottom}>
        <Copyright styles={styles} />
      </Row> */}
        </Container>
      </div>
    </Row>
  );
};
