import React from "react";
import FileItem from "./FileItem";
import axios from "axios";
import { envUrl, endPoint } from "../../../../../utils/factory";
import { decryptData } from "../../../../../services/util/customEncryptDecryprt";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (_name) => {
    const token = decryptData("token");
    axios
      .delete(`${envUrl.baseUrl}${endPoint.uploadCreditMemberForm}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => removeFile(_name))
      .catch((err) => console.error(err));
  };
  return (
    <ul>
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
