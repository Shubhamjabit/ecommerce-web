import React, { useState } from "react";
import styles from "../Product.module.scss";
import Button from "@mui/material/Button";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ChatWithUs() {
  const [chatMessage, setChatMessage] = useState(false);

  const handleCloseChatMessage = () => {
    setChatMessage(false);
  };
  let vertical = "bottom";
  let horizontal = "right";

  const handleChatButton = () => {
    setChatMessage(true);
  };
  return (
    <>
      <div className={styles.ChatWithUs}>
        <h2>Chat With us</h2>
        <p>
          Need help with product? Chat with our experts for any kind of related
          our products!
        </p>
        <p>
          Chat with our experts for any kind of related our products! Need help
          with product? Chat with our experts for any kind of related our
          products!
        </p>
        <p>Chat with our experts for any kind of related our products!</p>
        <Button
          variant="outlined"
          startIcon={<QuestionAnswerOutlinedIcon />}
          className={styles.ChatNow}
          onClick={handleChatButton}
        >
          Chat Now
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={chatMessage}
        autoHideDuration={4000}
        onClose={handleCloseChatMessage}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseChatMessage}
          severity="info"
          sx={{ width: "100%" }}
        >
          This Service is coming soon!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ChatWithUs;
