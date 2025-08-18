import React, { useState, useRef, useEffect } from "react";
// import styles from "../../PreAssembled/Styles/ItemConstomization.module.scss";
import { Input, Select, Space } from "antd";
import { Container } from "react-bootstrap";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Grid, Tooltip } from "@mui/material";
import Link from "next/link";
import { endPoint, envUrl } from "../../../utils/factory";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CustomizePreassembleImg.module.scss";
import {
  setPreassembleCable,
  setPreassembleTerminalT1,
  setPreassembleTerminalT2,
} from "../../../store/actions/preassembleActions";

const ImageAreaForCustPreassemble = ({
  T1,
  T2,
  cable,
  heatSinkImageT1,
  heatSinkImageT1Color,
  heatSinkImageT2,
  heatSinkImageT2Color,
}) => {
  const custPreassembleProductT1FromReducer = useSelector(
    (state) => state.preassemblesReducer.preassembleTerminalT1
  );
  const custPreassembleProductT2FromReducer = useSelector(
    (state) => state.preassemblesReducer.preassembleTerminalT2
  );
  const custPreassembleProducCableFromReducer = useSelector(
    (state) => state.preassemblesReducer.preassembleCable
  );

  //   console.log("%%%%%%%%%%%%%%%%%%11111", custPreassembleProductT1FromReducer);
  //   console.log("%%%%%%%%%%%%%%%%%%2222", custPreassembleProductT2FromReducer);
  //   console.log("%%%%%%%%%%%%%%%%%%333", custPreassembleProducCableFromReducer);

  // const [T1, setT1] = useState();
  // const [T2, setT2] = useState();
  // const [cable, setCable] = useState();

  // useEffect(() => {
  //   var v1 = JSON.parse(localStorage.getItem("preassembleTerminalT1"));
  //   var v2 = JSON.parse(localStorage.getItem("preassembleTerminalT2"));
  //   var v3 = JSON.parse(localStorage.getItem("preassembleCable"));
  //   console.log("%%%%%%%%%%%%%%%%%%11111", v1);
  //   console.log("%%%%%%%%%%%%%%%%%%2222", v2);
  //   console.log("%%%%%%%%%%%%%%%%%%333", v3);
  //   setT1(v1);
  //   setT2(v2);
  //   setCable(v3);
  // }, []);
  console.log("T2 in image areaaaaaaaaaaaaaaaaaaaa", T2);
  return (
    <Grid item xs={12} sm={8} md={8} lg={8} className={styles.ContainerWrapper}>
      <div className={styles.SocketContainer}>
        <div className={styles.CustomizeImageBox}>
          <div className={styles.MainImg}>
            <div className={styles.leftImg}>
              {T1.img_url ? (
                <img
                  src={process.env.PRODUCT_CDN_URL + T1.img_url}
                  alt="img1"
                  // style={{ backgroundColor: "orange" }}
                />
              ) : (
                <img
                  src="/images/leftsockt.png"
                  alt="img1"
                  // style={{ backgroundColor: "orange" }}
                />
              )}
            </div>
            {heatSinkImageT1 ? (
              <div
                className={styles.heatSinkImg}
                style={{
                  // backgroundColor: "transparent",
                  // background: "rgba(0,0,0,0.5)",
                  // visibility: "hidden",
                  // opacity: sixthFilterValue ? "" : "0.2",
                  // backgroundColor: "transparent",
                  width: "85px",
                  // transform: "translate(25px,0px)",
                }}
              >
                {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                {/* <>Heat Shrink </> */}
                <Tooltip title="Heat Shrink">
                  <img
                    // src="/images/heatSink-Bg.svg"
                    // src="/images/Connector (7).svg"
                    src="/images/Connector2.svg"
                    alt="Heat Sink"
                    style={{
                      backgroundColor: heatSinkImageT1Color
                        ? `${heatSinkImageT1Color}`
                        : "",
                    }}
                  />
                </Tooltip>
                {/* <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T1.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValue
                                ? `${sixthFilterValue}`
                                : "",
                            }}
                          />
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T2.svg"
                            alt="Heat Sink"
                            // style={{
                            //   backgroundColor: sixthFilterValue
                            //     ? `${sixthFilterValue}`
                            //     : "",
                            // }}
                          />
                          <img
                            // src="/images/heatSink-Shades.svg"
                            src="/images/T3.svg"
                            alt="Heat Sink"
                            style={{
                              backgroundColor: sixthFilterValue
                                ? `${sixthFilterValue}`
                                : "",
                            }}
                          />
                        </div> */}
              </div>
            ) : null}

            {cable.jacket_colour ? (
              <div className={styles.centerImg}>
                {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                <img
                  src="/images/1-Shades.svg"
                  alt="cable image"
                  style={{
                    backgroundColor: cable.jacket_colour,
                  }}
                />
              </div>
            ) : (
              <div
                className={styles.centerImg}
                style={{ backgroundColor: "orange" }}
              >
                <img
                  src="/images/2-BG.svg"
                  alt="img1"
                  style={{ backgroundColor: "Black", width: "111px" }}
                />
                {/* <img src="/images/1-Shades.svg" alt="cable image" /> */}
              </div>
            )}

            {heatSinkImageT2 ? (
              <div
                className={styles.heatSinkImg2}
                style={{
                  // backgroundColor: "transparent",
                  // background: "rgba(0,0,0,0.5)",
                  // visibility: "hidden",
                  // opacity: heatSinkImageT2 ? "" : "0.2",
                  // backgroundColor: "transparent",
                  width: "85px",
                }}
                // style={{ backgroundColor: "orang" }}
              >
                {/* <img
                        src="/images/2-BG.svg"
                        alt="img1"
                        style={{ backgroundColor: "Black" }}
                      /> */}
                {/* <>Heat Shrink </> */}
                <Tooltip title="Heat Shrink">
                  <img
                    // src="/images/Connector (7).svg"
                    src="/images/Connector2.svg"
                    alt="Heat Sink"
                    style={{
                      backgroundColor: heatSinkImageT2Color
                        ? `${heatSinkImageT2Color}`
                        : "",
                    }}
                  />
                </Tooltip>
              </div>
            ) : null}

            <div className={styles.rightImg}>
              {T2.img_url ? (
                <img
                  src={process.env.PRODUCT_CDN_URL + T2.img_url}
                  alt="img2"
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img src="/images/rightsoket.png" alt="img1" />
              )}
            </div>
          </div>
        </div>
        {/* <div className={styles.BottomActionBox}>
          <div className={styles.ZoomInOutLeftRightButtons}>
            <Space>
              <div className={styles.CircleIconBox}>
                <TurnRightIcon />
              </div>
              <div className={styles.CircleIconBox}>
                <ZoomInIcon />
              </div>
              <div className={styles.CircleIconBox}>
                <ZoomOutIcon />
              </div>
              <div className={styles.CircleIconBox}>
                <TurnLeftIcon />
              </div>
            </Space>
          </div>
        </div> */}
      </div>
    </Grid>
  );
};

export default ImageAreaForCustPreassemble;
