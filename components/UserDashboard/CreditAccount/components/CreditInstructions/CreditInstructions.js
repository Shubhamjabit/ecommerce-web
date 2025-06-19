import React, { useEffect, useRef, useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import styles from "./CreditInstructions.module.scss";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import { FormOutlined } from "@ant-design/icons";
import FormListView from "../FormListView/FormListView";
import { useSelector } from "react-redux";
import CreditPaySection from "../CreditPaySection/CreditPaySection";
import Link from "next/link";
import { Row, Col } from "antd";
import SurveyPdfComponent from "../../../../SurveyPdfComponent/surveyPdfComponent";
import Tooltip from "@mui/material/Tooltip";
export const CreditInstructions = ({
  isCreditIns,
  setIsCreditIns,
  CreditFormsList,
  setRefreshState,
  open,
  setOpen,
}) => {
  const creditFormJson = JSON.parse(localStorage.getItem("creditFormJson"));
  console.log("***** creditFormJson from local", creditFormJson);
  const user = useSelector((state) => state.userReducer.user);
  const PDF_FILE_URL = useRef("");
  const [openTooltip, setOpenTooltip] = useState(false);
  console.log("*****2222 openTooltip ", openTooltip);
  const [files, setFiles] = useState([
    // {
    //   name: "file1",
    // },
    // {
    //   name: "file2",
    // },
    // {
    //   name: "file3",
    // },
  ]);

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name != fileName));
  };

  useEffect(() => {
    PDF_FILE_URL.current = window.location.origin + "/creditMemberForm.pdf";
    setOpenTooltip(creditFormJson ? true : false);
  }, []);

  const handleGoBack = () => {
    setIsCreditIns(!isCreditIns);
  };

  const handleDownload = (url) => {
    const fileName = url.split("/").pop();
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };
  const handleClose = () => {
    setOpenTooltip(false);
  };

  const handleOpen = () => {
    setOpenTooltip(true);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {user.credit_status != 2 && (
          <Grid2 xs={8} md={12}>
            <div style={{ position: "relative" }}>
              <h1 className={styles.topic}>Credit Member Instructions</h1>
              <p>
                Credit Account allows you to pay for orders upto the credit
                limit hassle free which you can pay later
              </p>
              <p>
                1. Please Download and fill the given form (Manual) OR You can
                fill the E-Form
              </p>
              <p>
                2. Please Upload the filled form (Manual) OR After submitting
                the E-Form, please wait for our team to process your application
              </p>
              <p>
                3. Status of your application can be seen below after you upload
                the form OR submitting the E-Form
              </p>
              <hr />
              <div className={styles.divider}></div>
              {!CreditFormsList && (
                <button
                  onClick={handleGoBack}
                  className={styles.editprofilebutton}
                >
                  Go Back
                </button>
              )}
            </div>
          </Grid2>
        )}
        {/* <div className={styles.ButtonSection}> */}
        {(!CreditFormsList || user.credit_status == 3) && (
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={12}>
              <Row>
                <Tooltip
                  title={
                    creditFormJson ? "You have already Filled the Form" : null
                  }
                  // title="You have already Filled the Form"
                  placement="top"
                  open={openTooltip}
                  onClose={handleClose}
                  // onOpen={handleOpen}
                  // color="red"
                  // key="red"
                >
                  <Button
                    disabled={creditFormJson ? true : false}
                    startIcon={<FileDownloadIcon />}
                    variant="contained"
                    sx={{ borderRadius: 28 }}
                    onClick={() => {
                      handleDownload(PDF_FILE_URL.current);
                    }}
                    className={styles.editprofilebutton}
                    style={{ "margin-top": "-2%" }}
                  >
                    {" "}
                    Download Form to fill manually
                  </Button>
                </Tooltip>
              </Row>
              {(!CreditFormsList || user.credit_status == 3) && (
                <Row style={{ paddingTop: "5%" }}>
                  <FileUpload
                    files={files}
                    setFiles={setFiles}
                    removeFile={removeFile}
                    setRefreshState={setRefreshState}
                    setOpen={setOpen}
                    open={open}
                    creditFormJson={creditFormJson}
                    openTooltip={openTooltip}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                  />
                </Row>
              )}
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ paddingLeft: "24%" }}
            >
              <Row>
                <Tooltip
                  title={
                    creditFormJson ? "You have already Filled the Form" : null
                  }
                  // title="You have already Filled the Form"
                  placement="top"
                  open={openTooltip}
                  onClose={handleClose}
                  // onOpen={handleOpen}
                  // color="red"
                  // key="red"
                >
                  <span>
                    <Button
                      disabled={creditFormJson ? true : false}
                      startIcon={<FormOutlined />}
                      variant="contained"
                      sx={{ borderRadius: 28 }}
                      className={styles.editprofilebutton}
                      style={{ "margin-top": "-2%" }}
                    >
                      {" "}
                      <Link href="/creditForm">
                        <a
                          href="/creditForm"
                          target="_blank"
                          style={{ color: "white" }}
                        >
                          Fill E-Form
                        </a>
                      </Link>
                    </Button>
                  </span>
                </Tooltip>
              </Row>
              {/* <Row style={{ paddingTop: "5%" }}>
                <SurveyPdfComponent />
              </Row> */}
            </Col>
            {/* </div> */}
          </Row>
        )}

        {/* <div style={{ paddingTop: "5%" }}> */}
        {user.credit_status == 2 ? (
          <Grid2 xs={8} md={12}>
            <div style={{ position: "relative" }}>
              <h1 className={styles.topic}>Your Credit Information</h1>
              {/* <p>
              Credit Account allows you to pay for orders upto the credit limit
              hassle free which you can pay later
            </p> */}
              {/* <hr /> */}
              <div className={styles.divider}></div>
              {!CreditFormsList && (
                <button
                  onClick={handleGoBack}
                  className={styles.editprofilebutton}
                >
                  Go Back
                </button>
              )}
            </div>
          </Grid2>
        ) : null}
        {user.credit_status == 2 ? (
          <CreditPaySection creditFormsList={CreditFormsList} />
        ) : null}

        {/* </div> */}

        {CreditFormsList && <hr />}
        <Grid2 xs={8} md={12} style={{ paddingTop: "3%" }}>
          <div style={{ position: "relative" }}>
            <h1 className={styles.topic}>Credit Application History</h1>
            {/* <p>
              Credit Account allows you to pay for orders upto the credit limit
              hassle free which you can pay later
            </p> */}

            {/* <div className={styles.divider}></div>
                {!CreditFormsList && (
                  <button
                    onClick={handleGoBack}
                    className={styles.editprofilebutton}
                  >
                    Go Back
                  </button>
                )} */}
          </div>
        </Grid2>

        {/* )} */}
        {CreditFormsList ? (
          <FormListView creditFormsList={CreditFormsList} />
        ) : (
          <>Please refresh once if you have uploaded the form</>
        )}
      </Box>
    </>
  );
};
