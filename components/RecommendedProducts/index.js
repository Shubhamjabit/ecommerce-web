import React, { useState, useEffect } from "react";
import styles from "./RecommendedProducts.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Button from "@mui/material/Button";
import "swiper/css";
import "swiper/css/pagination";
import CompareProduct from "../CompareProduct/CompareProduct";
// const products = [
//   {
//     name: "A01-AMXX/10B1.5BK",
//     image: "/images/products/category.png",
//     title: "A01",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/10B1RE",
//     image: "/images/products/image(4).png",
//     title: "A02",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/10B2.5GY",
//     image: "/images/products/image(5).png",
//     title: "A03",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/10B4OR",
//     image: "/images/products/image(6).png",
//     title: "A05",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/10B6GR",
//     image: "/images/products/image(7).png",
//     title: "A06",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/12B.5WH",
//     image: "/images/products/category.png",
//     title: "A07",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/12B.75LB",
//     image: "/images/products/image(4).png",
//     title: "A08",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/12B1.5BK",
//     image: "/images/products/image(5).png",
//     title: "A09",
//     slug: "test-test",
//   },
//   {
//     name: "A01-AMXX/12B10BR",
//     image: "/images/products/image(6).png",
//     title: "A10",
//     slug: "test-test",
//   },
// ];

const RecommendedProducts = ({ products, currentProduct }) => {
  console.log("************** RecommendedProducts products", products);
  const [compareopen, setCompareOpen] = useState(false);
  const [compareProduct, setCompareProduct] = useState(null);

  const handleCompareOpen = (item) => {
    setCompareProduct(item);
    setCompareOpen(true);
  };
  const handleCompareClose = () => {
    setCompareOpen(false);
  };
  return (
    <>
      {products ? (
        <>
          <div className={styles.recommendedProductsOuterBox}>
            <Row>
              <h4 className={styles.recommendedProductsTitle}>
                Related Products
              </h4>
            </Row>
            <div className={styles.ProductList}>
              {products?.map((item) => (
                <>
                  {item.product_media_list.map((product, index) => (
                    // <Link
                    //   passHref={true}
                    //   scroll={true}
                    //   href={{ pathname: product.slug }}
                    //   key={index}
                    // >
                    <a
                      onClick={() => {
                        handleCompareOpen(item);
                      }}
                      key={index}
                    >
                      <div className={styles.ProductListBox}>
                        {/* <div className={styles.Title}>{product.title}</div> */}

                        <div className={styles.productimage}>
                          <Image
                            src={process.env.PRODUCT_CDN_URL + product.path}
                            alt=""
                            className={styles.logoImage}
                          />
                        </div>

                        <div className={styles.Box}>
                          <div className={styles.Name}>{item.name}</div>
                          <div className={styles.productprice}>
                            {/* {item?.priceJson.map((pj) => ( */}
                            <span>
                              $
                              {
                                item?.priceJson[item?.priceJson?.length - 1]
                                  ?.price
                              }
                            </span>{" "}
                            - <span>${item?.priceJson[0]?.price}</span>
                            {/* ))} */}
                          </div>
                        </div>
                      </div>
                    </a>
                    // </Link>
                  ))}
                  {compareProduct ? (
                    <CompareProduct
                      compareopen={compareopen}
                      handleCompareClose={handleCompareClose}
                      currentProduct={currentProduct}
                      // compareProduct={item}
                      compareProduct={compareProduct}
                    />
                  ) : null}
                </>
              ))}
            </div>
            <Swiper
              slidesPerView={2}
              spaceBetween={5}
              slidesPerGroup={2}
              autoplay={{ delay: 8000 }}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              className={styles.MobileSlider}
              modules={[Autoplay, Navigation]}
            >
              {products &&
                products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <Link passHref={true} scroll={true} href="/" key={index}>
                      <a>
                        <div className={styles.ProductListBox}>
                          {/* <div className={styles.Title}>{product.title}</div> */}
                          <Row>
                            <Col className={styles.productimage}>
                              <Image
                                src={product.image}
                                alt=""
                                className={styles.logoImage}
                              />
                            </Col>
                          </Row>
                          <div className={styles.Box}>
                            <div className={styles.Name}>{product.name}</div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* <CompareProduct
        compareopen={compareopen}
        handleCompareClose={handleCompareClose}
        currentProduct={currentProduct}
        // CompareProduct={}
      /> */}
          </div>
        </>
      ) : null}
    </>
    // <div className={styles.recommendedProductsOuterBox}>
    //   <Row>
    //     <h4 className={styles.recommendedProductsTitle}>Related Products</h4>
    //   </Row>
    //   <div className={styles.ProductList}>
    //     {products?.map((item) => (
    //       <>
    //         {item.product_media_list.map((product, index) => (
    //           // <Link
    //           //   passHref={true}
    //           //   scroll={true}
    //           //   href={{ pathname: product.slug }}
    //           //   key={index}
    //           // >
    //           <a onClick={handleCompareOpen} key={index}>
    //             <div className={styles.ProductListBox}>
    //               {/* <div className={styles.Title}>{product.title}</div> */}

    //               <div className={styles.productimage}>
    //                 <Image
    //                   src={process.env.PRODUCT_CDN_URL + product.path}
    //                   alt=""
    //                   className={styles.logoImage}
    //                 />
    //               </div>

    //               <div className={styles.Box}>
    //                 <div className={styles.Name}>{item.name}</div>
    //                 <div className={styles.productprice}>
    //                   {/* {item?.priceJson.map((pj) => ( */}
    //                   <span>${item.priceJson[2].price}</span> -{" "}
    //                   <span>${item.priceJson[0].price}</span>
    //                   {/* ))} */}
    //                 </div>
    //               </div>
    //             </div>
    //           </a>
    //           // </Link>
    //         ))}
    //         <CompareProduct
    //           compareopen={compareopen}
    //           handleCompareClose={handleCompareClose}
    //           currentProduct={currentProduct}
    //           compareProduct={item}
    //         />
    //       </>
    //     ))}
    //   </div>
    //   <Swiper
    //     slidesPerView={2}
    //     spaceBetween={5}
    //     slidesPerGroup={2}
    //     autoplay={{ delay: 8000 }}
    //     loop={true}
    //     loopFillGroupWithBlank={true}
    //     navigation={true}
    //     className={styles.MobileSlider}
    //     modules={[Autoplay, Navigation]}
    //   >
    //     {products &&
    //       products.map((product, index) => (
    //         <SwiperSlide key={index}>
    //           <Link passHref={true} scroll={true} href="/" key={index}>
    //             <a>
    //               <div className={styles.ProductListBox}>
    //                 {/* <div className={styles.Title}>{product.title}</div> */}
    //                 <Row>
    //                   <Col className={styles.productimage}>
    //                     <Image
    //                       src={product.image}
    //                       alt=""
    //                       className={styles.logoImage}
    //                     />
    //                   </Col>
    //                 </Row>
    //                 <div className={styles.Box}>
    //                   <div className={styles.Name}>{product.name}</div>
    //                 </div>
    //               </div>
    //             </a>
    //           </Link>
    //         </SwiperSlide>
    //       ))}
    //   </Swiper>
    //   {/* <CompareProduct
    //     compareopen={compareopen}
    //     handleCompareClose={handleCompareClose}
    //     currentProduct={currentProduct}
    //     // CompareProduct={}
    //   /> */}
    // </div>
  );
};

export default RecommendedProducts;
