import { AccountCircle, Logout, Notifications, Search } from "@mui/icons-material";
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalData from "../../core/hooks/useLocalData";
import PageBreadCrumbs from "../pageBreadCrumbs";
import { AuthRestService } from "../../service/rest/auth-rest.service";
interface ImainContentProps {
  children: any;
}

export default function MainContent(props: ImainContentProps) {
  const { store } = useLocalData();
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openUserPopover = Boolean(anchorEl);
  const id = openUserPopover ? "user-popover" : undefined;
  const authRestService = new AuthRestService();

  const handleOpenUserPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserPopover = () => {
    setAnchorEl(null);
  };

  return (
    <div className="py-[30px] px-[20px] h-[100%] overflow-y-scroll max-h-[700px] lg:px-[40px] w-[100%] mt-[60px] lg:mt-0">
      <div className="flex justify-between w-full items-center mb-[30px]">
        <PageBreadCrumbs {...store.breadCrumbs} />
        <div className="hidden lg:flex items-center">
          <IconButton className="ml-[10px] ">
            <Notifications />
          </IconButton>
          <IconButton className="ml-[10px] ">
            <Search />
          </IconButton>
          <IconButton className="ml-[10px]" aria-describedby={id} onClick={handleOpenUserPopover}>
            <AccountCircle />
          </IconButton>
          <Popover
            id={id}
            open={openUserPopover}
            anchorEl={anchorEl}
            onClose={handleCloseUserPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <ListItemButton onClick={() => authRestService.logout()}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Popover>
        </div>
      </div>

      {children}
    </div>
  );
}
