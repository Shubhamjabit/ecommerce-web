import React from "react";
import { Model } from "survey-core";
// import { Survey, ReactSurveyModel } from "survey-react";
import { Survey } from "survey-react-ui";
import { SurveyPDF } from "survey-pdf";
import "survey-core/defaultV2.min.css";
// import "./index.css";
import { json } from "./json";
import { themeJson } from "./theme";
import { saveCreditFormJson } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { envUrl, endPoint } from "../../utils/factory";
import axios from "axios";
import { Button } from "antd";
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
  formData.append("creditFormJson", localStorage.getItem("creditFormjson"));
  formData.append("method", 2);
  // console.log("@@@@@", file);
  // console.log("!!!!!!!", formData);
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
        // console.log("rrrrrrrrr", response);
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
    encryption: { userPassword: "123" },
  };
  const surveyPDF = new SurveyPDF(json, options);
  if (surveyModel) {
    surveyPDF.data = surveyModel.data;
  }
  // console.log("surveyPDF", surveyPDF);
  // surveyPDF.raw().then(function (text) {
  surveyPDF.raw("blob").then(function (blob) {
    // var file = new Blob([text], { type: "application/pdf" });
    // var a = document.createElement("a");
    // a.href = URL.createObjectURL(file);
    // a.download = "surveyThroughString.pdf";
    // a.click();
    // URL.revokeObjectURL(a.href);
    uploadHandler(blob, user);
  });
  // surveyPDF.raw("bloburl").then(function (bloburl) {
  //   var a = document.createElement("a");
  //   a.href = bloburl;
  //   a.download = `${user.email}-CreditMemberForm.pdf`;
  //   a.click();
  // });
  return surveyPDF;
}
function saveSurveyToPdf(filename, surveyModel, user) {
  const savedFile = createSurveyPdfModel(surveyModel, user);
  // if you want to save file in local system of user
  // const savedFile = createSurveyPdfModel(surveyModel, user).save(filename);
  // uploadHandler(savedFile, user);
  // console.log("savedFile", savedFile);
}

function SurveyComponent() {
  const dispatch = useDispatch();
  if (typeof window !== "undefined") {
    var user = JSON.parse(localStorage.getItem("user"));
  }
  const survey = new Model(json);
  // You can delete the line below if you do not use a customized theme
  survey.applyTheme(themeJson);
  survey.onComplete.add((sender, options) => {
    // console.log(JSON.stringify(sender.data, null, 3));
    localStorage.setItem(
      "creditFormJson",
      JSON.stringify(sender.data, null, 3)
    );
    dispatch(saveCreditFormJson(JSON.stringify(sender.data, null, 3)));
    survey.data = JSON.parse(JSON.stringify(sender.data, null, 3));
    saveSurveyToPdf(`${user.email}-creditFormAppliation.pdf`, survey, user);
  });
  const handleTestSubmitClick = () => {
    survey.data = JSON.parse(localStorage.getItem("creditFormjson"));
    saveSurveyToPdf(`${user.email}-creditFormAppliation.pdf`, survey, user);
  };
  return (
    <>
      {/* <Button onClick={handleTestSubmitClick}>Test Submit</Button> */}
      <Survey model={survey} />
    </>
  );
}

export default SurveyComponent;
