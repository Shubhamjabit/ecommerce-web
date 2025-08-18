import {
  Container,
  Row,
  Image,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
const ServiceBox = ({ styles }) => {
  const matches = useMediaQuery("(max-width:845px)");
  return (
    <Container
      fluid
      // className={!matches ? "container-1300" : null}
    >
      <Row>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/service1.png" alt="Service" />
            </div>
            <div className={styles.content}>
              <h6>Fast &amp; Secure Delivery</h6>
              <p>Tell about your service.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/service2.png" alt="Service" />
            </div>
            <div className={styles.content}>
              <h6>Money Back Guarantee</h6>
              <p>Within 10 days.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/service3.png" alt="Service" />
            </div>
            <div className={styles.content}>
              <h6>24 Hour Return Policy</h6>
              <p>No question ask.</p>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.servicebox}>
            <div className={styles.icon}>
              <Image src="/images/service4.png" alt="Service" />
            </div>
            <div className={styles.content}>
              <h6>Pro Quality Support</h6>
              <p>24/7 Live support.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceBox;
