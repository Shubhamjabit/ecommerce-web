import React from "react";
import { Container, Row, Image } from "react-bootstrap";
import ProductItemHome from "../shared/Products/ProductItemHome";
import styles from "./Styles/Testimonial.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Paper from "@mui/material/Paper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
const Testimonial = ({}) => {
  return (
    <div className={styles.TestimonialList}>
      <Swiper
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
      >
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.touritem}>
            <div className={styles.tourdesc}>
              <Paper elevation={4} style={{ borderRadius: "10px" }}>
                <div className={styles.tourdes}>
                  “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco. “
                </div>
              </Paper>
              <div className={styles.CardContent}>
                <div className={styles.image}>
                  <Image src="/236831.png" alt="" />
                </div>
                <div className={styles.CardFooter}>
                  <div className={styles.designation}>Head Of Idea</div>
                  <div className={styles.name}>James C. Anderson</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
