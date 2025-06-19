import React from "react";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Link from "next/link";
import styles from "./Styles/HomePageBanner.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export const HomePageBanner = (props) => {
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.BANNER_CDN_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <Container
        fluid
        className={`${styles.bgcolor} ${styles.WebBanner}`}
        style={{
          width: "100%",
          height: "auto",
          padding: "0px",
          color: "#FFFFFF",
        }}
      >
        <Swiper
          effect="fade"
          centeredSlides={true}
          autoplay={{
            delay: 13000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className={`${styles.CarouselSwiper}`}
        >
          {props &&
            props.banner &&
            props.banner.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image
                    loader={myLoader}
                    src={`${image.image}`}
                    alt={image.title}
                    className={styles.bannerImageHolder}
                    layout="responsive"
                    quality={100}
                    height={696}
                    width={1920}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Container>
      {/* Mobile Banner */}
      <Container
        fluid
        className={`${styles.bgcolor} ${styles.MobileWebBanner}`}
        style={{
          width: "100%",
          height: "auto",
          padding: "0px",
          color: "#FFFFFF",
        }}
      >
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 13000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true} // Enable navigation arrows
          modules={[Autoplay, Navigation]} // Include Navigation module
          className="CarouselSwiper"
        >
          {props &&
            props.banner &&
            props.banner.map((image, i) => {
              return (
                <>
                  <SwiperSlide key={i}>
                    <Image
                      loader={myLoader}
                      src={`${image.image}`}
                      alt={image.title}
                      className={styles.bannerImageHolder}
                      layout="responsive"
                      quality={100}
                      height={1000}
                      width={1920}
                      key={i}
                    />
                  </SwiperSlide>
                </>
              );
            })}
        </Swiper>
      </Container>
    </>
  );
};

export default HomePageBanner;
