import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./Styles/Preassembled.module.scss";
import { endPoint, envUrl } from "../../utils/factory";
import { Bars } from "react-loader-spinner";
import { Empty } from "antd";
import PreAssembledSubCatList from "./components/PreAssembledSubCat/PreAssembledSubCatList";

function PreAssembledUI({ preList }) {
  //Next Router declartion
  const router = useRouter();
  // Static Data for Display
  // const preList = [
  //   {
  //     id: 1,
  //     image_url: "/images/tricab_img/product1.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 2,
  //     image_url: "/images/tricab_img/product22.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 3,
  //     image_url: "/images/tricab_img/product3.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 4,
  //     image_url: "/images/tricab_img/product4.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 5,
  //     image_url: "/images/tricab_img/product5.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 6,
  //     image_url: "/images/tricab_img/product4.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 7,
  //     image_url: "/images/tricab_img/product4.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  //   {
  //     id: 8,
  //     image_url: "/images/tricab_img/product4.png",
  //     tagName: "EBL",
  //     name: "Earth Bonding Leads",
  //     description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing
  //       connection to be welded onto steel rebars. This provides a reliable, strong,
  //       low resistance path to earth.`,
  //   },
  // ];
  // handle Customization
  const handleCustomization = (itemId) => {
    if (itemId)
      router.push({ pathname: "customization", query: { itemId: itemId } });
  };
  return (
    <div>
      {/* <BreadcrumbUI activepath={urlPath} routedata={routeData} /> */}
      <Container>
        <Row>
          {/* <Col sm={3}>
            <CategoryFilter
              handleClickSubcatemenu={handleClickSubcatemenu}
              CategoryDataBySlug={CategoryDataBySlug}
            />
          </Col> */}
          <Col sm={12}>
            {preList && preList.length > 0 ? (
              <PreAssembledSubCatList preList={preList} />
            ) : (
              <>
                {preList.length == 0 ? (
                  <Empty />
                ) : (
                  <div className={styles.LoaderSection}>
                    <Bars
                      height="80"
                      width="80"
                      color="#2595d4"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log("((((((((((((((((( context =", context);
  let query = context.query;
  let pageData = null;

  // console.log("######>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", query);

  var obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: query.index,
      level: 1,
      page: query.page ? parseInt(query.page) : 1,
      pageSize: 6,
      order_by: query.orderBy ? query.orderBy : "Default",
      minimum_price: query.minPrice ? parseInt(query.minPrice) : 10,
      maximum_price: query.maxPrice ? parseInt(query.maxPrice) : 100000,
    }),
  };

  const response = await fetch(
    `${envUrl.baseUrl}${endPoint.webAttribute}`,
    obj
  );

  pageData = await response.json();

  // if (
  //   pageData &&
  //   pageData.data &&
  //   !pageData.data.products &&
  //   !pageData.data.productBySlug &&
  //   !pageData.data.content.length &&
  //   !pageData.data.categorybyslug.length
  // ) {
  //   context.res.writeHead(307, { Location: `/404` });
  //   context.res.end();
  // }

  return {
    props: { pageData },
  };
}

export default PreAssembledUI;
