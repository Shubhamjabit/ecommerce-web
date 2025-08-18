import React, { useState, useEffect } from "react";
import styles from "./CreateAccount.module.scss";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { CustomButton } from "../shared/Button";
import { CustomCheckbox } from "../shared/Checkbox";
import Link from "next/link";
import { CustomTextField } from "../shared/TextFields";
import { CustomTextFieldMobile } from "../shared/TextFieldMobile";
import { CustomTextFieldPassword } from "../shared/TextFieldPassword";
import { Formik, Field } from "formik";
import Router, { useRouter } from "next/router";
import { signUp } from "../../services/auth/authService";
import { createAccountFormValidation } from "../shared/Forms/Validation/Validation";
import { useAlert } from "react-alert";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomTextSetector } from "../shared/Selector";
import { CustomTextArea } from "../shared/TextArea/index";
import { stateTypes, segmentTypes, industryTypes } from "../../data/Data";
export const CreateAccount = (props) => {
  const router = useRouter();
  const [erroralert, setErrorAlert] = useState(false);
  const [sucessalert, setSucessAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const onSubmit = async (values) => {
    setErrorAlert(false);
    setSucessAlert(false);
    setOpen(true);

    const response = await signUp({
      email: values.email,
      password: values.password,
      phone: values.phone,
      firstName: values.firstName,
      lastName: values.lastName,
      state: values.state,
      companyName: values.companyName,
      companyabn: values.companyabn,
      segment: values.segment,
      industry: values.industry,
      description: values.description,
    });
    if (response && response.state === true) {
      setSucessAlert(true);
      setOpen(false);
      router.push("/login?firstLogin");
      //alert.show("Account successfully created.");
      //Router.replace("/login");
    } else {
      setErrorAlert(true);
      setOpen(false);
      //alert.show(response.message);
    }
  };

  // const handleOnKeyDown = (e) => {
  //   console.log("eeeeeeeeeee", e);
  //   // preventing e in phone number
  //   if (e.key == "e") {
  //     e.preventDefault();
  //   }
  // };

  return (
    <>
      <Row className={styles.createAccountContainer}>
        <Container>
          <Row className={styles.createAccountRow}>
            <Col
              sm={{ span: 6, offset: 3 }}
              className={styles.createAccountDiv}
            >
              <Row>
                <Col>
                  <h1 className={styles.createAccountTitle}>Create Account</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    validationSchema={createAccountFormValidation}
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
                      handleOnKeyDown,
                    }) => (
                      <Form
                        noValidate
                        onSubmit={handleSubmit}
                        loading={isSubmitting}
                      >
                        <Row>
                          <Col>
                            <div className={styles.formBottom}>
                              <CustomTextField
                                label="First Name*"
                                classLable="defaultLabel"
                                controlId="firstName"
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.firstName}
                                isInvalid={
                                  (errors.firstName && touched.firstName) ||
                                  (submitCount > 0 && !!errors.firstName)
                                }
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className={styles.formBottom}>
                              <CustomTextField
                                label="Last Name*"
                                classLable="defaultLabel"
                                controlId="lastName"
                                type="text"
                                name="lastName"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.lastName}
                                isInvalid={
                                  (errors.lastName && touched.lastName) ||
                                  (submitCount > 0 && !!errors.lastName)
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className={styles.formBottom}>
                          <CustomTextField
                            label="Email address*"
                            classLable="defaultLabel"
                            controlId="registerEmail"
                            type="email"
                            name="email"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={(e) => {
                              handleBlur(e);
                            }}
                            errorMessage={errors.email}
                            isInvalid={
                              (errors.email && touched.email) ||
                              (submitCount > 0 && !!errors.email)
                            }
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextField
                            label="Confirm email address*"
                            classLable="defaultLabel"
                            controlId="emailConfirmation"
                            type="email"
                            name="emailConfirmation"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.emailConfirmation}
                            isInvalid={
                              (errors.emailConfirmation &&
                                touched.emailConfirmation) ||
                              (submitCount > 0 && !!errors.emailConfirmation)
                            }
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextFieldMobile
                            label="Phone Number*"
                            classLable="defaultLabel"
                            controlId="phoneNumber"
                            type="text"
                            // type="number"
                            // type="tel"
                            name="phone"
                            ImageSrc="/icons/flag.png"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.phone}
                            isInvalid={
                              (errors.phone && touched.phone) ||
                              (submitCount > 0 && !!errors.phone)
                            }
                            onKeyDown={handleOnKeyDown}
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextSetector
                            onChange={handleChange}
                            value={values.state}
                            isInvalid={
                              (errors.state && touched.state) ||
                              (submitCount > 0 && !!errors.state)
                            }
                            errors={errors.state}
                            options={stateTypes}
                            label={"State*"}
                            id={"state"}
                            onBlur={handleBlur}
                          />
                        </div>
                        <Row>
                          <Col>
                            <div className={styles.formBottom}>
                              <CustomTextField
                                label="Company Name*"
                                classLable="defaultLabel"
                                controlId="companyName"
                                type="text"
                                name="companyName"
                                value={values.companyName}
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.companyName}
                                isInvalid={
                                  (errors.companyName && touched.companyName) ||
                                  (submitCount > 0 && !!errors.companyName)
                                }
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className={styles.formBottom}>
                              <CustomTextField
                                label="Company ABN"
                                classLable="defaultLabel"
                                controlId="companyabn"
                                type="text"
                                name="companyabn"
                                classType="defaultTextBox"
                                handleOnChange={handleChange}
                                onBlur={handleBlur}
                                errorMessage={errors.companyabn}
                                isInvalid={
                                  (errors.companyabn && touched.companyabn) ||
                                  (submitCount > 0 && !!errors.companyabn)
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className={styles.formBottom}>
                          <CustomTextSetector
                            onChange={handleChange}
                            value={values.segment}
                            isInvalid={
                              (errors.segment && touched.segment) ||
                              (submitCount > 0 && !!errors.segment)
                            }
                            errors={errors.segment}
                            options={segmentTypes}
                            label={"Customer Segment"}
                            id={"segment"}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextSetector
                            onChange={handleChange}
                            value={values.industry}
                            isInvalid={
                              (errors.industry && touched.industry) ||
                              (submitCount > 0 && !!errors.industry)
                            }
                            errors={errors.industry}
                            options={industryTypes}
                            label={"Industry"}
                            id={"industry"}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextArea
                            label="Description"
                            classLable="defaultLabel"
                            controlId="description"
                            type="text"
                            name="description"
                            value={values.description}
                            onBlur={handleBlur}
                            rows={4}
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            errorMessage={errors.description}
                            isInvalid={
                              (errors.description && touched.description) ||
                              (submitCount > 0 && !!errors.description)
                            }
                          />
                        </div>
                        <div className={styles.formBottom}>
                          <CustomTextFieldPassword
                            label="Password*"
                            classLable="defaultLabel"
                            controlId="password"
                            name="password"
                            placeholder="Set password (8-20 characters)"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.password}
                            isInvalid={
                              (errors.password && touched.password) ||
                              (submitCount > 0 && !!errors.password)
                            }
                          />
                        </div>

                        <div className={styles.formBottom}>
                          <CustomTextFieldPassword
                            label="Confirm Password*"
                            classLable="defaultLabel"
                            controlId="Confirm-Password"
                            name="passwordConfirmation"
                            placeholder="Re-enter password here"
                            classType="defaultTextBox"
                            handleOnChange={handleChange}
                            onBlur={handleBlur}
                            errorMessage={errors.passwordConfirmation}
                            isInvalid={
                              (errors.passwordConfirmation &&
                                touched.passwordConfirmation) ||
                              (submitCount > 0 && !!errors.passwordConfirmation)
                            }
                          />
                        </div>
                        <Row className={styles.checkBoxBottom}>
                          <Col>
                            <CustomCheckbox
                              id="terms"
                              controlId="terms"
                              name="terms"
                              label="I accept the"
                              link="/terms-and-conditions"
                              linkText="Terms and Conditions"
                              handleOnChange={handleChange}
                              onBlur={handleBlur}
                              errorMessage={errors.terms}
                              isInvalid={
                                (errors.terms && touched.terms) ||
                                (submitCount > 0 && !!errors.terms)
                              }
                            />
                          </Col>
                        </Row>
                        <Row className={styles.checkBoxBottom}>
                          <Col>
                            <CustomCheckbox
                              id="subscribe"
                              controlId="subscribe"
                              name="subscribe"
                              label="Sign up for our new collections and promotions"
                              handleOnChange={handleChange}
                              onBlur={handleBlur}
                              errorMessage={errors.subscribe}
                            />
                          </Col>
                        </Row>
                        {sucessalert && (
                          <Alert severity="success">
                            Congratulations, your account has been successfully
                            created.
                          </Alert>
                        )}
                        {erroralert && (
                          <Alert severity="error">
                            User Already Exist. Please try another email.
                          </Alert>
                        )}
                        <Row className={styles.btnRowTop}>
                          <Col sm={12}>
                            <CustomButton
                              className={styles.CustomButton}
                              buttonType="submit"
                              label="Create Account"
                              type="defaultBtnDark"
                            />
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
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
