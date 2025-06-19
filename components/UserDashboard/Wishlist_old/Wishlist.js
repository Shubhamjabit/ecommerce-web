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
  const [mylist, setMyList] = useState([]);
  console.log("myList", mylist);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddtoCard = (product, qty, cableLength) => {
    dispatch(addToCart(product, (qty = 1), (cableLength = 1)));
    // setCartMessage(true);
  };

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

  const deleteFromWishlist = async (productId) => {
    try {
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
  return (
    <div className={styles.wishlist_container}>
      <div className={styles.wishlist_header}>
        <div style={{ fontWeight: 600, fontSize: 20 }}>My Wishlist</div>

        {/* <div className={styles.wishlist_filter}>
          <span>Newest</span>
          <div>
            <img src={"/Group.png"} width={20} height={20} />
          </div>
        </div> */}
      </div>

      <div>
        <div className={styles.wishlist_products}>
          {mylist.filter((item) => item.product_type == 1).length > 0 && (
            <>
              <h4 style={{ marginBottom: 15 }}>Regular Product Wishlist</h4>
              {mylist
                .filter((item) => item.product_type === 1)
                .map((list, index) => {
                  return (
                    <div key={index} className={styles.product_container}>
                      <div className={styles.product_left}>
                        <div className={styles.product_image}>
                          <img
                            src={
                              process.env.PRODUCT_CDN_URL + list?.product_image
                            }
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
                        <Link href={`/${list.slug}`}>
                          <a>
                            <button>
                              <span>Go To Product</span>
                            </button>
                          </a>
                        </Link>

                        <button
                          onClick={() => deleteFromWishlist(list.product_id)}
                        >
                          <span>Remove from Wishlist</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>

        <div>
          {mylist.filter((item) => item.product_type !== 1).length > 0 && (
            <>
              <h4 style={{ marginBottom: 20 }}>Custom Product Wishlist</h4>
              {mylist
                .filter((item) => item.product_type !== 1)
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
                            <div>${list?.product_price?.toFixed(2)}</div>
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

                        <button
                          onClick={() => deleteFromWishlist(list.product_id)}
                        >
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
    </div>
  );
};
