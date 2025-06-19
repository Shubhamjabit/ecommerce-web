import React, { useState, useEffect } from "react";
import { CreditDetails } from "./components/CreditDetails/CreditDetails";
import { CreditInstructions } from "./components/CreditInstructions/CreditInstructions";
import { envUrl, endPoint } from "../../../utils/factory";
import { getUser } from "../../../services/dashBoardServices/DashBoardServices";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import styles from "./components/CreditDetails/CreditDetails.module.scss";
import { decryptData } from "../../../services/util/customEncryptDecryprt";
export const CreditAccount = () => {
  const [isCreditIns, setIsCreditIns] = useState(false);
  const [CreditFormsList, setCreditFormsList] = useState(null);
  console.log("CreditFormsList", CreditFormsList);
  const [refreshState, setRefreshState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    getCreditFormsList();
  }, []);
  useEffect(() => {
    if (refreshState) {
      setTimeout(() => {
        getCreditFormsList();
      }, 2000);
    }
  }, [refreshState]);
  useEffect(() => {
    if (CreditFormsList && CreditFormsList.length > 0) {
      setIsCreditIns(true);
    }
  }, [CreditFormsList]);

  const getCreditFormsList = async () => {
    const user = getUser();

    try {
      const variables = {
        email: user.email,
      };
      const token = decryptData("token");
      await axios
        .post(`${envUrl.baseUrl}${endPoint.getCreditFormsList}`, variables, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then(function (response) {
          if (response && response.status == 200) {
            setCreditFormsList(response.data.data);
            setLoading(false);
            setOpen(false);
          } else if ((response.status = 204)) {
            // console.log("EMPTY DATA!");
            // setInitLoading(false);
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error.message);
          // setInitLoading(false);

          return { state: false, message: error.message };
        });
    } catch (error) {
      console.log("error getCreditFormsList:", error.message);
      // setInitLoading(false);
      return { state: false, message: error.message };
    }
  };
  return (
    <div>
      {loading ? (
        <div className={styles.LoaderSection}>
          <Bars
            height="80"
            width="80"
            color="#2595d4"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {isCreditIns ? (
            <CreditInstructions
              CreditFormsList={CreditFormsList}
              isCreditIns={isCreditIns}
              setIsCreditIns={setIsCreditIns}
              setRefreshState={setRefreshState}
              setOpen={setOpen}
              open={open}
            />
          ) : (
            <>
              <CreditDetails
                isCreditIns={isCreditIns}
                setIsCreditIns={setIsCreditIns}
              />
              {/* <CreditDetails
                isCreditIns={isCreditIns}
                setIsCreditIns={setIsCreditIns}
              /> */}
            </>
          )}
        </>
      )}
    </div>
  );
};
