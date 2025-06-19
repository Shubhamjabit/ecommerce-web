import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Menu } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
const { SubMenu } = Menu;
export default function SideBarCategory({
  SwipeableDrawerOpen,
  toggleDrawer,
  styles,
  assemblySolutionsList,
}) {
  const router = useRouter();
  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="right"
        width="200px"
        open={SwipeableDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        className={styles.SwipeableDrawer}
      >
        <Menu
          style={{ width: 256 }}
          mode="inline"
          className={styles.Menu}
          disabledOverflow={true}
        >
          {/* <Menu.Item>Pre-assembles</Menu.Item> */}
          {/* <SubMenu
            key="sub1"
            // className={styles.MenuItem}
            // icon={<UnorderedListOutlined />}
            title="Assembly Solutions"
          ></SubMenu> */}
          <Menu.SubMenu title="Assembly Solutions">
            {/* <Menu.Item onClick={() => router.push("/Preassembles")}>
              Preassembles
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Cable Assemblies")}>
              Cable Assemblies
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Wire Harnesses")}>
              Wire Harnesses
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Preassembles")}>
              Preassembles
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Electric Modules")}>
              Electric Modules
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Pre Wired Assemblies")}>
              Pre Wired Assemblies
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/Semi Fish Modules")}>
              Semi Fish Modules
            </Menu.Item> */}
            {assemblySolutionsList?.map((m, index) => {
              return (
                <Link
                  passHref={true}
                  scroll={true}
                  href={`/${m.name}`}
                  key={index}
                >
                  <a>
                    <Menu.Item onClick={toggleDrawer(false)}>
                      {m.name}
                    </Menu.Item>
                  </a>
                </Link>
              );
            })}
          </Menu.SubMenu>
          <Link passHref={true} scroll={true} href={`/industry`}>
            <a>
              <Menu.Item style={{ width: 256, paddingLeft: "10%" }}>
                Industries
              </Menu.Item>
            </a>
          </Link>
          <Link passHref={true} scroll={true} href={`/brands`}>
            <a>
              <Menu.Item style={{ width: 256, paddingLeft: "10%" }}>
                Brands
              </Menu.Item>
            </a>
          </Link>
          <Link passHref={true} scroll={true} href={`/resources`}>
            <a>
              <Menu.Item style={{ width: 256, paddingLeft: "10%" }}>
                Resources
              </Menu.Item>
            </a>
          </Link>
          {/* <Menu.Item
            style={{ width: 256 }}
            onClick={() => router.push(`${m.name}`)}
          >
            Services
          </Menu.Item> */}
          {/* <Menu.Item
            style={{ width: 256 }}
            onClick={() => router.push(`${m.name}`)}
          >
            Projects
          </Menu.Item> */}
        </Menu>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
