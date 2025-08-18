// import React, { useState, useEffect } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Menu } from "antd";
// import { useRouter } from "next/router";
// import {
//   MailOutlined,
//   AppstoreOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
// import AddLinkIcon from "@mui/icons-material/AddLink";
// import CableIcon from "@mui/icons-material/Cable";
// import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
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

// export const LeftBar = ({ styles }) => {
//   const [menuvisible, setMenuVisible] = useState(false);
//   const handleMenuVisible = () => {
//     setMenuVisible(!menuvisible);
//   };
//   const router = useRouter();
//   const handleCatfilter = () => {
//     router.push(`/categorypage`);
//   };
//   return (
//     <Col xs={6} md={6} className={styles.LeftSection}>
//       <Button
//         variant="outlined"
//         endIcon={<ExpandMoreIcon />}
//         className={styles.MenuButton}
//         onClick={handleMenuVisible}
//       >
//         Browse Categories
//       </Button>
//       {menuvisible && (
//         <div className={styles.MenuSection}>
//           <Menu
//             defaultSelectedKeys={["1"]}
//             defaultOpenKeys={["sub1"]}
//             mode="inline"
//           >
//             {navi.length > 0 &&
//               navi
//                 .filter((route) => route.publish === 1)
//                 .map((mainmenu, index) => (
//                   <Menu.SubMenu
//                     key={mainmenu.id}
//                     title={mainmenu.name}
//                     icon={mainmenu.icon}
//                   >
//                     {mainmenu.sub_categories &&
//                       mainmenu.sub_categories
//                         .sort((a, b) => a.priority - b.priority)
//                         .map((submenu, index) => (
//                           <Menu.SubMenu
//                             key={submenu.id}
//                             title={submenu.name.split("/").pop()}
//                           >
//                             {submenu.sub_sub_categories &&
//                               submenu.sub_sub_categories
//                                 .sort((a, b) => a.priority - b.priority)
//                                 .map((supersubmenu, index) => (
//                                   <Menu.Item
//                                     key="two"
//                                     onClick={() => handleCatfilter()}
//                                   >
//                                     {supersubmenu.name.split("/").pop()}
//                                   </Menu.Item>
//                                 ))}
//                           </Menu.SubMenu>
//                         ))}
//                   </Menu.SubMenu>
//                 ))}
//           </Menu>
//         </div>
//       )}
//     </Col>
//   );
// };

import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu } from "antd";
import { useRouter } from "next/router";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CableIcon from "@mui/icons-material/Cable";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import styles from "./MobileNabiBar.module.scss";

export const LeftBar = ({ navi }) => {
  // console.log("@@@@@@@------@@@@@@@", navi);
  const [menuvisible, setMenuVisible] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [categoryFilter, setCategoryFilter] = React.useState(false);
  const [categoryid, setCategoryID] = React.useState(null);
  const [closemenu, setCloseMenu] = React.useState(false);
  const [submenuid, setSubMenuId] = React.useState(null);
  const [filterid, setFilterID] = React.useState([]);
  const [tempsubmenu, setTempSubMenu] = React.useState([]);
  const [categoryname, setCategoryname] = React.useState(null);
  const handleMenuVisible = () => {
    setMenuVisible(!menuvisible);
  };
  const router = useRouter();
  // const handleCatfilter = () => {
  //   router.push(`/categorypage`);
  // };

  const handleCatfilter = (name) => {
    router.push(`/` + `${name}`);
  };

  const OpenSubMenu = (filter) => {
    // console.log("@@@@@@@---filter---@@@@@@@", filter);
    let FilterArray = filter.filter(
      (ele, ind) =>
        ind ===
        filter.findIndex((elem) => elem.id === ele.id && elem.id === ele.id)
    );
    setCategoryFilter(FilterArray);
  };

  const handleChangeDropMenu = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setMenuVisible(false);
  }, [router]);

  useEffect(() => {
    if (menuvisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [menuvisible]);
  return (
    <Col xs={6} md={6} className={styles.LeftSection}>
      <Button
        variant="outlined"
        endIcon={<ExpandMoreIcon />}
        className={styles.MenuButton}
        onClick={handleMenuVisible}
      >
        {/* Browse Categories */}
        PRODUCTS
      </Button>
      {menuvisible && (
        <div className={styles.MenuSection}>
          <Menu
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            {navi &&
              navi.length > 0 &&
              navi.map((industries, index) => {
                return (
                  <>
                    <div className="mobile-accordion-parent-div">
                      <Accordion
                        // expanded={expanded === industries.id}
                        // onChange={handleChangeDropMenu(industries.id)}
                        key={index}
                        classes={styles.Accordion}
                        collapsible="disabled"
                        expanded={false}
                        onClick={() =>
                          router.push(`/industry/${industries.name}`)
                        }
                      >
                        <AccordionSummary
                          // expandIcon={<AddIcon />}
                          classes={styles.AccordionSummary}
                        >
                          <Typography>{industries.name}</Typography>
                        </AccordionSummary>

                        {/* <AccordionDetails className={styles.AccordionDetails}>
                        {industries.category_lsit &&
                          industries?.category_lsit?.map((menu, index) => (
                            <>
                              {menu.name.toLowerCase() ==
                              "preassembles" ? null : (
                                <li key={index}>
                                  <a
                                    className={
                                      submenuid === menu.id && closemenu
                                        ? styles.activecategoryText
                                        : styles.categoryText
                                    }
                                    style={{
                                      justifyContent: menutextshow
                                        ? "center"
                                        : "left",
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
                                      <span
                                        className={styles.categorySpan}
                                        key={index}
                                      >
                                        {menu.name}
                                      </span>
                                    )}
                                  </a>
                                </li>
                              )}
                            </>
                          ))}
                      </AccordionDetails> */}
                      </Accordion>
                    </div>
                  </>
                );
              })}
            {/* {navi &&
              navi.length > 0 &&
              navi.map((mainmenu, index) => (
                <Menu.SubMenu
                  key={mainmenu.id}
                  title={mainmenu.name}
                  icon={mainmenu.icon}
                  //onClick={() => OpenSubMenu(mainmenu.category_filter)}
                >
                  {mainmenu.category_filter &&
                    mainmenu.category_filter.map((submenu, index) => (
                      <Menu.SubMenu
                        key={submenu.id}
                        title={submenu.filter_name}
                      >
                        {submenu.related_category &&
                          submenu.related_category.map(
                            (supersubmenu, index) => (
                              <Menu.Item
                                key="two"
                                onClick={() =>
                                  handleCatfilter(
                                    supersubmenu.name
                                      .toLowerCase()
                                      .replace(/ /g, "-")
                                  )
                                }
                              >
                                {supersubmenu.name.split("/").pop()}
                              </Menu.Item>
                            )
                          )}
                      </Menu.SubMenu>
                    ))}

                  {mainmenu.sub_categories &&
                    mainmenu.sub_categories
                      .sort((a, b) => a.priority - b.priority)
                      .map((supersubmenu, index) => (
                        <Menu.Item
                          key="two"
                          onClick={() =>
                            handleCatfilter(
                              supersubmenu.name.toLowerCase().replace(/ /g, "-")
                            )
                          }
                        >
                          {supersubmenu.name.split("/").pop()}
                        </Menu.Item>
                      ))}
                </Menu.SubMenu>
              ))} */}
          </Menu>
        </div>
      )}
    </Col>
  );
};
