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
const LinkSectionForMobile = ({ styles }) => {
  const user = useSelector((state) => state.userReducer.user);
  const matches = useMediaQuery("(max-width:845px)");

  return (
    <Container
      fluid
      // className={!matches ? "container-1300" : null}
    >
      <Row>
        <Col lg={6} md={6} xl={6} xs={6}>
          <div className={styles.axilfooterwidget}>
            <div className={styles.footerLinkDiv}>
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
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/about"
                    className={styles.footerLinks}
                  >
                    About
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/contact"
                    className={styles.footerLinks}
                  >
                    Contact us
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/privacy-policy"
                    className={styles.footerLinks}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/security-policy"
                    className={styles.footerLinks}
                  >
                    Security Policy
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/terms-and-conditions"
                    className={styles.footerLinks}
                  >
                    Website T&C
                  </Link>
                </li>
                <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/warranty-&-return"
                    className={styles.footerLinks}
                  >
                    Warranty & Return
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} xl={4} xs={6}>
          <div className={styles.axilfooterwidget}>
            <h6 className={styles.footerTopic}>Account</h6>
            <div>
              <ul className={styles.footerLink}>
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
                {!user && (
                  <li className={styles.footerContactLink}>
                    <Link
                      passHref={true}
                      scroll={true}
                      href="/register"
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
                    href="/"
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
                    href="/"
                    className={styles.footerLinks}
                  >
                    Edit Address
                  </Link>
                </li> */}
                {/* <li className={styles.footerContactLink}>
                  <Link
                    passHref={true}
                    scroll={true}
                    href="/"
                    className={styles.footerLinks}
                  >
                    Shop
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      {/* social section */}
      {/* <Row>
        <Col lg={6} md={6} xl={2} xs={6}>
          <div className={styles.axilfooterwidget}>
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
      </Row> */}
      <Row className={styles.supportRow}>
        {/* <Col lg={6} md={6} xl={2} xs={6}> */}
        <div className={styles.axilfooterwidget}>
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
        </div>
        <Col lg={6} md={6} xl={2} xs={6}>
          <div className={styles.axilfooterwidget}>
            {/* <h6 className={styles.footerTopic}>Social</h6> */}
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
        {/* </Col> */}
      </Row>
      <Row>
        <div className={styles.axilfooterwidget}>
          <h6 className={styles.footerTopic}>Quick Link</h6>

          <div>
            <ul className={styles.footerLink} style={{ display: "flex" }}>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>Popular Products |</a>
                </Link>
                &nbsp;
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>Videos |</a>
                </Link>
                &nbsp;
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>Downloads |</a>
                </Link>
                &nbsp;
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>FAQ |</a>
                </Link>
                &nbsp;
              </li>
              <li className={styles.footerContactLink}>
                <Link passHref={true} scroll={true} href="/">
                  <a>Testimonials</a>
                </Link>
                &nbsp;
              </li>
            </ul>
          </div>
          {/* <Row>
          <Col lg={6} md={6} xl={2} xs="auto">
            <span className={styles.footerContactLink}>
              <Link passHref={true} scroll={true} href="/">
                <a>Popular Products |</a>
              </Link>
            </span>
          </Col>
          <Col lg={6} md={6} xl={2} xs="auto">
            <span className={styles.footerContactLink}>
              <Link passHref={true} scroll={true} href="/">
                <a>Videos |</a>
              </Link>
            </span>
          </Col>
          <Col lg={6} md={6} xl={2} xs="auto">
            <span className={styles.footerContactLink}>
              <Link passHref={true} scroll={true} href="/">
                <a>Downloads |</a>
              </Link>
            </span>
          </Col>
          <Col lg={6} md={6} xl={2} xs="auto">
            <span className={styles.footerContactLink}>
              <Link passHref={true} scroll={true} href="/">
                <a>FAQ |</a>
              </Link>
            </span>
          </Col>
          <Col lg={6} md={6} xl={2} xs="auto">
            <span className={styles.footerContactLink}>
              <Link passHref={true} scroll={true} href="/">
                <a>Testimonials |</a>
              </Link>
            </span>
          </Col>
        </Row> */}
        </div>
      </Row>
    </Container>
  );
};

export default LinkSectionForMobile;
