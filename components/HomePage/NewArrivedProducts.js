import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ProductItemHome from "../shared/Products/ProductItemHome";
import styles from "./Styles/NewArrivedProducts.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const NewArrivedProducts = ({ productData }) => {
  const [showAll, setShowAll] = useState(false);

  // Calculate the number of items to display initially (2 rows)
  const itemsPerRow = 5; // Assuming 5 items per row
  const initialDisplayCount = itemsPerRow * 2;

  const toggleViewAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className={styles.HomeProductList}>
      <div className="col">
        <div className="justify-content-md-center">
          <h2 className={styles.HomeProductListTitle}>Our Popular Products</h2>
        </div>
      </div>
      <div>
        <div className={styles.ProductGrid}>
          {productData &&
            productData
              .slice(0, showAll ? productData.length : initialDisplayCount)
              .map((productItem, index) => (
                <ProductItemHome
                  styles={styles}
                  productItem={productItem}
                  key={index}
                />
              ))}
        </div>
        <div className={styles.viewAllButtonContainer}>
          <button className={styles.viewAllButton} onClick={toggleViewAll}>
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      </div>

      <Container id="MobileSliderContainer">
        <Swiper
          slidesPerView={2}
          grid={{
            rows: 3,
            fill: "row",
          }}
          spaceBetween={5}
          slidesPerGroup={2}
          autoplay={{ delay: 8000 }}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          className={styles.MobileSlider}
          modules={[Autoplay, Navigation, Grid]}
        >
          {productData &&
            productData.map((productItem, index) => (
              <SwiperSlide key={index}>
                <ProductItemHome styles={styles} productItem={productItem} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default NewArrivedProducts;
