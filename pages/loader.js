/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import { MasterHeader } from "../components/MasterHeader";
import Router, { useRouter } from "next/router";
import { endPoint, envUrl } from "../utils/factory";
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { EmailVerify } from "../components/ForgotPassword/ForgotPasswordEmailVerify";
import Loader from "../components/Loader/loader";
function ForgotPassword() {
  return (
    <div>
      <Loader />
    </div>
  );
}

export default ForgotPassword;
