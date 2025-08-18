import {
  Container,
  Row,
  Image,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import ForwardToInboxSharpIcon from "@mui/icons-material/ForwardToInboxSharp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LoginIcon from "@mui/icons-material/Login";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const Newsletter = ({ styles }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <Container
      fluid
      // className={!matches ? "container-1300" : null}
      className={styles.NewsletterSection}
    >
      <Row>
        <Col lg={6} md={6} xl={4} xs={12}>
          <div className={styles.newsletterContent}>
            <div className={styles.icon}>
              {user ? <CardMembershipIcon /> : <LoginIcon />}
            </div>
            {user ? (
              <Link href={"/dashboard"}>
                <a>
                  <div className={styles.content}>
                    <h6>Join Our Credit Membership</h6>
                    <p>
                      Register now to get updates on promotions and exclusive
                      discounts
                    </p>
                  </div>
                </a>
              </Link>
            ) : (
              <Link href={"/login"}>
                <a>
                  <div className={styles.content}>
                    <h6>Register now</h6>
                    <p> Sign up/log in</p>
                  </div>
                </a>
              </Link>
            )}
            {/* <div className={styles.content}>
              <h6>Join Our Newsletter Now</h6>
              <p> Register now to get updates on promotions. </p>
            </div> */}
          </div>
        </Col>
        <Col lg={6} md={6} xl={5} xs={12}>
          <div className={styles.newsletterForm}>
            {/* <Input placeholder="Your email address" />
            <Button variant="text">Subscribe</Button> */}
          </div>
        </Col>
        <Col lg={6} md={6} xl={3} xs={12}>
          <div className={styles.newsletterContact}>
            <div className={styles.icon}>
              {/* <PhoneForwardedIcon /> */}
              <ForwardToInboxIcon />
            </div>
            <div className={styles.content}>
              {/* <p> Call us 24/7 </p>
              <h6> (+62) 0123 567 789 </h6> */}
              <p> Email us at </p>
              <h6>
                <a href="mailto:sales@sparkywarehouse.com.au">
                  sales@sparkywarehouse.com.au
                </a>
              </h6>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Newsletter;
