import React, { Component, useState, useEffect } from "react";
import styles from "./Styles/Home.module.scss";
//import Image from "next/image";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Autoplay, Pagination, Navigation } from "swiper";
function BrandSection() {
  return (
    <div className={styles.BrandSectionLayout}>
      <h2 className={styles.Title}>Find Products by Brand</h2>
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 8000 }}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Advanced-Electronics-Company-new-logo.jpg"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://w7.pngwing.com/pngs/47/955/png-transparent-tvs-electronics-ltd-logo-management-electronics-miscellaneous-blue-electronics.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://logos-world.net/wp-content/uploads/2023/01/A4Tech-Logo.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://etimg.etb2bimg.com/thumb/msid-58635479,width-1200,resizemode-4/.jpg"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://1000logos.net/wp-content/uploads/2017/03/LG-logo.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://res.cloudinary.com/zenbusiness/q_auto/v1/logaster/logaster-2019-02-0126-t-e-city-logo-5.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://assets.bosch.com/media/global/bosch_group/our_figures/brands/bosch-brand-bosch_res_1280x720.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA7hXqp0PmR5zs_uEylTnMos68lRi0TK2S4Q&usqp=CAU"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.ImageSection}>
            <Image
              src="https://swedchamtw.org/wp-content/uploads/2015/10/beijer-electronics-tagline-w-logo-final_cs.png"
              alt="Free delivery"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default BrandSection;
