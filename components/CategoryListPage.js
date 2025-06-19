import React, { useState, useEffect } from "react";
import { Layout } from "./Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { BreadcrumbUI } from "./Breadcrumb/CategoryListPage";
import styles from "./../styles/Home.module.scss";
import CategotyList from "./Category/CategotyList";
import CategoryFilter from "./Category/CategoryFilter";
import { endPoint, envUrl } from "../utils/factory";
import { Bars } from "react-loader-spinner";
import { Empty } from "antd";
const CategoryPage = ({ CategoryDataBySlug, CategoryData }) => {
  console.log(">>>>>>>>>>>> CategoryDataBySlug", CategoryDataBySlug);
  console.log(">>>>>>> CategoryData", CategoryData);
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const paths = router.asPath.split("/");
  const activePath = paths[1];
  const routeData = [];
  const [productpageopen, setProductPageOpen] = React.useState(false);
  const [filterid, setFilterID] = useState([]);
  console.log("filterid >>>>>>", filterid);
  const [filtercategorydata, setFilterCategoryData] = useState([]);
  const [subcategory, setSubCategory] = useState(
    CategoryDataBySlug.sub_categories
  );
  const [checkBoxState, setCheckBoxState] = useState(null);
  console.log("checkBoxState>>>>>>", checkBoxState);

  // console.log("$$$$$$$$$$$$$$$$$$$$$$$", subcategory);
  const handleClose = () => {
    setProductPageOpen(false);
  };

  const handleClickSubcatemenu = (item, event, i) => {
    if (event.target.checked) {
      const filterID = { id: item.id };
      setFilterID([...filterid, filterID]);
    } else {
      const filterdata = filterid.filter((i) => i.id != item.id);
      setFilterID(filterdata);
    }
    // set checkBox State according to checked value
    console.log("event.target.checked>>>>>>", event.target.checked, i);
    const updatedCheckBoxState = checkBoxState.map((item, index) => {
      if (index == i) {
        return event.target.checked;
      } else {
        return item;
      }
    });
    setCheckBoxState(updatedCheckBoxState);
  };

  useEffect(() => {
    if (filterid.length > 0) {
      handleClickSubcate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterid]);

  const handleClickSubcate = async () => {
    // setSubCategory(null);
    setSubCategory([]);
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
    if (filterid.length === 0) {
      setSubCategory(CategoryDataBySlug.sub_categories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterid]);
  useEffect(() => {
    setSubCategory(CategoryDataBySlug.sub_categories);
    // need to reset filter id as well to avoid cross sub category bug on router change
    setFilterID([]);
    // reset checkBoxes
    setCheckBoxState(
      new Array(CategoryDataBySlug?.category_filter?.length).fill(false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div>
      <BreadcrumbUI activepath={urlPath} routedata={routeData} />
      {CategoryDataBySlug.category_filter == null ? (
        <Empty />
      ) : (
        <Container>
          <Row>
            <Col sm={3}>
              {CategoryDataBySlug.category_filter == null ? (
                <Empty />
              ) : (
                <CategoryFilter
                  handleClickSubcatemenu={handleClickSubcatemenu}
                  CategoryDataBySlug={CategoryDataBySlug}
                  checkBoxState={checkBoxState}
                />
              )}
            </Col>
            <Col sm={9}>
              {subcategory ? (
                <>
                  {subcategory.length == 0 ? (
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
                  ) : (
                    <CategotyList subcategory={subcategory} />
                  )}
                </>
              ) : (
                <>
                  <Empty />
                  {/* {subcategory === null || subcategory === undefined ? (
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
                  )} */}
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default CategoryPage;
