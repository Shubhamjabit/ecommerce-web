import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./MobileNabiBar.module.scss";
import { LeftBar } from "./LeftBar";
import { RightBar } from "./RightBar";
import { TopBar } from "./TopBar";
import SearchBox from "../DesktopNaviBar/SearchBox";
export const MobileNaviBar = ({ navi, assemblySolutionsList }) => {
  const [MobileSearchPop, setMobileSearchPop] = useState({
    open: false,
    defer: false,
  });
  const [MobileSearchPopclose, setMobileSearchPopclose] = useState({
    open: true,
    defer: true,
  });
  const setMobileSearch = (open, defer) => {
    if (open === true) {
      setMobileSearchPop({
        open: open,
        defer: defer,
      });
      setMobileSearchPopclose({
        open: false,
        defer: false,
      });
    } else {
      setMobileSearchPop({
        open: open,
        defer: defer,
      });
      setMobileSearchPopclose({
        open: true,
        defer: true,
      });
    }
  };
  return (
    <div className={styles.MobileNaviBar}>
      <TopBar
        styles={styles}
        setMobileSearch={setMobileSearch}
        MobileSearchPop={MobileSearchPopclose}
        assemblySolutionsList={assemblySolutionsList}
      />
      {MobileSearchPop.open ? <SearchBox styles={styles} /> : null}
      <Row className={styles.navbar}>
        <LeftBar styles={styles} navi={navi} />
        <RightBar styles={styles} />
      </Row>
    </div>
  );
};
