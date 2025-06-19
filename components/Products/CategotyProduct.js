import React, { useEffect, useState, useRef } from "react";
import styles from "./Products.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "./../shared/Loader/Loader";
import { useRouter } from "next/router";
import ProductItem from "../shared/Products/ProductItem";
import PaginationUi from "../shared/Pagination/PaginationUi";
import { Button, Collapse } from "antd";
import { Checkbox } from "antd";
import Image from "next/image";
import axios from "axios";
import { endPoint, envUrl } from "../../utils/factory";
import { Checklist, Delete } from "@mui/icons-material";
import NoProduct from "./NoProduct";
import { useMediaQuery } from "@material-ui/core";

const CategotyProduct = ({
  products,
  pageSize,
  page,
  setPage,
  handlePagination,
  total,
}) => {
  const defaultPageSize = 18;
  const router = useRouter();
  const urlPath = router.query.index;
  const subUrlPath = router.query.indextwo;
  const subsubUrlPath = router.query.indexthree;
  const paths = router.asPath.replace("/", "").replace(/-/g, " ");
  // const filterParams = router;
  console.log("!!!!!!00000000", router);
  // console.log("!!!!!!11111111111", urlPath);
  // console.log("!!!!!!!!!!2222222222", subUrlPath);
  // console.log("!!!!!!!!!!33333", subsubUrlPath);
  // console.log("!!!!!!!!!!44444", paths);
  // console.log("!!!!!!!!!!5555", router.asPath);

  const [filterData, setFilterData] = useState([]);
  console.log("ffffffff", filterData);
  const ProductGrid = () =>
    products &&
    products.map((product, i) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <ProductItem product={product} />
      );
    });
  // ?Filters=|custmFilter1=50mm+20mm|custmFilter2=20mm+30mm|custmFilter=5+1
  // const throttle = (func, delay = 1000) => {
  //   let timerId;
  //   let lastExecTime = 0;
  //   return (...args) => {
  //     const currentTime = new Date().getTime();
  //     if (currentTime - lastExecTime > delay) {
  //       func.apply(null, args);
  //       lastExecTime = currentTime;
  //     } else {
  //       clearTimeout(timerId);
  //       timerId = setTimeout(() => {
  //         func.apply(null, args);
  //         lastExecTime = new Date().getTime();
  //       }, delay);
  //     }
  //   };
  // };
  function handleCheck(e) {
    console.log(e.target.name + "=" + e.target.value);
    console.log(`checked = ${e.target.checked},${e.target.value}`);
    if (e.target.checked) {
      if (router.query.hasOwnProperty(e.target.name)) {
        router.replace({
          query: {
            ...router.query,
            [e.target.name]: router.query[`${e.target.name}`].concat(
              "+",
              e.target.value.toString()
            ),
            page: 1,
          },
        });
        // router.push({
        //   pathname: `/${urlPath}/${subUrlPath}`,
        //   query : {"custmFilter" + e.target.name = e.target.value},
        // });
      } else {
        router.replace({
          query: {
            ...router.query,
            [e.target.name]: e.target.value.toString(),
            page: 1,
          },
        });
      }
    } else {
      if (router.query.hasOwnProperty(e.target.name)) {
        let currentFilterValues = router.query[`${e.target.name}`];
        // console.log();
        let arr = currentFilterValues.split("+");
        let newFilterValues = arr
          .filter((a) => {
            return a !== e.target.value;
          })
          .join("+");
        console.log("!!!! newFilterValues", newFilterValues);
        if (newFilterValues.length == 0) {
          // router.replace(router.query[`${e.target.name}`], undefined, {
          //   shallow: true,
          // });
          delete router.query[`${e.target.name}`];
          router.replace({
            query: {
              ...router.query,
            },
          });
        } else {
          router.replace({
            query: {
              ...router.query,
              [e.target.name]: newFilterValues,
            },
          });
        }
      }
    }
  }

  useEffect(() => {
    if (Object.keys(router.query).length > 2) {
      router.replace(`/${urlPath}/${subUrlPath}`);
      console.log("<<<<<<<<", router);
    }
    axios
      .post(
        `${envUrl.baseUrl}${endPoint.getProductFilters}`,
        { paths: paths },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("ffff22222 response", response);
        if (response.status == 200) {
          setFilterData(response.data.data);
        } else if (response.status == 204) {
          setFilterData([]);
        }
      })
      .catch((error) => {
        console.log("API error in getProductFilters :::::", error);
        // setLoader(false);
      })
      .finally(() => {});
  }, []);

  const items = filterData.map((f, index) => {
    return {
      key: index,
      label: f.filterName,
      children: f.filter_values.map((fv, i) => {
        if (fv) {
          return (
            <div className="checkbox" key={i}>
              <Checkbox
                key={i}
                value={fv}
                onChange={handleCheck}
                name={`custmFilter${f.custmFilterNumber}`}
              >
                {fv}
              </Checkbox>
            </div>
          );
        } else {
          return null;
        }
      }),
    };
  });

  const onChange = (key) => {
    console.log(key);
  };

  const handleReset = () => {
    router.replace(`/${urlPath}/${subUrlPath}`);
    router.reload();
  };

  return (
    <>
      {products && products.length > 0 ? (
        <>
          <div className={styles.main_container}>
            <div className={styles.filter_container}>
              <div className={styles.filter_header}>
                <span>Filters</span>
                <div>
                  <img src={"/Group.png"} width={20} height={20} />
                </div>
              </div>
              <div>
                <Collapse
                  expandIconPosition="right"
                  items={items}
                  // defaultActiveKey={["1"]}
                  onChange={onChange}
                />
              </div>
              <div className={styles.clear_button_container}>
                <Button onClick={handleReset}>Clear</Button>
              </div>
            </div>

            <div className={styles.ProductGrid}>
              <ProductGrid />
            </div>
          </div>

          <div className={styles.paginationUI}>
            <PaginationUi
              page={page}
              totalPosts={total}
              handlePagination={handlePagination}
              pageSize={pageSize}
            />
          </div>
        </>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <NoProduct />
          </Row>
        </Container>
      )}
    </>
  );
};

export default CategotyProduct;
