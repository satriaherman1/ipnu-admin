import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import useLocalData from "../../core/hooks/useLocalData";
import PageBreadCrumbs from "../pageBreadCrumbs";

interface ImainContentProps {
  children: any;
}

export default function MainContent(props: ImainContentProps) {
  const { store } = useLocalData();
  const { children } = props;
  console.log(store);
  return (
    <div className="py-[30px] px-[20px] lg:px-[40px] w-[100%] mt-[60px] lg:mt-0">
      <div className="flex justify-between w-full items-center mb-[30px]">
        <PageBreadCrumbs {...store.breadCrumbs} />
        <div className="flex  items-center">
          <IconButton className="ml-[10px] ">
            <Notifications />
          </IconButton>
          <IconButton className="ml-[10px] ">
            <Search />
          </IconButton>
          <IconButton className="ml-[10px] ">
            <AccountCircle />
          </IconButton>
        </div>
      </div>

      {children}
    </div>
  );
}
