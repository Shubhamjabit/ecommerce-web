/* eslint-disable jsx-a11y/alt-text */
import { Container, Image, Row } from "react-bootstrap";
import styles from "./About.module.scss";
import Grid from "@mui/material/Grid";
export const AboutUI = (props) => {
  return (
    <>
      <div className={styles.breadcrumbsection}>
        <Container>
          <Row className="justify-content-md-center">
            <h1>About Sparky</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliquculpa qui
              officia deserunt mollit anim id estlaborum.
            </p>
          </Row>
        </Container>
      </div>
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ margin: "20px 0px" }}
        >
          <h2 className={styles.aboutUsTopic}>
            Tricab is passionate about good people, high quality, and your
            success.
          </h2>

          <p className={styles.aboutUsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliquculpa qui
            officia deserunt mollit anim id estlaborum.
          </p>
        </Row>
        <Row className={[styles.row, "justify-content-md-center"]}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} className={styles.mainContent}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Image
                    style={{ maxWidth: "80%" }}
                    src="/images/about-1.jpg"
                    rounded
                    fluid
                  />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12}>
                  <div className={styles.aboutContent}>
                    <h2>Who we are?</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliquculpa qui officia deserunt mollit anim id estlaborum.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do.
                    </p>
                    <p>
                      Magna aliquculpa qui officia deserunt mollit anim id
                      estlaborum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do.
                    </p>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={styles.mainContent}>
                <Grid item lg={8} md={6} sm={6} xs={12}>
                  <div className={styles.aboutContent}>
                    <h2>What we do?</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliquculpa qui officia deserunt mollit anim id estlaborum.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do. Magna aliquculpa qui officia deserunt mollit anim
                      id estlaborum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do.
                    </p>
                    <p>
                      Magna aliquculpa qui officia deserunt mollit anim id
                      estlaborum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do.
                    </p>
                  </div>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Image
                    style={{ maxWidth: "80%" }}
                    src="/images/about-2.jpg"
                    rounded
                    fluid
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className={styles.mainContent}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Image
                    style={{ maxWidth: "80%" }}
                    src="/images/about-3.jpg"
                    rounded
                    fluid
                  />
                </Grid>
                <Grid item lg={8} md={6} sm={6} xs={12}>
                  <div className={styles.aboutContent}>
                    <h2>Why Tricab?</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliquculpa qui officia deserunt mollit anim id estlaborum.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do. Magna aliquculpa qui officia deserunt mollit anim
                      id estlaborum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do.
                    </p>
                    <p>
                      Magna aliquculpa qui officia deserunt mollit anim id
                      estlaborum. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Row>
      </Container>
    </>
  );
};
