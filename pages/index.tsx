import { AccountCircle, Group, InsertPhoto, Notifications, Search, SpeedOutlined } from "@mui/icons-material";
import type { NextPage } from "next";
import * as React from "react";

import MainContent from "../components/mainContent";
import Sidebar from "../components/sidebar";
import SimpleCard from "../components/simple-card";
import Navigation from "../components/navigation";
import { Box, IconButton, TextField } from "@mui/material";
import PageBreadCrumbs from "../components/pageBreadCrumbs";

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <MainContent>
        <br />
        <div className="flex flex-wrap justify-between w-[100%]">
          <SimpleCard icon={<Group fontSize="large" className="text-white" />} headerTitle="Total IPNU" content="30 Rekan" bgIcon="#0a688a" />
          <SimpleCard className="lg:ml-[30px] mt-[30px]" icon={<Group fontSize="large" className="text-white " />} headerTitle="Total IPNU" content="20 Rekanita" bgIcon="#0b7d59" />
          <SimpleCard className="lg:ml-[30px] mt-[30px]" icon={<Group fontSize="large" className="text-white " />} headerTitle="Total IPNU" content="30 Rekan" bgIcon="#bd4209" />
        </div>
      </MainContent>
    </div>
  );
};

export default Home;
