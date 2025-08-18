import React, { useState, useEffect } from "react";
import { Layout } from "../Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { BreadcrumbUI } from "../Breadcrumb/CategoryListPage";
import styles from "../../styles/Home.module.scss";
import BrandList from "./components/BrandList";
import { endPoint, envUrl } from "../../utils/factory";
import { Bars } from "react-loader-spinner";
import { Empty } from "antd";
const BrandsUI = ({ brandsList, CategoryDataBySlug, CategoryData }) => {
  // console.log("@@@@@@@@@@@@@@@ brandsList", brandsList);
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const paths = router.asPath.split("/");
  const activePath = paths[1];
  const routeData = [];
  const [productpageopen, setProductPageOpen] = React.useState(false);
  const [filterid, setFilterID] = useState([]);
  const [filtercategorydata, setFilterCategoryData] = useState([]);
  const [subcategory, setSubCategory] = useState(brandsList);

  //console.log("$$$$$$$$$$$$$$$$$$$$$$$", subcategory);
  const handleClose = () => {
    setProductPageOpen(false);
  };

  const handleClickSubcatemenu = (item, event) => {
    if (event.target.checked) {
      const filterID = { id: item.id };
      setFilterID([...filterid, filterID]);
    } else {
      const filterdata = filterid.filter((i) => i.id != item.id);
      setFilterID(filterdata);
    }
  };

  useEffect(() => {
    if (filterid.length > 0) {
      handleClickSubcate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterid]);

  const handleClickSubcate = async () => {
    setSubCategory(null);

    const variables = {
      filter_id: filterid,
    };
    const response = await fetch(
      `${envUrl.baseUrl}${endPoint.subCategoryByFilter}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      }
    );
    const res = await response.json();
    setSubCategory(res.data.subcategoryData);
  };
  useEffect(() => {
    setSubCategory(brandsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
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
          <Col sm={9}>
            {subcategory && subcategory.length > 0 ? (
              <BrandList subcategory={subcategory} />
            ) : (
              <>
                {subcategory.length == 0 ? (
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
};

export default BrandsUI;
