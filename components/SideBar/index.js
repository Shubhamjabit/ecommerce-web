/* eslint-disable react/jsx-key */
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import styles from "./Sidebar.module.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CategoryItem from "../shared/CategoryList/CategoryItem";
import Image from "react-bootstrap/Image";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CableIcon from "@mui/icons-material/Cable";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Button, Tooltip } from "antd";
// const navi = [
//   {
//     id: "1",
//     name: "Lugs & Links",
//     publish: 1,
//     priority: 1,
//     icon: <ManageHistoryIcon />,
//     sub_categories: [
//       {
//         id: "77a7d87d-7b1d-8501-1c49-58ff38693b4f",
//         name: "Insulated",
//         cateid: "1",
//         priority: 21,
//         publish: 1,

//         sub_sub_categories: [
//           {
//             id: "2612f194-1a60-952f-70cc-700785b20635",
//             name: "Bootlace / Ferrule Insulated, Single",
//             image: "/images/products/category.png",
//             title: "A01",
//             priority: 32,
//             publish: 1,
//           },
//           {
//             id: "8087b103-9e18-60c3-7692-761dc0770fde",
//             name: "Bootlace / Ferrule Uninsulated, Single",
//             image: "/images/products/image(4).png",
//             title: "A02",
//             priority: 33,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Bootlace / Ferrule Insulated, Twin",
//             image: "/images/products/image(5).png",
//             title: "A03",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(6).png",
//             title: "A05",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(7).png",
//             title: "A06",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/category.png",
//             title: "A07",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(4).png",
//             title: "A08",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(5).png",
//             title: "A09",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(6).png",
//             title: "A10",
//             priority: 31,
//             publish: 1,
//           },
//         ],
//       },
//       {
//         id: "925f7f0b-76f2-4f82-9f68-2ea6a7b9982a",
//         name: "Uninsulated",
//         priority: 22,
//         cateid: "1",
//         publish: 1,
//       },
//       {
//         id: "99d20b9e-5a68-3d0e-0806-c2a809c56edb",
//         name: "Single Cable",
//         priority: 24,
//         cateid: "1",
//         publish: 1,
//       },
//       {
//         id: "b462ee3e-8550-993c-15a9-14aca1990d17",
//         name: "Twin Cable",
//         priority: 23,
//         cateid: "1",
//         publish: 1,
//       },
//       {
//         id: "d9f59d0e-a5de-9684-6b67-7747fbe060c8",
//         name: "Single Grip",
//         priority: 25,
//         cateid: "1",
//         publish: 1,
//       },
//       {
//         id: "d2cc60b1-838c-3fa0-2058-7f740527682b",
//         name: "Double Grip",
//         priority: 26,
//         cateid: "1",
//         publish: 1,
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Plugs & Sockets",
//     publish: 1,
//     priority: 2,
//     icon: <AddLinkIcon />,
//     sub_categories: [
//       {
//         id: "77a7d87d-7b1d-8501-1c49-58ff38693b4f",
//         name: "Insulated",
//         cateid: "2",
//         priority: 21,
//         publish: 1,

//         sub_sub_categories: [
//           {
//             id: "2612f194-1a60-952f-70cc-700785b20635",
//             name: "Bootlace / Ferrule Insulated, Single",
//             image: "/images/products/category.png",
//             title: "A01",
//             priority: 32,
//             publish: 1,
//           },
//           {
//             id: "8087b103-9e18-60c3-7692-761dc0770fde",
//             name: "Bootlace / Ferrule Uninsulated, Single",
//             image: "/images/products/image(4).png",
//             title: "A02",
//             priority: 33,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Bootlace / Ferrule Insulated, Twin",
//             image: "/images/products/image(5).png",
//             title: "A03",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(6).png",
//             title: "A05",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/image(7).png",
//             title: "A06",
//             priority: 31,
//             publish: 1,
//           },
//           {
//             id: "ee595954-8f0c-796b-080e-9e6f6e5c511d",
//             name: "Ring Terminal TPE Insulated",
//             image: "/images/products/category.png",
//             title: "A07",
//             priority: 31,
//             publish: 1,
//           },
//         ],
//       },
//       {
//         id: "925f7f0b-76f2-4f82-9f68-2ea6a7b9982a",
//         name: "Uninsulated",
//         priority: 22,
//         cateid: "2",
//         publish: 1,
//       },
//       {
//         id: "99d20b9e-5a68-3d0e-0806-c2a809c56edb",
//         name: "Single Cable",
//         priority: 24,
//         cateid: "2",
//         publish: 1,
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "Cable Management",
//     publish: 1,
//     priority: 3,
//     icon: <CableIcon />,
//   },
//   {
//     id: "4",
//     name: "Tools",
//     publish: 1,
//     priority: 4,
//     icon: <SettingsInputSvideoIcon />,
//   },
//   {
//     id: "5",
//     name: "Powersure",
//     publish: 1,
//     priority: 5,
//     icon: <ElectricBoltIcon />,
//   },
//   {
//     id: "6",
//     name: "Glands",
//     publish: 1,
//     priority: 6,
//     icon: <AddLinkIcon />,
//   },
//   {
//     id: "7",
//     name: "Terminals",
//     publish: 1,
//     priority: 7,
//     icon: <CableIcon />,
//   },
//   {
//     id: "8",
//     name: "Electromechanics",
//     publish: 1,
//     priority: 8,
//     icon: <SettingsInputSvideoIcon />,
//   },
//   {
//     id: "9",
//     name: "Wires & Cables",
//     publish: 1,
//     priority: 9,
//     icon: <ElectricBoltIcon />,
//   },
//   {
//     id: "10",
//     name: "Semiconductors",
//     publish: 1,
//     priority: 10,
//     icon: <AddLinkIcon />,
//   },
//   {
//     id: "11",
//     name: "Embedded Solutions",
//     publish: 1,
//     priority: 11,
//     icon: <CableIcon />,
//   },
// ];

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
export const SideBarMenu = ({ handleOpenMenu, handleCloseMenu, navi }) => {
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
    handleOpenMenu();
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
    if (router.asPath.length > 1) {
      //console.log("call collapseSidebar ########", router);
      collapseSidebar();
      setMenuTextShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCategoryID(null);
    setSubMenuId(null);
    setCloseMenu(false);
    handleCloseMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar>
      <div className={styles.SideMenuBar}>
        <div
          className={styles.SideBarDiv}
          onMouseLeave={() => {
            setCategoryID(null);
            setSubMenuId(null);
            setCloseMenu(false);
            handleCloseMenu();
          }}
        >
          <ul className={styles.sidebarmenu}>
            {/* {navi.length > 0 &&
            navi
              .filter((route) => route.publish === 1)
              .map((route, i) => LinkComponent(route, i))} */}
            {navi &&
              navi.length > 0 &&
              navi.map((menu, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <li key={index}>
                    {/* <Link
                    passHref={true}
                    scroll={true}
                    href={`/${menu.name.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <a
                      className={styles.categoryText}
                      onMouseEnter={() =>
                        handleAddCategory(menu.sub_categories)
                      }
                    >
                      {menu.icon}
                      <span
                        className={styles.categorySpan}
                        key={index}
                        //id={index === selectedNav ? styles.open : null}
                      >
                        {menu.name}
                      </span>
                    </a>
                  </Link> */}
                    <Tooltip
                      placement="rightTop"
                      title={menutextshow ? menu.name : ""}
                      color="blue"
                    >
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
                        {/* {menu.icon} */}
                        <ManageHistoryIcon />

                        {!menutextshow && (
                          <span className={styles.categorySpan} key={index}>
                            {menu.name}
                          </span>
                        )}
                      </a>
                    </Tooltip>
                  </li>
                );
              })}
            {submenu &&
              submenu.length > 0 &&
              submenu[0].parent_id === categoryid &&
              closemenu && (
                <div className={styles.dropdownmenu}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
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
                        />
                      ))}
                  </Tabs>
                  <TabPanel className={styles.TabPanel}>
                    {supersubcategory &&
                      supersubcategory
                        .sort((a, b) => a.priority - b.priority)
                        .map((submenu, index) => (
                          <CategoryItem styles={styles} submenu={submenu} />
                        ))}
                  </TabPanel>
                </div>
              )}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};
