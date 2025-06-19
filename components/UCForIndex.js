import { Row } from "react-bootstrap";
import { MailOutlined } from "@ant-design/icons";
import styles from "../components/Footer/Footer.module.scss";
import { Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

const UCForIndex = () => {
  return (
    <Row style={{ paddingLeft: "20%" }}>
      <Row>
        <Typography>
          <Paragraph style={{ fontSize: "20px" }}>
            Our Website is currently undergoing scheduled maintenance. We should
            be back shortly. Thank you for your patience.
          </Paragraph>
        </Typography>
      </Row>
      <Row className={styles.supportRow}>
        <h6 className={styles.footerTopic}>Support</h6>
        <ul
          className={styles.supportlistitem}
          style={{ listStyle: "none", fontSize: "20px" }}
        >
          <li>
            <MailOutlined /> <span>sales@sparkywarehouse.com.au</span>
          </li>
        </ul>
      </Row>
    </Row>
  );
};

export default UCForIndex;
