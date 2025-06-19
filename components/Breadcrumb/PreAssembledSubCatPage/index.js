import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Styles from "../Breadcrumb.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";

export const BreadcrumbUI = (props) => {
  const router = useRouter();
  //const urlPath = router.asPath.split("/");
  let u = router.asPath.split("/");
  const urlPath = u[1];
  const subUrlPath = u[2];
  const subsubUrlPath = router.query.indexthree;
  const { routedata, activepath } = props;
  // console.log("!!!!!!! urlPath,subUrlPath ", urlPath, subUrlPath);

  return (
    <Container>
      <Row>
        <Breadcrumb className={Styles.breadcrumb}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/${urlPath}`}>
            {urlPath && urlPath}
          </Breadcrumb.Item>
          <BreadcrumbItem href={subUrlPath}>
            {subUrlPath && subUrlPath}
          </BreadcrumbItem>

          {/* <Breadcrumb.Item className={Styles.activeTile} active>
            {subsubUrlPath}
          </Breadcrumb.Item> */}
        </Breadcrumb>
      </Row>
    </Container>
  );
};
