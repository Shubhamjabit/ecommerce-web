import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import { Container } from "react-bootstrap";

// Register modules
SwiperCore.use([Autoplay, EffectFade]);

function HomeInnerSlider() {
  const slideImages = [
    {
      url: "/images/banner/Banner-1-(New)-1.jpg",
      caption: "Slide 1",
    },
    {
      url: "/images/banner/Banner-2-(New)-1.jpg",
      caption: "Slide 2",
    },
    {
      url: "/images/banner/Banner-3-(New)-1.jpg",
      caption: "Slide 3",
    },
  ];
  //       const [currentIndex, setCurrentIndex] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }, 3000); // change slide every 3 seconds

  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <Container
      fluid
      style={{
        width: "100%",
        height: "auto",
        padding: "0px",
        color: "#FFFFFF",
      }}
    >
      <div style={{ paddingBottom: "30px" }}>
        <Swiper
          autoplay={{ delay: 3000 }}
          effect="fade"
          speed={2000} // ← Controls fade duration (1s)
          loop={true}
        >
          {slideImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide.url}
                alt={slide.caption}
                style={{ width: "100%", objectFit: "cover" }}
              />
              {/* <div className="caption">{slide.caption}</div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

export default HomeInnerSlider;
