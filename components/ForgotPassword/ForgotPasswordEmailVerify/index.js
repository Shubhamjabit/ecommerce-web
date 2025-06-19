import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./ForgotPasswordEmailVerify.module.scss";
import { CustomButton } from "../../shared/Button";
import { CustomTextField } from "../../shared/TextFields";
import { Formik } from "formik";
import * as yup from "yup";
import { forgotPassword } from "../../../services/auth/authService";
import { useAlert } from "react-alert";
import { ResetPassword } from "../PasswordReset";
import { useRouter } from "next/router";

export const EmailVerify = () => {
  const alert = useAlert();
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
  });
  const [step, setStep] = useState(1);
  const onSubmit = async (values) => {
    const response = await forgotPassword(values.email);
    if (response && response.status === true) {
      alert.show(response.msg);
    } else {
      alert.show(response.msg);
    }
  };
  // console.log("query test:", router.query);
  useEffect(() => {
    if (router.query && router.query.stp === "2") {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [router.query]);
  return (
    <>
      {step === 1 ? (
        <Row className={styles.ForgotPasswordBackgroundColor}>
          <Container id="toast-comp-3">
            <Row>
              <Col sm={{ span: 6, offset: 3 }}>
                <div className={styles.forgotPasswordBox}>
                  <Container className={styles.innerBoxContainer}>
                    <Row>
                      <Col sm={7}>
                        <h3 className={styles.boxTopic}>Forgot Password?</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.colDescription}>
                        <p>
                          We will send you a link on your email to reset your
                          password.
                        </p>
                      </Col>
                    </Row>

                    <Formik
                      validationSchema={schema}
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
                              // controlId="registerEmail"
                              type="email"
                              name="email"
                              classType="defaultTextBox"
                              handleOnChange={handleChange}
                              errorMessage={errors.email}
                              isInvalid={submitCount > 0 && !!errors.email}
                            />
                          </div>

                          <Row>
                            <Col sm={5} className={styles.loginBtnCol}>
                              <CustomButton
                                buttonType="submit"
                                label="SEND LINK"
                                type="defaultBtnDark"
                              />
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
      ) : (
        <ResetPassword />
      )}
    </>
  );
};
