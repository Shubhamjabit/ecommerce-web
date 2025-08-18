import React, { useEffect } from "react";
import { Empty, Row, Tabs } from "antd";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: `Catalogue`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: "2",
    label: `Videos`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Media`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: "4",
    label: `Posts`,
    children: `Content of Tab Pane 3`,
  },
];
const ResourcesUI = ({ cataloguesList }) => {
  const router = useRouter();
  console.log("rrrrrrrr", router);
  // const [value, setValue] = React.useState("1");
  const [value, setValue] = React.useState(router.query.tab);
  console.log("vvvvvvvvvv", value);
  const [cataloguesState, setCataloguesState] = useState(cataloguesList);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`/resources?tab=${newValue}`, undefined, { shallow: true });
    // router.query.tab = newValue;
  };
  const handleClick = () => {
    router.replace("/catalogue2");
  };
  {
    /* <Link href="https://issuu.com/ishaanjabitsoft/docs/creditmemberform_1_"> */
  }
  useEffect(() => {
    setValue(router.query.tab);
  }, [router.query.tab]);
  return (
    <>
      {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
      <Box sx={{ width: "100%", typography: "body1", padding: "0" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Catalogue" value="1" />
              <Tab label="Videos" value="2" />
              <Tab label="Media" value="3" />
              <Tab label="Posts" value="4" />
            </TabList>
          </Box>
          {value == "1" && (
            <TabPanel value={value} style={{ display: "flex", gap: "50px" }}>
              {cataloguesState.length > 0 ? (
                cataloguesState.map((cs, index) => (
                  <Link
                    // href={`${process.env.BRAND_CDN_URL}` + `${cs.file_url}`}
                    href={cs.name.replace(" ", "-").toLowerCase()}
                    key={index}
                  >
                    <a
                      target="_blank"
                      style={{ border: "1px solid black", padding: "10px" }}
                    >
                      <Image
                        src={
                          `${process.env.BRAND_CDN_URL}` +
                          `${cs.cover_image_url}`
                        }
                        height={400}
                        width={300}
                        alt=""
                        // onClick={handleClick}
                      />
                    </a>
                  </Link>
                ))
              ) : (
                <Empty />
              )}
            </TabPanel>
          )}
          {value == "2" && (
            <TabPanel value={value}>
              <Empty />
            </TabPanel>
          )}
          {value == "3" && (
            <TabPanel value={value}>
              <Empty />
            </TabPanel>
          )}
          {value == "4" && (
            <TabPanel value={value}>
              <Empty />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  );
};
export default ResourcesUI;
