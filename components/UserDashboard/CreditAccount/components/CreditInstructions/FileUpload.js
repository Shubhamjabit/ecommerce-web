import React, { useEffect, useRef, useState } from "react";
import styles from "./CreditInstructions.module.scss";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { envUrl, endPoint } from "../../../../../utils/factory";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";
import { decryptData } from "../../../../../services/util/customEncryptDecryprt";
const FileUpload = ({
  files,
  setFiles,
  removeFile,
  setRefreshState,
  setOpen,
  open,
  creditFormJson,
  openTooltip,
  handleClose,
  handleOpen,
}) => {
  const user = useSelector((state) => state.userReducer.user);

  const uploadHandler = async (event) => {
    setOpen(true);
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file]);

    // upload file to server
    const formData = new FormData();
    formData.append("new_file", file);
    formData.append("user_id", user.id);
    formData.append("method", 1);
    console.log("@@@@@", file);
    console.log("!!!!!!!", formData);
    // return;
    const token = decryptData("token");
    await axios
      .post(`${envUrl.baseUrl}${endPoint.uploadCreditMemberForm}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          file.isUploading = false;
          setFiles([...files, file]);
          setTimeout(() => {
            setRefreshState(true);
          }, "1000");
        } else {
          throw new ERROR("Error in File Upload");
          setOpen(false);
        }
      })
      .catch((error) => {
        // inform the user
        console.log("error in Uploading File", error);
        removeFile(file.name);
        setOpen(false);
      });
  };
  return (
    <>
      <Tooltip
        // title={
        //   creditFormJson ? "You have already Filled the Form" : null
        // }
        title="You have already Filled the Form"
        placement="right"
        open={openTooltip}
        onClose={handleClose}
        // onOpen={handleOpen}
        // color="red"
        // key="red"
      >
        <span>
          <Button
            disabled={creditFormJson ? true : false}
            startIcon={<FileUploadIcon />}
            variant="contained"
            sx={{ borderRadius: 28 }}
            // onClick={() => {
            //   handleUpload(PDF_FILE_URL.current);
            // }}
            className={styles.editprofilebutton}
            style={{ "margin-top": "-2%" }}
            component="label"
          >
            {" "}
            Upload Filled Form
            <input
              hidden
              accept="image/*,.pdf"
              type="file"
              onChange={uploadHandler}
            />
          </Button>
        </span>
      </Tooltip>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FileUpload;
