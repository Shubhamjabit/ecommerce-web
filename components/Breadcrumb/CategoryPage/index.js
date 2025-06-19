import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Styles from "../Breadcrumb.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";

export const BreadcrumbUI = (props) => {
  const router = useRouter();
  //const urlPath = router.asPath.split("/");
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const subsubUrlPath = router.query.indexthree;
  const { routedata, activepath } = props;

  return (
    <Container>
      <Row>
        <Breadcrumb className={Styles.breadcrumb}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

          <Breadcrumb.Item href={"/" + urlPath}>
            {urlPath && urlPath.replace(/-/g, " ")}
          </Breadcrumb.Item>
          <BreadcrumbItem>
            {subUrlPath && subUrlPath.replace(/-/g, " ")}
          </BreadcrumbItem>

          {/* <Breadcrumb.Item className={Styles.activeTile} active>
            {subsubUrlPath}
          </Breadcrumb.Item> */}
        </Breadcrumb>
      </Row>
    </Container>
  );
};
