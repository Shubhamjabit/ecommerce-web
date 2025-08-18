import { Container, Row, Col } from "react-bootstrap";
import styles from "./PersonalInformation.module.scss";
import React, { useState, useEffect } from "react";
import {
  getToken,
  getUser,
} from "./../../../services/dashBoardServices/DashBoardServices";
import Image from "next/image";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import moment from "moment";
import { endPoint, envUrl } from "../../../utils/factory";
import axios from "axios";
import { initUser } from "../../../store/actions/userActions";
import { useMediaQuery } from "@mui/material";
import { Co2Sharp } from "@mui/icons-material";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
export const PersonalInformation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [editprofile, setEditProfile] = useState(false);
  const [profileupdate, setProfileUpdate] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [dateofbirth, setDateOfBirth] = useState();
  const [defaultdate, setDefaultDate] = useState();
  const userdata = useSelector((state) => state.userReducer.user);
  const [submitLoading, setSubmitLoading] = useState(false);
  const matches = useMediaQuery("(max-width:851px)");

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setProfileUpdate(false);
    }, [5000]);
  }, [profileupdate]);

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const handleEditProfile = () => {
    setEditProfile(!editprofile);
  };

  form.setFieldsValue({
    fname: user && user.firstName,
    lname: user && user.lastName,
    email: user && user.email,
    phone: user && user.phone_number,
  });
  const onFinish = async (values) => {
    const token = decryptData("token");
    setSubmitLoading(true);
    try {
      const variables = {
        fname: values.fname,
        lname: values.lname,
        phone: values.phone,
        email: values.email,
      };

      // console.log("###########onFinish##############", variables);
      const data = await axios
        .post(`${envUrl.baseUrl}${endPoint.updateUserProfile}`, variables, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then(function (result) {
          if (result) {
            if (result.data.updateProfile === "success") {
              setSubmitLoading(false);
              setProfileUpdate(true);
              setEditProfile(false);
              userdata.firstName = values.fname;
              userdata.lastName = values.lname;
              userdata.phone_number = values.phone;
              localStorage.setItem("user", JSON.stringify(userdata));
              setUser(getUser());
              //dispatch(initUser());
            } else {
              //not deleted
            }
          } else {
            //error
          }
        })
        .catch(function (error) {
          //console.log('@@@@@@@@@@@@@@@result-1', error);
        });
    } catch (error) {
      //console.log('error signIn:', error.message);
      setSubmitLoading(false);
    }
  };

  const onKeyDown = (e) => {
    // preventing e in phone number
    if (e.key == "e") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Row>
        <Col sm={12}>
          <div
            style={{ position: "relative", padding: "5px" }}
            className={styles.Wrapper}
          >
            <h1 className={styles.topic}>Personal Information</h1>
            <hr />
            <div className={styles.divider}></div>

            {matches ? (
              <button
                onClick={handleEditProfile}
                className={styles.editprofilebutton}
              >
                {editprofile ? "Close" : "Edit"}
              </button>
            ) : (
              <button
                onClick={handleEditProfile}
                className={styles.editprofilebutton}
              >
                {editprofile ? "Close" : "Edit Profile"}
              </button>
            )}
            {/* <button
              onClick={handleEditProfile}
              className={styles.editprofilebutton}
            >
              {editprofile ? "Close" : "Edit Profile"}
            </button> */}
          </div>
          <div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                fname: user && user.firstName ? user.firstName : null,
                lname: user && user.lastName ? user.lastName : null,
                email: user && user.email ? user.email : null,
                phone: user && user.phone_number,
              }}
              onFinish={(values) => onFinish(values)}
              className={styles.PersonalInformation}
            >
              <Row>
                <Col sm={6}>
                  <Form.Item
                    label="First Name"
                    name="fname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className={
                        editprofile ? styles.InputBox : styles.InputBoxdisabled
                      }
                      disabled={editprofile ? false : true}
                      value={user && user.firstName}
                    />
                  </Form.Item>
                </Col>
                <Col sm={6}>
                  <Form.Item
                    label="Last Name"
                    name="lname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className={
                        editprofile ? styles.InputBox : styles.InputBoxdisabled
                      }
                      disabled={editprofile ? false : true}
                      value={user && user.lastName}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Form.Item label="Email address" name="email" disabled>
                    <Input
                      disabled
                      className={styles.InputBoxdisabled}
                      value={user && user.email}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Item
                    type="number"
                    label="Contact Number"
                    name="phone"
                    rules={[
                      // {
                      //   required: true,
                      //   message: "Please input your contact number!",
                      // },
                      {
                        max: 13,
                        message: "Value should be less than 13 character",
                      },
                      {
                        required: true,
                        // type: "regexp",
                        pattern: new RegExp(
                          /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/
                        ),
                        message: "Invalid Phone Number",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      className={
                        editprofile ? styles.InputBox : styles.InputBoxdisabled
                      }
                      disabled={editprofile ? false : true}
                      value={user && user.phone_number}
                      onKeyDown={onKeyDown}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {editprofile && (
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 16,
                  }}
                >
                  <Button
                    className={styles.updateprofilebutton}
                    type="primary"
                    htmlType="submit"
                    loading={submitLoading}
                  >
                    Update
                  </Button>
                </Form.Item>
              )}
            </Form>

            {profileupdate && (
              <Alert severity="success">
                Your Personal Information have been updated successfully.
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
