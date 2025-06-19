import { Breadcrumb } from "react-bootstrap";
import Styles from "../Breadcrumb.module.scss";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

export const BreadcrumbUI = (props) => {
  const { routedata, activepath } = props;
  const router = useRouter();
  //const urlPath = router.asPath.split("/");
  const urlPath = router.query.index;
  return (
    <Row>
      <Breadcrumb className={Styles.breadcrumb}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {urlPath == "customized-product" ? (
          <Breadcrumb.Item className={Styles.activeTile} active>
            Customized Product
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item className={Styles.activeTile} active>
            {/* {urlPath.replace(/-/g, " ")} */}
            {props.productName}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </Row>
  );
};
