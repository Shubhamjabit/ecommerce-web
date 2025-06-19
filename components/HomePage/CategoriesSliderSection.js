import React from "react";
import { Container, Row, Image } from "react-bootstrap";
import ProductItemHome from "../shared/Products/ProductItemHome";
import { Swiper, SwiperSlide } from "swiper/react";
import Paper from "@mui/material/Paper";
import Link from "next/link";
// Import Swiper styles
// import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Grid } from "swiper";
import styles from "./Styles/CategoriesSlider.module.scss";
// import { Grid } from "@mui/material";

const CategoriesSliderSection = ({ categoriesData }) => {
  console.log("!!!!!!!!!!!!! categoriesData", categoriesData);
  return (
    <div className={styles.CatecoriesSection}>
      <div className={styles.TitleName}>
        <p>Our Categories</p>
      </div>

      <div
        className={styles.CategoriesBoxContainer}
        id="Swiper-Slider-Category"
      >
        <Swiper
          autoHeight={true}
          slidesPerView={3}
          spaceBetween={30}
          // spaceBetween={10}
          breakpoints={{
            310: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          // slidesPerView={3}
          // spaceBetween={30}
          slidesPerGroup={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          // loop={true}
          // loopFillGroupWithBlank={true}
          className="mySwiper"
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {categoriesData &&
            categoriesData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.ItemBox}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href={{
                      pathname: `/${item.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`,
                    }}
                  >
                    <a>
                      <Image
                        width={100}
                        height={150}
                        // src="/images/fixed-height.png"
                        src={
                          item && item.image_url
                            ? `${process.env.CATEGORY_CDN_URL}` +
                              `${item && item.image_url}`
                            : "/images/default-product.png"
                        }
                        alt=""
                      />
                      <p>{item && item.name}</p>
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesSliderSection;
