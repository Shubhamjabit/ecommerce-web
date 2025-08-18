import { Container, Row, Col, Form } from "react-bootstrap";
import styles from "./ResetPassword.module.scss";
import { CustomButton } from "../../shared/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { CustomTextFieldPassword } from "./../../shared/TextFieldPassword/index";
import { forgotPasswordSubmit } from "../../../services/auth/authService";
import { useAlert } from "react-alert";
import { ResetPasswordValidation } from "./../../shared/Forms/Validation/Validation";
import Router, { useRouter } from "next/router";

export const ResetPassword = (props) => {
  console.log("ResetPassword props", props);
  const router = useRouter();
  console.log("router in resetPassword", router);

  const alert = useAlert();

  const onSubmit = async (values) => {
    // console.log("Router.router.query.em :", Router.router.query.em);
    const response = await forgotPasswordSubmit(
      props?.email?.data,
      values.password,
      router.query.token,
      "RESET_PASSWORD"
    );
    console.log("response in onSubmit PasswordReset", response);
    if (response && response.status === true) {
      alert.show("Password successfully updated.");
      Router.replace("/login?fromReset");
    } else {
      alert.show(response.message);
      Router.replace("/forgotpassword");
    }
  };

  return (
    <Row className={styles.ForgotPasswordBackgroundColor}>
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <div className={styles.forgotPasswordBox}>
              <Container className={styles.innerBoxContainer}>
                <Row>
                  <Col>
                    <h3 className={styles.boxTopic}>
                      Password Reset for {props?.email?.data}
                    </h3>
                  </Col>
                </Row>

                <Formik
                  validationSchema={ResetPasswordValidation}
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
                      <CustomTextFieldPassword
                        label="New password"
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

                      <CustomTextFieldPassword
                        label="Confirm Password*"
                        classLable="defaultLabel"
                        controlId="Confirm-Password"
                        name="passwordConfirmation"
                        placeholder="Set password (8-20 characters)"
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

                      <Row>
                        <Col sm={5} className={styles.loginBtnCol}>
                          <CustomButton label="PROCEED" type="defaultBtnDark" />
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
  );
};
