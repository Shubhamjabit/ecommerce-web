import { Breadcrumb } from "react-bootstrap";
import Styles from "../Breadcrumb.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";
import { Container, Row, Col } from "react-bootstrap";
export const BreadcrumbUI = (props) => {
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const { routedata, activepath } = props;

  return (
    <Row>
      <Breadcrumb className={Styles.breadcrumb}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

        <Breadcrumb.Item className={Styles.activeTile} active>
          {activepath && activepath.replace(/-/g, " ")}
        </Breadcrumb.Item>
      </Breadcrumb>
    </Row>
  );
};
