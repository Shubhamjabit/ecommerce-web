import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { HomePageBanner } from "../components/HomePage/HomePageBanner";
import NewArrivedProducts from "../components/HomePage/NewArrivedProducts";
import Testimonial from "../components/HomePage/Testimonial";
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import SectionOne from "../components/HomePage/SectionOne";
import SectionTwo from "../components/HomePage/SectionTwo";
import SectionThree from "../components/HomePage/SectionThree";
import SectionFour from "../components/HomePage/SectionFour";
import BrandSection from "../components/HomePage/BrandSection";
import CategoriesSliderSection from "../components/HomePage/CategoriesSliderSection";
import { signIn } from "../services/auth/authService";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/actions/userActions";
import axios from "axios";
// import CustomizeProductSection from "../components/HomePage/CustomizeProductSection";
import NewCustomizeProductSection from "../components/HomePage/NewCustomizeProductSection";

function Home({ pageData, productData, categoriesData, userResponse }) {
  // const dispatch = useDispatch();
  console.log("MAin Data:::::::::::", pageData);
  // dispatch(saveUser(userResponse.user[0]));
  return (
    <div>
      <MasterHeader title="Home" isHomePage={true} />
      {pageData && pageData.data && pageData.data.Category && (
        <Layout
          CategoryData={pageData.data.Category}
          industriesList={pageData.data.industriesList}
          assemblySolutionsList={pageData.data.assemblySolutionsList}
        >
          {pageData && pageData.data && pageData.data.mainBanner && (
            <Row>
              <HomePageBanner banner={pageData && pageData.data.mainBanner} />
            </Row>
          )}

          {/* <Container>
            <Row>
              <SectionOne />
            </Row>
          </Container> */}
          {/* <Container>
            <Row>
              <BrandSection />
            </Row>
          </Container> */}
          {/* <Container>
            <Row>
              <SectionTwo />
            </Row>
          </Container> */}
          {/* <Container>
            <Row>
              <SectionThree />
            </Row>
          </Container> */}

          {/* <Container> */}
          {/* <Row> */}
          {/* <CustomizeProductSection /> */}
          <NewCustomizeProductSection />
          {/* </Row> */}
          {/* </Container> */}

          <Container>
            <Row>
              <NewArrivedProducts
                productData={pageData && pageData.data.popularProducts}
              />
            </Row>
          </Container>
          <Container>
            <Row>
              <CategoriesSliderSection
                categoriesData={pageData && pageData.data.categoryList}
              />
            </Row>
          </Container>

          {/* <Container>
            <Row>
              <SectionFour />
            </Row>
          </Container> */}
          {/* <Container>
            <Row>
              <Testimonial />
            </Row>
          </Container> */}
        </Layout>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`${envUrl.baseUrl}${endPoint.HomePageData}`);
  const pageData = await response.json();
  // if (typeof window !== "undefined") {
  // var response2 = await signIn({
  //   email: JSON.parse(localStorage.getItem("user")).email,
  //   password: "Test@123",
  // });
  // var userResponse = await axios.post(
  //   `${envUrl.baseUrl}${endPoint.login}`,
  //   {
  //     email: "testishaan@test.com",
  //     password: "Test@123",
  //   },
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // console.log("rrrrrrrrrrrr userResponse", userResponse);
  // var userResponse = await response2.json();
  // }
  // //Get Our Popular Products
  // const products = await fetch(`${envUrl.baseUrl}${endPoint.products}`);
  // const productData = await products.json();
  // // //Get Our Category
  // const categories = await fetch(`${envUrl.baseUrl}${endPoint.categories}`);
  // const categoriesData = await categories.json();

  return {
    props: {
      pageData,
    },
  };
}

export default Home;
