import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Image,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
//import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
const LinkSection = ({ styles }) => {
  const user = useSelector((state) => state.userReducer.user);
  console.log("uuuuuuuuuuuuuuuuuuu", user);
  const matches = useMediaQuery("(max-width:845px)");
  const router = useRouter();

  const query = router.query;
  // console.log("qqqqqqqqq", query);
  // console.log("qqqqqqqqq2222222", router.pathname);

  const openTabWithoutFocus = () => {
    // if (typeof window !== "undefined") {
    //   // var myWindow = window.open("", "", "width=200,height=100");
    //   window.open("/about").blur();
    //   // window.open(router.pathname).focus();
    // }
    const a = document.createElement("a");
    a.setAttribute("href", "https://www.google.com/");
    a.dispatchEvent(new MouseEvent("click", { ctrlKey: true }));
  };
  // function simulateKeyPress(key) {
  //   const myTag = document.querySelector("#myTag");
  //   console.log("ttttttttttt", myTag);
  //   const event = new KeyboardEvent("keydown", { key: "Ctrl", ctrlKey: true });
  //   myTag.dispatchEvent(event);
  // }
  // const openLink = () => {};
  // useEffect(() => {
  //   simulateKeyPress();
  // }, []);

  return (
    <Container
      fluid
      // className={!matches ? "container-1300" : null}
    >
      <Row>
        <Col lg={6} md={6} xl={6} xs={6}>
          <div className={styles.axilfooterwidget}>
            <div>
              <Image
                src={"/new-logo.png"}
                alt="Logo"
                className={styles.logoImage}
                layout="fixed"
                height={40}
                width={120}
                quality={100}
              />
              <ul className={styles.footerLink}>
                {/* <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/about"
                    className={styles.footerLinks}
                  >
                    <a href="/about" target="_blank">
                      About
                    </a>
                  </Link>
                </li> */}
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/contact"
                    className={styles.footerLinks}
                  >
                    <a target="_blank"> Contact us</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/privacy-policy"
                    className={styles.footerLinks}
                  >
                    <a target="_blank">Privacy Policy</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/security-policy"
                    className={styles.footerLinks}
                  >
                    <a target="_blank">Security Policy</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/terms-and-conditions"
                    className={styles.footerLinks}
                  >
                    <a target="_blank"> Website T&C</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/warranty-&-return"
                    className={styles.footerLinks}
                  >
                    <a target="_blank">Warranty & Return</a>
                  </Link>
                </li>
              </ul>
            </div>
            <Row className={styles.supportRow}>
              <h6 className={styles.footerTopic}>Support</h6>
              <ul className={styles.supportlistitem}>
                <li>
                  <MailOutlined /> sales@sparkywarehouse.com.au
                </li>
                <li>
                  <span>
                    <HomeIcon className={styles.HomeIcon} />
                  </span>
                  57-61 Freight Drive, Somerton VIC 3062 Australia
                </li>
              </ul>
            </Row>
          </div>
        </Col>
        {/* <Col lg={6} md={6} xl={3} xs={6}>
          <div className={styles.axilfooterwidget}>
            <h6 className={styles.footerTopic}>Support</h6>
            <div>
              <p>
                685 Market Street, <br></br>
                Las Vegas, LA 95820, <br></br>
                United States.
              </p>
              <ul className={styles.supportlistitem}>
                <li>
                  <a>
                    <MailOutlined /> example@domain.com
                  </a>
                </li>
                <li>
                  <a>
                    <PhoneOutlined /> (+01) 850-315-5862
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Col> */}
        <Col lg={6} md={6} xl={4} xs={6}>
          <div className={styles.axilfooterwidget}>
            <h6 className={styles.footerTopic}>Account</h6>
            <div>
              <ul className={styles.footerLink}>
                {/* {user && ( */}
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    My account
                  </Link>
                </li>
                {/* )} */}
                {!user && (
                  <li className={styles.footerContactLink}>
                    <Link
                      passHref={true}
                      scroll={true}
                      href="/"
                      className={styles.footerLinks}
                    >
                      Sign up / Register
                    </Link>
                  </li>
                )}
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/cart"
                    className={styles.footerLinks}
                  >
                    Cart
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    My Orders
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    My Quotes
                  </Link>
                </li>
                {/* <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    Pay Invoices
                  </Link>
                </li> */}
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    Repeat Orders
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    Edit Details
                  </Link>
                </li>
                {/* <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    Edit Address
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/dashboard"
                    className={styles.footerLinks}
                  >
                    Shop
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </Col>

        <Col lg={6} md={6} xl={2} xs={6}>
          <div className={styles.axilfooterwidget}>
            <h6 className={styles.footerTopic}>Quick Link</h6>

            <div>
              <ul className={styles.footerLink}>
                <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/">
                    <a>Popular Products</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/resources?tab=1">
                    <a>Catalogue</a>
                  </Link>
                  {/* <Link scroll={true} href="/resources?tab=1">
                    <a>Catalogue</a>
                  </Link> */}
                </li>
                <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/resources?tab=2">
                    <a>Videos</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/resources?tab=3">
                    {/* <a>Downloads</a> */}
                    <a>Media</a>
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/resources?tab=4">
                    {/* <a>FAQ</a> */}
                    <a>Posts</a>
                  </Link>
                </li>
                {/* <li className={styles.footerContactLink}>
                  <Link passHref={true} scroll={true} href="/">
                    <a>Testimonials</a>
                  </Link>
                </li> */}
              </ul>
            </div>
            <h6 className={styles.footerTopic}>Social</h6>
            <ul className={styles.SocialLink}>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>
                    <FacebookIcon />
                  </a>
                </Link>
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>
                    <InstagramIcon />
                  </a>
                </Link>
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>
                    <YouTubeIcon />
                  </a>
                </Link>
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>
                    <LinkedInIcon />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LinkSection;
