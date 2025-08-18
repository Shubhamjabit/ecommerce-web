/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col, Image } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import Router, { useRouter } from "next/router";
import { AboutUI } from "../components/About";
import { MailOutlined } from "@ant-design/icons";
import styles from "../components/Footer/Footer.module.scss";
import { Typography } from "antd";
import dynamic from "next/dynamic";
const UCForIndex = dynamic(() => import("../components/UCForIndex"));

function UnderConstruction() {
  const router = useRouter();
  return (
    <div>
      <Container>
        {/* <Row style={{ padding: "100px 0px" }}> */}
        <Row>
          <div className="searchLoader ">
            <Image
              style={{ maxWidth: "80%" }}
              src="/images/page-under-construction.jpg"
              rounded
              fluid
            />
          </div>
        </Row>
        <UCForIndex />
      </Container>
    </div>
  );
}

export default UnderConstruction;
