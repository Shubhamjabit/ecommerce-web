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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //setSupersubcategory([]);
  };
  const handleRemoveCategory = () => {
    setSupersubcategory([]);
  };

  const handleClickSubcate = (item) => {
    setSupersubcategory(item);
  };

  const handleAddCategory = (item) => {
    setValue(0);
    const catedata = item && item.sort((a, b) => a.priority - b.priority);
    setSupersubcategory(
      catedata && catedata[0] && catedata[0].sub_sub_categories
    );
  };

  const OpenSubMenu = (Submenu, id, status) => {
    setSubMenuId(Submenu && Submenu[0].parent_id);
    setSubMenu(Submenu);
    setCategoryID(id);
    setValue(0);
    // handleOpenMenu();
    const catedata = Submenu && Submenu.sort((a, b) => a.priority - b.priority);
    setSupersubcategory(
      catedata && catedata[0] && catedata[0].sub_sub_categories
    );
    if (!categoryid) {
      setCloseMenu(status);
    } else if (categoryid !== id) {
      setCloseMenu(true);
    } else {
      setCloseMenu(status);
    }
  };

  useEffect(() => {
    setCategoryID(null);
    setSubMenuId(null);
    setCloseMenu(false);
    setIsOpen(false);
    // handleCloseMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className={styles.HeaderCategoriesWra}>
      <Button
        className={styles.categoriesButton}
        endIcon={<MenuIcon />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Browse categories
      </Button>
      <div className={styles.categoryMenu}>
        <SlideDown closed={!isOpen} in={!isOpen} duration={400}>
          <div
            className={styles.SideBarDiv}
            onMouseLeave={() => {
              setCategoryID(null);
              setSubMenuId(null);
              setCloseMenu(false);
              setIsOpen(false);
              // handleCloseMenu();
            }}
          >
            <ul className={styles.sidebarmenu}>
              {navi &&
                navi.length > 0 &&
                navi.map((menu, index) => {
                  return (
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
                          OpenSubMenu(menu.sub_categories, menu.id, !closemenu)
                        }
                      >
                        {!menutextshow && (
                          <span className={styles.categorySpan} key={index}>
                            {menu.name}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              {submenu &&
                submenu.length > 0 &&
                submenu[0].parent_id === categoryid &&
                closemenu && (
                  <div className={styles.dropdownmenu}>
                    <div className={styles.dropdownmenusection}>
                      <Tabs
                        centered
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: "divider" }}
                        className={styles.Tabs}
                      >
                        {submenu
                          .sort((a, b) => a.priority - b.priority)
                          .map((subMenu, index) => (
                            <Tab
                              className={styles.Tab}
                              label={subMenu.name.split("/").pop()}
                              onClick={() =>
                                handleClickSubcate(subMenu.sub_sub_categories)
                              }
                              key={index}
                            />
                          ))}
                      </Tabs>
                      <TabPanel className={styles.TabPanel}>
                        {supersubcategory &&
                          supersubcategory
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
                )}
            </ul>
          </div>
        </SlideDown>
      </div>
    </div>
  );
}

export default CategoeyMenu;
