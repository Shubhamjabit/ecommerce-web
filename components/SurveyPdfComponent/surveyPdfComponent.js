import React, { useEffect } from "react";
import { Model } from "survey-core";
import { SurveyPDF } from "survey-pdf";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
// import { json } from "./json";
import { json } from "../../components/CreditForm/json";
import { useSelector } from "react-redux";
import styles from "../UserDashboard/CreditAccount/components/CreditInstructions/CreditInstructions.module.scss";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import { FormOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Row, Col } from "antd";
import { envUrl, endPoint } from "../../utils/factory";
import axios from "axios";
import { decryptData } from "../../services/util/customEncryptDecryprt";

const uploadHandler = async (file, user) => {
  //   setOpen(true);
  //   const file = event.target.files[0];
  //   file.isUploading = true;
  //   setFiles([...files, file]);

  // upload file to server
  const formData = new FormData();
  // const promise1 = Promise.resolve(file);

  // promise1.then((value) => {
  //   console.log("vvvvvvvvvvvv value", value);
  //   // Expected output: 123
  // });
  formData.append("new_file", file);
  formData.append("user_id", user.id);
  formData.append("method", 2);
  console.log("@@@@@", file);
  console.log("!!!!!!!", formData);
  // return;
  const token = decryptData("token");
  await axios
    .post(`${envUrl.baseUrl}${endPoint.uploadCreditMemberForm}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        // file.isUploading = false;
        // setFiles([...files, file]);
        // setTimeout(() => {
        //   setRefreshState(true);
        // }, "1000");
        console.log("rrrrrrrrr", response);
      } else {
        throw new ERROR("Error in File Upload");
        setOpen(false);
      }
    })
    .catch((error) => {
      // inform the user
      console.log("error in Uploading File", error);
      // removeFile(file.name);
      // setOpen(false);
    });
};

function createSurveyPdfModel(surveyModel, user) {
  let pdfWidth =
    !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
  let pdfHeight =
    !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
  let options = {
    commercial: true,
    // matrixRenderAs: "list",
    // htmlRenderAs: "image",
    fontSize: 14,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10,
    },

    format: [pdfWidth, pdfHeight],
  };
  const surveyPDF = new SurveyPDF(json, options);
  if (surveyModel) {
    surveyPDF.data = surveyModel.data;
  }
  console.log("surveyPDF", surveyPDF);
  // surveyPDF.raw().then(function (text) {
  // surveyPDF.raw("dataurlstring").then(function (text) {
  surveyPDF.raw("blob").then(function (blob) {
    // var file = new Blob([text], { type: "application/pdf" });
    // var a = document.createElement("a");
    // a.href = URL.createObjectURL(file);
    // a.download = "surveyThroughString.pdf";
    // a.click();
    // URL.revokeObjectURL(a.href);
    // uploadHandler(file, user);
    uploadHandler(blob, user);
  });
  return surveyPDF;
}

function createSurveyPdfModel2(surveyModel, user) {
  let pdfWidth =
    !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
  let pdfHeight =
    !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
  let options = {
    commercial: true,
    // matrixRenderAs: "list",
    // htmlRenderAs: "image",
    fontSize: 14,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10,
    },

    format: [pdfWidth, pdfHeight],
  };
  const surveyPDF = new SurveyPDF(json, options);
  if (surveyModel) {
    surveyPDF.data = surveyModel.data;
  }
  console.log("surveyPDF", surveyPDF);
  return surveyPDF;
}
function saveSurveyToPdf(filename, surveyModel, user) {
  const savedFile = createSurveyPdfModel(surveyModel, user);
  // if you want to save file in local system of user
  // const savedFile = createSurveyPdfModel(surveyModel, user).save(filename);
  // uploadHandler(savedFile, user);
  console.log("savedFile", savedFile);
}
function saveSurveyToPdf2(filename, surveyModel) {
  // if you want to save file in local system of user
  const savedFile = createSurveyPdfModel2(surveyModel).save(filename);
  // uploadHandler(savedFile, user);
  console.log("savedFile", savedFile);
}
function SurveyPdfComponent() {
  //   const user = useSelector((state) => state.userReducer.user);
  var user;
  var creditFormJson2;
  //   useEffect(() => {
  user = JSON.parse(localStorage.getItem("user"));
  creditFormJson2 = JSON.parse(localStorage.getItem("creditFormJson"));
  //   }, []);

  console.log("user", user);
  console.log("creditFormJson2", creditFormJson2);
  const creditFormJson = useSelector(
    (state) => state.userReducer.creditFormJson
  );
  console.log("creditFormJson", creditFormJson);
  const survey = new Model(json);
  survey.data = creditFormJson2;
  const savePdf = function () {
    saveSurveyToPdf(`${user.email}-creditFormAppliation.pdf`, survey, user);
  };
  const savePdf2 = function () {
    saveSurveyToPdf2(`${user.email}-creditFormAppliation.pdf`, survey);
  };
  const btnStyle = {
    marginLeft: "20px",
    marginTop: "20px",
    marginBottom: "20px",
  };
  return (
    <>
      {/* <button className={"sd-btn"} style={btnStyle} onClick={savePdf}>
        DOWNLOAD FILLED FORM
      </button> */}
      <Button
        startIcon={<FileDownloadIcon />}
        variant="contained"
        sx={{ borderRadius: 28 }}
        onClick={savePdf}
        className={styles.editprofilebutton}
        style={{ "margin-top": "-2%" }}
      >
        {" "}
        DOWNLOAD FILLED E-FORM
      </Button>
      {/* <Button
        startIcon={<FileDownloadIcon />}
        variant="contained"
        sx={{ borderRadius: 28 }}
        onClick={savePdf2}
        className={styles.editprofilebutton}
        style={{ "margin-top": "-2%" }}
      >
        {" "}
        SAVE FILLED E-FORM
      </Button> */}
      {/* <Survey model={survey} /> */}
    </>
  );
}

export default SurveyPdfComponent;
