import React, { useState } from "react";
import { Select, Space } from "antd";
import { endPoint, envUrl } from "../utils/factory";
import SurveyComponent from "../components/CreditForm/surveyComponent";
const CreditForm = () => {
  //   if (typeof window !== "undefined") {
  return <SurveyComponent />;
  //   }
};

// export async function getServerSideProps(context) {
//   const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);

//   const pageData = await response.json();

//   return {
//     props: {
//       pageData,
//     },
//   };
// }

export default CreditForm;
