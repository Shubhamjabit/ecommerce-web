import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Login.module.scss";
import Link from "next/link";
import { CustomButton } from "../shared/Button";
import { CustomCheckbox } from "../shared/Checkbox";
import { CustomTextField } from "../shared/TextFields";
import { Formik } from "formik";
import { signIn } from "../../services/auth/authService";
import { CustomTextFieldPassword } from "../shared/TextFieldPassword";
import Router from "next/router";
import { useRouter } from "next/router";
import { LoginFormValidation } from "../shared/Forms/Validation/Validation";
import { useAlert } from "react-alert";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { initUser, saveUser } from "../../store/actions/userActions";
export const LoginUI = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("rrrr", router);
  console.log("router", router);
  const user = useSelector((state) => state.userReducer.user);
  const [erroralert, setErrorAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const onSubmit = async (values) => {
    setErrorAlert(false);
    setOpen(true);
    const response = await signIn({
      email: values.email,
      password: values.password,
    });
    if (response && response.state == true) {
      // console.log("&&&&&&&&&&&&&&", response);
      dispatch(saveUser(response.user[0]));
      setOpen(false);
      alert.show(response.message);
      if ("fromReset" in router.query) {
        router.push("/");
      }
      router.back();
    } else {
      //alert.show(response.message);
      setErrorAlert(true);
      setOpen(false);
    }
  };
  // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ444444444444444 USER", user);
  return (
    <>
      <Row className={styles.loginBackgroundColor}>
        <Container>
          <Row>
            <Col sm={3} />
            <Col sm={6} className={styles.parentDiv}>
              {router.query.firstLogin == "" && (
                <div className={styles.firstLoginMessageDiv}>
                  <h4>
                    Congratulations, your account has been created successfully.
                  </h4>
                  <h4 style={{ fontWeight: "normal" }}>Please login!</h4>
                </div>
              )}
              <div className={styles.loginBox}>
                <Container className={styles.innerBoxContainer}>
                  <Row>
                    <Col>
                      <h1 className={styles.boxTopic}>Login</h1>
                    </Col>
                  </Row>

                  <Formik
                    validationSchema={LoginFormValidation}
                    onSubmit={(values) => onSubmit(values)}
                    initialValues={{ terms: false }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      submitCount,
                      isSubmitting,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <div className={styles.formDivRow}>
                          <CustomTextField
                            label="Email address*"
                            classLable="defaultLabel"
                            type="email"
                            name="email"
                            placeholder="Please Enter Email Address"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.email}
                            isInvalid={
                              (submitCount > 0 && errors.email) ||
                              (errors.email && touched.email)
                            }
                          />
                          <Form.Group
                            className={styles.formBottom}
                            controlId="password"
                          >
                            <div className={styles.passwordDiv}>
                              <CustomTextFieldPassword
                                label="Password*"
                                classLable="defaultLabel"
                                name="password"
                                placeholder="Please Enter Password"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.password}
                                isInvalid={
                                  (submitCount > 0 && errors.password) ||
                                  (errors.password && touched.password)
                                }
                              />
                              <span className={styles.eyeIcon}>
                                {/* <i className="fa fa-eye-slash"></i> */}
                              </span>
                              {/* <span className={styles.eyeIcon}><i className="fa fa-eye"></i></span>  //Toggle Password Should apply this Icon*/}
                            </div>
                          </Form.Group>
                        </div>
                        <Row>
                          <Col>
                            {/* <CustomCheckbox
                            id="defaul-1"
                            value="random3"
                            name="example"
                            label="Remember me"
                            // handleClick={handleAPICall} (Include Function That want to do with Button)
                          /> */}
                          </Col>
                          <Col className={styles.colAlignRight}>
                            <Link
                              passHref={true}
                              scroll={true}
                              href="/forgotpassword?stp=1"
                            >
                              <a>
                                <p className={styles.forgotPassword}>
                                  Forgot Password?
                                </p>
                              </a>
                            </Link>
                          </Col>
                        </Row>
                        {erroralert && (
                          <Alert severity="error">
                            Login Details Incorrect. Please try again.
                          </Alert>
                        )}
                        <Row>
                          <Col sm={12} className={styles.loginBtnCol}>
                            <CustomButton
                              buttonType="submit"
                              label="LOGIN"
                              type="defaultBtnDark"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12} className={styles.loginBtnCol}>
                            <p
                              style={{ marginTop: "15px", textAlign: "center" }}
                            >
                              Create a new account{" "}
                              <Link
                                passHref={true}
                                scroll={true}
                                href="/registration"
                              >
                                <a>Sign Up</a>
                              </Link>
                            </p>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
