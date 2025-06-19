import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./OrderConfirmation.module.scss";
import Router from "next/router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export const OrderConfirmation = ({ trackingCode, email }) => {
  return (
    <Container className={styles.area}>
      <span className={styles.Icon}>
        <CheckCircleIcon />
      </span>
      <h1 className={styles.topic}>Thank you for your order</h1>
      <Container className={styles.para}>
        <p>
          Your order <span className={styles.highlight}>{trackingCode} </span>{" "}
          is now confirmed. <br />
          An order confirmation email is on its way to your inbox at{" "}
          <span className={styles.highlight}>{email}</span>
          {/* <span className={styles.highlight}>{email}</span>. */}
        </p>
      </Container>
    </Container>
  );
};
