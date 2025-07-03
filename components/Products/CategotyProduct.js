import React, { useEffect, useState, useMemo } from "react";
import styles from "./Products.module.scss";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import ProductItem from "../shared/Products/ProductItem";
import PaginationUi from "../shared/Pagination/PaginationUi";
import { Button, Spin, message } from "antd";
import { Checkbox, Collapse } from "antd";
import axios from "axios";
import { endPoint, envUrl } from "../../utils/factory";
import NoProduct from "./NoProduct";

const CategotyProduct = ({
  products,
  pageSize,
  page,
  setPage,
  handlePagination,
  total,
}) => {
  const router = useRouter();
  const { index: urlPath, indextwo: subUrlPath } = router.query;
  const paths = router.asPath.replace("/", "").replace(/-/g, " ");
  
  const [filterData, setFilterData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load initial filter data
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${envUrl.baseUrl}${endPoint.getProductFilters}`,
          { paths },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setFilterData(response.data.data || []);
        }
      } catch (error) {
        console.error("API error in getProductFilters:", error);
        message.error("Failed to load filters");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    if (initialLoad) {
      fetchFilters();
    }
  }, [paths, initialLoad]);

  // Handle checkbox changes
  const handleCheckboxChange = (filterName, value, checked) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      const filterKey = `custmFilter${filterName}`;
      
      // If the checkbox is checked
      if (checked) {
        // Add the value to the filter's array
        newFilters[filterKey] = newFilters[filterKey] 
          ? [...newFilters[filterKey].split('+'), value].join('+') 
          : value;
      } else {
        // Remove the value from the filter's array
        const values = newFilters[filterKey]?.split('+') || [];
        const newValues = values.filter(v => v !== value);
        
        if (newValues.length > 0) {
          newFilters[filterKey] = newValues.join('+');
        } else {
          delete newFilters[filterKey]; // Remove the filter if no values are left
        }
      }
      return newFilters;
    });
  };

  // Apply selected filters
  const applyFilters = () => {
    router.replace({
      pathname: `/${urlPath}/${subUrlPath}`,
      query: {
        ...router.query,
        ...selectedFilters,
        page: 1, // Reset to first page when applying new filters
      },
    });
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedFilters({});
    router.replace(`/${urlPath}/${subUrlPath}`);
  };

  // Generate filter UI items
  const filterItems = useMemo(() => 
    filterData.map((f, index) => ({
      key: index,
      label: f.filterName,
      children: f.filter_values.map((fv, i) => 
        fv ? (
          <div className="checkbox" key={i}>
            <Checkbox
              value={fv}
              // Check if the value is included in the selected filters
              checked={selectedFilters[`custmFilter${f.custmFilterNumber}`]?.split('+').includes(fv)}
              onChange={(e) => handleCheckboxChange(
                f.custmFilterNumber, 
                fv, 
                e.target.checked
              )}
            >
              {fv}
            </Checkbox>
          </div>
        ) : null
      ),
    })),
    [filterData, selectedFilters]
  );

  return (
    <Spin spinning={loading}>
      {products && products.length > 0 ? (
        <div className={styles.main_container}>
          <div className={styles.filter_container}>
            <div className={styles.filter_header}>
              <span>Filters</span>
            </div>
            
            <Collapse
              expandIconPosition="right"
              items={filterItems}
              defaultActiveKey={filterData.map((_, i) => i.toString())}
            />

            <div className={styles.clear_button_container}>
            <Button 
                type="text" 
                onClick={applyFilters}
                disabled={loading || Object.keys(selectedFilters).length === 0}
                style={{width:"5rem"}}
              >
                Apply
              </Button>

              <Button 
                type="default"
                onClick={handleReset}
                disabled={loading || Object.keys(selectedFilters).length === 0}
                style={{width:"5rem"}}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className={styles.ProductGrid}>
            {products.map((product, i) => <ProductItem key={i} product={product} />)}
          </div>

          <div className={styles.paginationUI}>
            <PaginationUi
              page={page}
              totalPosts={total}
              handlePagination={handlePagination}
              pageSize={pageSize}
            />
          </div>
        </div>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <NoProduct />
          </Row>
        </Container>
      )}
    </Spin>
  );
};

export default CategotyProduct;
