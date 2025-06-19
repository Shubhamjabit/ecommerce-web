/* eslint-disable jsx-a11y/alt-text */
import { Container, Image, Row } from "react-bootstrap";
import styles from "./Contact.module.scss";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ForumIcon from "@mui/icons-material/Forum";
import QuizIcon from "@mui/icons-material/Quiz";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ContactForm from "./ContactForm";
export const ContactUI = (props) => {
  return (
    <>
      <div className={styles.breadcrumbsection}>
        <Container>
          <Row className="justify-content-md-center">
            <h1>Contact us</h1>
            <p>
              Have any questions?<br></br>
              Reach out to us at sales@sparkywarehouse.com.au and
              we will get back to you shortly.
            </p>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className={[styles.row, "justify-content-md-center"]}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} className={styles.mainContent}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <ContactForm />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.427954082727!2d144.9628352!3d-37.639141699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64e2a228f28bd%3A0xc6cf000096b99f7f!2s57%20Freight%20Dr%2C%20Somerton%20VIC%203062%2C%20Australia!5e0!3m2!1sen!2sin!4v1681234383889!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    loading="lazy"
                    // referrerpolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "100%" }}
                  ></iframe>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Row>
      </Container>
    </>
  );
};
