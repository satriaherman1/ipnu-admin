import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AssignmentInd, Feed, Group, InsertPhoto, Notifications, Search, SpeedOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AppBar, IconButton, SpeedDial, Switch, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import Logo from "../../config/pathImage";
import React from "react";
import Sidebar from "../sidebar";

export default function Navigation() {
  type Anchor = "top" | "left" | "bottom" | "right";
  const [pathWindow, setPathWindow] = useState<string>("");
  const large = useMediaQuery(`(min-width:768px)`);
  useEffect(() => {
    const path = window.location.pathname;
    setPathWindow(path.substring(1));
  }, []);
  function SwipeableTemporaryDrawer() {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
      <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
        <List>
          <Box className="max-w-[200px] px-[10px]">
            <Image src={Logo} />
          </Box>
          <Divider />
          <br />
          {/* <p className="text-[600] text-[#5e6361] ml-[15px] mb-[5px]">Main</p> */}

          <Link href="/">
            <ListItem button>
              <ListItemIcon>
                <SpeedOutlined />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          {/* <p className="text-[600] text-[#5e6361] ml-[15px] mt-[10px] mb-[10px]">User Management</p> */}

          <Link href="/member">
            <ListItem button>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Daftar Anggota" />
            </ListItem>
          </Link>
          <Link href="/member">
            <ListItem button>
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItem>
          </Link>
          <Link href="/member">
            <ListItem button>
              <ListItemIcon>
                <Feed />
              </ListItemIcon>
              <ListItemText primary="Berita Terkini" />
            </ListItem>
          </Link>
          <Link href="/member">
            <ListItem button>
              <ListItemIcon>
                <InsertPhoto />
              </ListItemIcon>
              <ListItemText primary="Artikel" />
            </ListItem>
          </Link>
        </List>
      </Box>
    );

    return (
      <div>
        {(["left"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Box sx={{ flexGrow: 1 }} className="bg-[#01734d]">
              <AppBar position="fixed">
                <Toolbar>
                  <IconButton onClick={toggleDrawer(anchor, true)} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    IPNU Dashboard
                  </Typography>
                  <IconButton color="inherit">
                    <Search />
                  </IconButton>
                  <IconButton color="inherit">
                    <Notifications />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Box>

            <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return <>{large ? <Sidebar active={pathWindow} /> : <SwipeableTemporaryDrawer />}</>;
}
