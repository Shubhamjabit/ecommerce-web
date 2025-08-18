import { Breadcrumb } from "react-bootstrap";
import Styles from "./Breadcrumb.module.scss";

export const BreadcrumbUI = (props) => {
  const { routedata, activepath } = props;
  console.log("aaaaaaaaaaa props", props);

  return (
    <Breadcrumb className={Styles.breadcrumb}>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {!routedata && (
        <>
          <Breadcrumb.Item
            className={Styles.content}
            // key={i}
            //  href={item.to}
            href={"/" + activepath}
          >
            {activepath}
          </Breadcrumb.Item>
        </>
      )}
      {routedata &&
        routedata.map((item, i) => {
          if (item.length - 1 === i) {
            return (
              <Breadcrumb.Item className={Styles.activeTile} active key={i}>
                {item}
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item
              className={Styles.content}
              key={i}
              //  href={item.to}
              href={"/" + routedata.slice(0, i + 1).join("/")}
            >
              {item}
            </Breadcrumb.Item>
          );
        })}
      {/* <Breadcrumb.Item className={Styles.activeTile} active>
        {activepath && activepath.replace(/-/g, " ")}
      </Breadcrumb.Item> */}
    </Breadcrumb>
  );
};
