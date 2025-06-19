import React from "react";
// import styles from "../Products/Products.module.scss";
import styles from './industry.module.scss';
import { Container, Row, Col, Button } from "react-bootstrap";
import IndustryItem from "./IndustryItem";



const Industry = ({ industriesList }) => {
  // console.log("%%%%%%%5categoriesList",categoriesList);
  const IndustriesGrid = () =>
    industriesList &&
    industriesList.map((industry, i) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <IndustryItem key={i} industry={industry}   />
      );
    });
  return (
    <>
      {industriesList && industriesList.length > 0 ? (
        <>
          <div className={styles.industryGrid}>
            <IndustriesGrid />
          </div>
          {/* <div className={styles.paginationUI}>
          <PaginationUi
            page={page}
            totalPosts={total}
            handlePagination={handlePagination}
            pageSize={pageSize}
          />
        </div> */}
        </>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>No Industries</h2>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Industry;
