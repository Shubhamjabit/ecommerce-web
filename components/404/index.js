import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "./404.module.scss";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const FourOhFourUI = (props) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {/* <Col xs={12} md={6}>
          <Image
            src="/gifs/404.gif"
            alt="404 Error"
            layout="responsive"
            quality={100}
            height={300}
            width={300}
          />
        </Col> */}
        <Col xs={12} md={6}>
          <div className={styles.ErrorText}>
            {/* <Typography variant="h1">OH NO!</Typography>
            <Typography variant="h2">Its not here</Typography> */}
            <Col xs={12} md={6}>
              <Image
                src="/gifs/404.gif"
                alt="404 Error"
                layout="responsive"
                quality={100}
                height={450}
                width={1000}
              />
            </Col>
            <div className={styles.paragraphDiv}>
              <p>
                The page you were looking for appears to have been moved,
                deleted or does not exist.
              </p>
              <p>
                <Link passHref={true} scroll={true} href="/">
                  <a className={styles.button}>GO BACK</a>
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
