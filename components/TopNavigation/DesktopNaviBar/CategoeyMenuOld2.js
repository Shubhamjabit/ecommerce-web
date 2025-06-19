import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { SlideDown } from "react-slidedown";
import Nav from "react-bootstrap/Nav";
import "react-slidedown/lib/slidedown.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import Link from "next/link";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CategoryItem from "../../shared/CategoryList/CategoryItem";
import Image from "react-bootstrap/Image";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CableIcon from "@mui/icons-material/Cable";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { dividerClasses } from "@mui/material";
import { endPoint, envUrl } from "../../../utils/factory";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CheckIcon from "@mui/icons-material/Check";
import { Bars } from "react-loader-spinner";
import { Empty } from "antd";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function CategoeyMenu({ styles, handleOpenMenu, handleCloseMenu, navi }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [supersubcategory, setSupersubcategory] = React.useState([]);
  const [submenu, setSubMenu] = React.useState([]);
  const [categoryid, setCategoryID] = React.useState(null);
  const [closemenu, setCloseMenu] = React.useState(false);
  const [submenuid, setSubMenuId] = React.useState(null);
  const [menutextshow, setMenuTextShow] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState(false);
  const [subcategory, setSubCategory] = React.useState([]);
  const [filterid, setFilterID] = React.useState([]);
  const [tempsubmenu, setTempSubMenu] = React.useState([]);
  const [categoryname, setCategoryname] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //setSupersubcategory([]);
  };
  const handleRemoveCategory = () => {
    setSupersubcategory([]);
  };

  // const handleClickSubcate = async (item) => {
  //   setSubMenu(null);

  //   const variables = {
  //     filter_id: item,
  //   };
  //   const response = await fetch(
  //     `${envUrl.baseUrl}${endPoint.subCategoryByFilter}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(variables),
  //     }
  //   );
  //   const res = await response.json();
  //   setSubMenu(res.data.subcategoryData);
  //   // setSubCategory(submenu && submenu.filter((i) => i.id === item));
  // };

  const handleClickSubcate = async () => {
    setSubMenu(null);

    const variables = {
      filter_id: filterid,
    };
    const response = await fetch(
      `${envUrl.baseUrl}${endPoint.subCategoryByFilter}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      }
    );
    const res = await response.json();
    setSubMenu(res.data.subcategoryData);
    // setSubCategory(submenu && submenu.filter((i) => i.id === item));
  };

  useEffect(() => {
    if (filterid.length > 0) {
      handleClickSubcate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterid]);

  useEffect(() => {
    if (filterid.length === 0) {
      setSubMenu(tempsubmenu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterid]);

  const handleAddCategory = (item) => {
    setValue(0);
    const catedata = item && item.sort((a, b) => a.priority - b.priority);
    setSupersubcategory(
      catedata && catedata[0] && catedata[0].sub_sub_categories
    );
  };

  const handleClickSubcatemenu = (item, event) => {
    // console.log(
    //   "########handleClickSubcatemenu######### checked",
    //   event.target.checked
    // );

    // setSubMenu(item.related_category);
    if (event.target.checked) {
      const filterID = { id: item.id };
      setFilterID([...filterid, filterID]);
    } else {
      const filterdata = filterid.filter((i) => i.id != item.id);
      setFilterID(filterdata);
    }

    // setValue(0);
    // const catedata = item && item.sort((a, b) => a.priority - b.priority);
    // setSupersubcategory(
    //   catedata && catedata[0] && catedata[0].sub_sub_categories
    // );
  };

  const OpenSubMenu = (Submenu, id, status, filter, catname) => {
    setCategoryname(catname.toLowerCase().replace(/ /g, "-"));
    setFilterID([]);
    if (filter) {
      //setSubMenuId(Submenu && Submenu[0].parent_id);
      setSubMenuId(filter && filter[0].category_id);
      setSubMenu(Submenu);
      setCategoryID(id);
      setValue(0);
      /*
      // to display all sub cat under cat
      let newFilterArray = [];
      for (let i = 0; i < filter.length; i++) {
        newFilterArray.concat(filter[i].related_category);
      }
      setCategoryFilter(newFilterArray);
      */
      let FilterArray = filter.filter(
        (ele, ind) =>
          ind ===
          filter.findIndex((elem) => elem.id === ele.id && elem.id === ele.id)
      );
      // console.log("^^^^^^^^^^^ FilterArray", FilterArray);
      setCategoryFilter(FilterArray);

      handleOpenMenu();
      const catedata =
        Submenu && Submenu.sort((a, b) => a.priority - b.priority);
      setSupersubcategory(
        catedata && catedata[0] && catedata[0].sub_sub_categories
      );
      // handleClickSubcate(filter[0].id);

      // code to display all sub cat in cat on click
      let allSubCatArray = [];
      for (let i = 0; i < filter.length; i++) {
        if (filter[i].related_category) {
          allSubCatArray = allSubCatArray.concat(filter[i].related_category);
        }
      }
      const unique = [];
      for (const item of allSubCatArray) {
        const isDuplicate = unique.find((obj) => obj.name === item.name);
        if (!isDuplicate) {
          unique.push(item);
        }
      }

      // setSubMenu(allSubCatArray);
      // setTempSubMenu(allSubCatArray);
      setSubMenu(unique);
      setTempSubMenu(unique);

      // setSubMenu(filter[0].related_category);
      // setTempSubMenu(filter[0].related_category);

      // console.log("^^^^^^^^^^^^^^^2222 SubMenue", submenu);
      // console.log("^^^^^^^^^^^^^^^3333 TempSubMenue", tempsubmenu);
      // console.log("^^^^^^^^^^^^^^^4444 allSubCatArray", allSubCatArray);
      if (!categoryid) {
        setCloseMenu(status);
      } else if (categoryid !== id) {
        setCloseMenu(true);
      } else {
        setCloseMenu(status);
      }
    } else {
      setCloseMenu(false);
      handleCloseMenu();
      setCategoryID(null);
      setSubMenuId(null);
    }
  };

  useEffect(() => {
    setCategoryID(null);
    setSubMenuId(null);
    setCloseMenu(false);
    setIsOpen(false);
    handleCloseMenu();
    setFilterID([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  // handle bug - initial slide down
  useEffect(() => {
    setIsOpen(false);
  }, []);
  const handleCategoryLink = (name) => {
    router.push(`/` + `${name}`);
  };
  // console.log("^^^^^^^^^^^^^ navi =", navi);

  return (
    <div
      className={styles.HeaderCategoriesWra}
      onMouseLeave={() => {
        setCategoryID(null);
        setSubMenuId(null);
        setCloseMenu(false);
        setIsOpen(false);
        handleCloseMenu();
        setFilterID([]);
      }}
    >
      <Button
        className={styles.categoriesButton}
        endIcon={<MenuIcon />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Products
      </Button>
      <div className={styles.categoryMenu}>
        <SlideDown closed={!isOpen} in={!isOpen} duration={400}>
          <div className={styles.SideBarDiv}>
            <ul className={styles.sidebarmenu}>
              {navi &&
                navi.length > 0 &&
                navi.map((menu, index) => {
                  return (
                    <>
                      {menu.name.toLowerCase() == "preassembles" ? null : (
                        <li key={index}>
                          <a
                            className={
                              submenuid === menu.id && closemenu
                                ? styles.activecategoryText
                                : styles.categoryText
                            }
                            style={{
                              justifyContent: menutextshow ? "center" : "left",
                            }}
                            //onMouseEnter={() => handleAddCategory(menu.sub_categories)}
                            onClick={() =>
                              OpenSubMenu(
                                menu.sub_categories,
                                menu.id,
                                !closemenu,
                                menu.category_filter,
                                menu.name
                              )
                            }
                          >
                            {!menutextshow && (
                              <span className={styles.categorySpan} key={index}>
                                {menu.name}
                              </span>
                            )}
                          </a>
                        </li>
                      )}
                    </>
                  );
                })}
              {/* {categoryFilter && categoryFilter.length > 0 && closemenu && (
                <div className={styles.dropdownmenu}>
                  <div className={styles.dropdownmenusection}>
                    <Tabs
                      variant="scrollable"
                      scrollButtons="auto"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: "divider" }}
                      className={styles.Tabs}
                    >
                      {categoryFilter.map((filter, index) => (
                        <Tab
                          className={styles.Tab}
                          label={filter.filter_name}
                           onClick={() => handleClickSubcate(filter.id)}
                          onClick={() => handleClickSubcatemenu(filter)}
                          key={index}
                        />
                      ))}
                    </Tabs>
                    <TabPanel className={styles.TabPanel}>
                      {submenu &&
                        submenu
                          .sort((a, b) => a.priority - b.priority)
                          .map((submenu, index) => (
                            <CategoryItem
                              styles={styles}
                              submenu={submenu}
                              key={index}
                            />
                          ))}
                    </TabPanel>
                  </div>
                </div>
              )} */}

              {categoryFilter && categoryFilter.length > 0 && closemenu && (
                <div className={styles.dropdownmenu}>
                  <div className={styles.dropdownmenusection}>
                    <div className={styles.dropdownmenuheader}>
                      <FormGroup
                        aria-label="position"
                        row
                        className={styles.FormGroup}
                      >
                        {categoryFilter.slice(0, 8).map((filter, index) => (
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                className={styles.Checkbox}
                                checkedIcon={<CheckIcon />}
                              />
                            }
                            label={filter.filter_name}
                            labelPlacement="end"
                            onChange={(event) =>
                              handleClickSubcatemenu(filter, event)
                            }
                            key={index}
                            className={
                              filterid.some((i) => i.id === filter.id)
                                ? styles.FormControlActiveCheckbox
                                : styles.FormControlCheckbox
                            }
                          />
                        ))}
                      </FormGroup>
                      <Button
                        onClick={() => handleCategoryLink(categoryname)}
                        variant="text"
                        className={styles.ViewAll}
                      >
                        View All
                      </Button>
                      {/* <Link
                        passHref={true}
                        scroll={true}
                        href={`/${categoryname}`}
                      >
                        <a className={styles.ViewAll}>View All</a>
                      </Link> */}
                    </div>
                    {submenu ? (
                      <TabPanel className={styles.TabPanel}>
                        {submenu &&
                          submenu
                            .sort((a, b) => a.priority - b.priority)
                            .map((submenu, index) => (
                              <CategoryItem
                                styles={styles}
                                submenu={submenu}
                                key={index}
                              />
                            ))}
                      </TabPanel>
                    ) : (
                      <>
                        {submenu === undefined ? (
                          <TabPanel className={styles.TabPanelLoader}>
                            <Empty />
                          </TabPanel>
                        ) : (
                          <TabPanel className={styles.TabPanelLoader}>
                            <Bars
                              height="80"
                              width="80"
                              color="#2595d4"
                              ariaLabel="bars-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          </TabPanel>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </SlideDown>
      </div>
    </div>
  );
}

export default CategoeyMenu;
