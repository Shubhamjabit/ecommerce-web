import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Router from "next/router";
import Nav from "react-bootstrap/Nav";
import SearchDropDown from "../SearchDropDown/SearchDropDown";
import { SearchField } from "../../shared/SearchFields/index";
import { endPoint, envUrl } from "../../../utils/factory";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Import Axios

const SearchBox = ({ onClick, styles, searchQuery }) => {
  const [product, setProduct] = useState(null);
  const [showSearchResults, setSearchResultsVisible] = useState(false);
  const [showSearchBar, setSearchbarVisibility] = useState(false);
  const [keyword, setKeyword] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnMouseLeave = () => {
    setSearchResultsVisible(false);
  };

  const handleOnFocus = () => {
    setSearchResultsVisible(true);
  };

  const handleSearchBarToggle = () => {
    setSearchbarVisibility(!showSearchBar);
  };

  const handleSearchWithEnter = (e) => {
    if (e.key === "Enter") {
      Router.push({
        pathname: "/search-product",
        query: { search: e.target.value },
      });
    }
  };

  const handleOnChange = async (e) => {
    const searchQuery = e.target.value.trim();
    setSearchResultsVisible(true);
    setKeyword(searchQuery);
    setLoading(true);

    if (searchQuery.length > 0) {
      const variables = {
        page: 1,
        pageSize: 4,
        keyword: searchQuery,
      };

      try {
        const response = await axios.post(
          `${envUrl.baseUrl}${endPoint.productSearch}`,
          variables,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setProduct(response.data.product.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResultsVisible(false);
    }
  };

  return (
    <>
      <Row style={{ position: "relative" }}>
        <Nav.Item className={styles.searchBar}>
          <div>
            <SearchField
              handleOnChange={(e) => handleOnChange(e)}
              classLable="defaultLabel"
              type="text"
              actionTag="largeActionText"
              placeholder="Search our Products"
              onFocus={handleOnFocus}
              onKeyUp={handleSearchWithEnter}
              classType="defaultTextBox"
              actionName={<SearchIcon />}
            />
          </div>
          {showSearchResults ? (
            <div
              className={styles.dropdownSearch}
              onMouseLeave={handleOnMouseLeave}
            >
              <SearchDropDown
                product={product}
                loading={loading}
                styles={styles}
                keyword={keyword}
              />
            </div>
          ) : (
            <></>
          )}
        </Nav.Item>
      </Row>
    </>
  );
};

export default SearchBox;
