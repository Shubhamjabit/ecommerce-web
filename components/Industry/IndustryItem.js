import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./industry.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Link from "next/link";


const IndustryItem = ({ industry,categories }) => {
  console.log("%%%%industry",industry)
  const router=useRouter()
  function handleClick(){
    router.push({
      pathname:`/industry/${industry.name}`,
    })
  }
  return (
    
      <div className={styles.industry} onClick={handleClick} >
          <div className={styles.image}>
            <img src={process.env.INDUSTRY_CDN_URL + industry.imgUrl} />
          </div>
          <div className={styles.industry_text}>
            <p>{industry.name}</p>
          </div>
      </div>
    
  );
};

export default IndustryItem;
