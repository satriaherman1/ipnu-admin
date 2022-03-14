import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AssignmentInd, Feed, Group, InsertPhoto, SpeedOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../config/pathImage";

interface ISidebarProps {
  className?: string;
  active: string;
}

export default function Sidebar(props: ISidebarProps) {
  const { className, active } = props;
  return (
    <ThemeProvider
      theme={createTheme({
        // components: {
        //   MuiListItemButton: {

        //   },
        // },
        palette: {
          mode: "dark",
          primary: { main: "#018559" },
          background: { paper: "#018559" },
        },
      })}
    >
      <Box className="w-[310px] sidebar h-[100vh] py-[20px] bg-[#01734d] px-[20px]">
        {/* <h2 className="text-[30px] text-white">Dashboard</h2> */}
        <div>
          <Image src={Logo} />
        </div>
        <Divider className="h-[2px] border-top-2" />
        <br />
        {/* <br />
        <h3 className="font-[600] text-[20px] text-white">Satria Herman</h3>
        <p className="text-white font-[300]">satriaherman@gmail.com</p>
        <br /> */}
        <p className="text-[600] text-[#d9d9d9]">Main</p>
        <List>
          <Link href="/">
            <ListItemButton className={`${active === "" && "active"} my-[5px]`}>
              <ListItemIcon className={`${active === "" && "text-[#333]"}`}>
                <SpeedOutlined />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className="text-white" />
            </ListItemButton>
          </Link>
        </List>
        <p className="text-[600] text-[#d9d9d9]">Kelola Pengguna</p>
        <List>
          <Link href="/member">
            <ListItemButton className={`${active === "member" && "active"} my-[5px]`}>
              <ListItemIcon className={`${active === "member" && "text-[#333]"}`}>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Daftar Anggota" className="text-white" />
            </ListItemButton>
          </Link>
          <Link href="/roles">
            <ListItemButton className={`${active === "roles" && "active"} my-[5px]`}>
              <ListItemIcon className={`${active === "roles" && "text-[#333]"}`}>
                <AssignmentInd />
              </ListItemIcon>
              <ListItemText primary="Roles" className="text-white" />
            </ListItemButton>
          </Link>
        </List>
        <p className="text-[600] text-[#d9d9d9]">Postingan</p>
        <List>
          <Link href="/post">
            <ListItemButton className={`${active === "post" && "active"} my-[5px]`}>
              <ListItemIcon className={`${active === "post" && "text-[#333]"}`}>
                <Feed />
              </ListItemIcon>
              <ListItemText primary="Berita Terkini" className="text-white" />
            </ListItemButton>
          </Link>
          <ListItemButton className={`${active === "activity" && "active"} my-[5px]`}>
            <ListItemIcon className={`${active === "activity" && "text-[#333]"}`}>
              <InsertPhoto />
            </ListItemIcon>
            <ListItemText primary="Artikel" className="text-white" />
          </ListItemButton>
        </List>
      </Box>
    </ThemeProvider>
  );
}
