import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductItemHome from "../shared/Products/ProductItemHome";
import styles from "./Styles/NewArrivedProducts.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
const BestSellingProducts = ({}) => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <Container fluid>
      <div className={styles.HomeProductList}>
        <div className="col">
          <div className="justify-content-md-center">
            <h2 className={styles.HomeProductListTitle}>
              Our Best Selling Products
            </h2>
          </div>
        </div>
        <div className={styles.ProductGrid}>
          {data &&
            // eslint-disable-next-line react/jsx-key
            data.map((submenu, index) => <ProductItemHome styles={styles} />)}
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
          {data &&
            // eslint-disable-next-line react/jsx-key
            data.map((submenu, index) => (
              // eslint-disable-next-line react/jsx-key
              <SwiperSlide>
                <ProductItemHome styles={styles} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default BestSellingProducts;
