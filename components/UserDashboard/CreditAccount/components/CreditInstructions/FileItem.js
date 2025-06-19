import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/joy/CircularProgress";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <FilePresentIcon />
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <CircularProgress
              varaint="plain"
              onClick={() => deleteFile(file.name)}
            />
          )}
          {!file.isUploading && (
            <DeleteIcon onClick={() => deleteFile(file.name)} />
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
