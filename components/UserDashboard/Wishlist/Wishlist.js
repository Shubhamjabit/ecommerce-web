import { Container, Row, Col } from "react-bootstrap";
import styles from "./Wishlist.module.scss";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import axios from "axios";
import { envUrl, endPoint } from "../../../utils/factory";
import Image from "react-bootstrap/Image";
import { useRouter } from "next/router";
import Link from "next/link";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
import Select from "@material-ui/core/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import e from "cors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import { addToCart } from "../../../store/actions/cartActions";
import { Bars } from "react-loader-spinner";

const Custom_Image = ({
  product_image_T1,
  product_image_T2,
  product_image_cable,
}) => {
  console.log(
    "ppppppppppppp",
    product_image_T1,
    product_image_T2,
    product_image_cable
  );
  return (
    <div className={styles.Custom_Image}>
      <Image
        // loader={myLoader}
        src={
          product_image_T1 != "null"
            ? `${process.env.PRODUCT_CDN_URL}` + `${product_image_T1}`
            : `/images/leftsockt.png`
        }
        alt="Left Image"
        layout="responsive"
        quality={100}
        height={45}
        width={"30%"}
      />
      <Image
        // loader={myLoader}
        src={`/images/1-Shades.svg`}
        alt="Cable Image"
        layout="responsive"
        quality={100}
        // height={50}
        width={"30%"}
        style={{
          backgroundColor: `${product_image_cable}`,
        }}
      />

      <Image
        // loader={myLoader}
        src={
          product_image_T2 != "null"
            ? `${process.env.PRODUCT_CDN_URL}` + `${product_image_T2}`
            : `/images/rightsoket.png`
        }
        style={
          product_image_T2 != "null" ? { transform: "rotate(180deg)" } : {}
        }
        alt="Right Image"
        layout="responsive"
        quality={100}
        height={45}
        width={"30%"}
      />
    </div>
  );
};

export const Wishlist = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  console.log("lllllll", loading);
  const [mylist, setMyList] = useState(null);
  const [filterValue, setFilterValue] = useState("desc");
  console.log("myList", mylist);
  const dispatch = useDispatch();
  const router = useRouter();

  async function getWishlist(userId) {
    console.log("uuuuuu", userId);
    try {
      const token = decryptData("token");
      console.log("tttttt88888888", token);
      setLoading(true);
      const response = await axios.get(
        `${envUrl.baseUrl}${endPoint.wishlist}/${userId}`,
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );
      console.log("!!get full wishlist", response);
      setMyList(response.data.data);
    } catch (error) {
      console.log("!!error in fetching wishlist for a product", error);
    } finally {
      setLoading(false);
    }
  }

  const goToProduct = (list) => {
    router.push(`/${list.slug}`);
  };

  const deleteFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const token = decryptData("token");
      const response = await axios.post(
        `${envUrl.baseUrl}${endPoint.wishlist}`,
        {
          user_id: user.id,
          product_id: productId,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          params: {
            type: "delete",
          },
        }
      );
      console.log("!!del wishlist", response);
      if (response.data.data.success) {
        getWishlist(user.id);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getWishlist(user.id);
    }
  }, [user]);

  const handleChangeFilter = (e) => {
    console.log("eeeeeeee", e);
    setFilterValue(e.target.value);
  };

  async function sortByKey(array, key, order) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      if (order == "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      } else if (order == "desc") {
        return x < y ? 1 : x > y ? -1 : 0;
      }
    });
  }

  useEffect(async () => {
    // Use setTimeout to update the wishlist on filterchange  to show the loader
    setLoading(true);
    const timeoutId = setTimeout(async () => {
      if (mylist?.length > 0) {
        let filteredWishList = mylist;
        console.log("filterValue", filterValue);
        await sortByKey(filteredWishList, "created_at", filterValue);
        console.log("filteredWishList", filteredWishList);
        setMyList(filteredWishList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [filterValue]);

  const [cartmessage, setCartMessage] = useState(false);

  let vertical = "bottom";
  let horizontal = "right";

  const handleAddtoCard = (list) => {
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@@@@ handleAddtoCard",
      list,
      1,
      list.product_cable_length
    );
    dispatch(addToCart(list, 1, list.product_cable_length));
    deleteFromWishlist(list.id);
    setCartMessage(true);
    //openModal();
  };

  const handleCloseCartMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCartMessage(false);
  };

  return (
    <>
      <div
        className={styles.wishlist_container}
        style={{ padding: "0px !important" }}
      >
        <div className={styles.wishlist_header}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 24,
              lineHeight: "22.54px",
              color: "rgba(96, 96, 96, 1)",
            }}
          >
            Wishlist
          </div>
          <div className={styles.wishlist_filter}>
            {/* <span className={styles.wishlist_heading}>Newest</span>
          <img src={"/Group.png"} width={20} height={20} /> */}
            <Select
              style={{ width: "1000000px" }}
              IconComponent={() => (
                <img src={"/Group.png"} width={20} height={20} />
              )}
              defaultValue={1}
              displayEmpty
              onChange={handleChangeFilter}
              value={filterValue}
            >
              <MenuItem value={"desc"}>Newest</MenuItem>
              <MenuItem value={"asc"}>Oldest</MenuItem>
            </Select>
          </div>
        </div>
        {loading && (
          <div className={styles.LoaderSection}>
            <Bars
              height="80"
              width="80"
              color="#2595d4"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        {mylist && !loading ? (
          <div style={{ padding: "16px" }}>
            {mylist.length == 0 && <Empty />}
            <div className={styles.wishlist_products}>
              {mylist.filter(
                (item) => item.product_type == 1 || item.product_type == 2
              ).length > 0 && (
                <>
                  {/* <h4 style={{ marginBottom: 15 }}>Regular Product Wishlist</h4> */}
                  {mylist
                    .filter(
                      (item) =>
                        item.product_type === 1 || item.product_type === 2
                    )
                    .map((list, index) => {
                      return (
                        <div key={index} className={styles.product_container}>
                          <div className={styles.product_left}>
                            <Link href={`/${list.slug}`}>
                              <a>
                                <div
                                  className={styles.product_image}
                                  // onClick={() => goToProduct(list)}
                                >
                                  <img
                                    src={
                                      process.env.PRODUCT_CDN_URL +
                                      list?.product_media_list[0].path
                                    }
                                  />
                                </div>
                              </a>
                            </Link>

                            <div className={styles.product_details}>
                              <Link href={`/${list.slug}`}>
                                <a>
                                  <div
                                    // onClick={() => goToProduct(list)}
                                    style={{ color: "black" }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "18px",
                                      }}
                                    >
                                      {list.name}{" "}
                                      {list.product_cable_length && (
                                        <span>
                                          ({list.product_cable_length}m)
                                        </span>
                                      )}
                                    </div>
                                    {/* <div>{list.product_category}</div> */}
                                    <div>
                                      {
                                        list.category_hierarchy[0].name.split(
                                          "/"
                                        )[0]
                                      }
                                    </div>
                                  </div>
                                </a>
                              </Link>

                              <div>
                                <div>
                                  $
                                  {parseFloat(
                                    list.product_type == 2
                                      ? (list.cable_pricing_permeter * list.product_cable_length) + list.product_price[0].price
                                      : list.product_price[0].price
                                  ).toFixed(2)}{" "}
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    ({list.product_price[0].quantity}+ pcs)
                                  </span>
                                </div>
                                <div>
                                  Item added on{" "}
                                  {new Date(list.created_at).toLocaleString(
                                    undefined,
                                    { timeZone: "Australia/Sydney" }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.product_right}>
                            {/* <img
                          src={"/images/shopping_cart_image.png"}
                          width={35}
                          height={35}
                        /> */}
                            <img
                              src={"/icons/delete.svg"}
                              width={28}
                              height={28}
                              style={{ marginLeft: "100px", cursor: "pointer" }}
                              onClick={() => deleteFromWishlist(list.id)}
                            />
                            {/* <Link href={`/${list.slug}`}> */}
                            {/* <a> */}
                            <button
                              className={styles.AddCartButton}
                              onClick={() => handleAddtoCard(list)}
                            >
                              <span className={styles.AddCart}>
                                Add to Cart{" "}
                                <img
                                  src="/icons/shopping_cart.svg"
                                  // width={32}
                                  // height={32}
                                />
                              </span>
                            </button>
                            {/* </a> */}
                            {/* </Link> */}

                            {/* <button
                          onClick={() => deleteFromWishlist(list.product_id)}
                        >
                          <span>Remove from Wishlist</span>
                        </button> */}
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>

            <div>
              {mylist.filter(
                (item) => item.product_type !== 1 && item.product_type !== 2
              ).length > 0 && (
                <>
                  <h4 style={{ marginBottom: 20 }}>Custom Product Wishlist</h4>
                  {mylist
                    .filter(
                      (item) =>
                        item.product_type !== 1 && item.product_type !== 2
                    )
                    .map((list, index) => {
                      return (
                        <div key={index} className={styles.product_container}>
                          <div className={styles.product_left}>
                            <div className={styles.product_image}>
                              <Custom_Image
                                product_image_T1={list.product_image_T1}
                                product_image_T2={list.product_image_T2}
                                product_image_cable={list.product_image_cable}
                              />
                            </div>

                            <div className={styles.product_details}>
                              <div>
                                <div>{list.product_name}</div>
                                <div>{list.product_category}</div>
                              </div>

                              <div>
                                <div>
                                  ${parseFloat(list.product_price).toFixed(2)}
                                </div>
                                <div>
                                  Item added on{" "}
                                  {new Date(list.created_at).toLocaleString(
                                    undefined,
                                    { timeZone: "Australia/Sydney" }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.product_right}>
                            <Link href="/customized-product">
                              <a>
                                <button>
                                  <span>Go To Product</span>
                                </button>
                              </a>
                            </Link>

                            <button onClick={() => deleteFromWishlist(list.id)}>
                              <span>Remove from Wishlist</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.LoaderSection}>
            <Bars
              height="80"
              width="80"
              color="#2595d4"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={cartmessage}
        autoHideDuration={4000}
        onClose={handleCloseCartMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseCartMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};
