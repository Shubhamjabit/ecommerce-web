import { Container, Row, Col } from "react-bootstrap";

export const Copyright = ({ styles }) => {
  return (
    <Container>
      <Row className={styles.copyrightRoot}>
        <Col sm={3}>
          <h6 className={styles.footerText}>Copyright © 2023 Tricab.</h6>
        </Col>
      </Row>
    </Container>
  );
};
