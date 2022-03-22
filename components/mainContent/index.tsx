import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import useLocalData from "../../core/hooks/useLocalData";
import PageBreadCrumbs from "../pageBreadCrumbs";

interface ImainContentProps {
  children: any;
}

export default function MainContent(props: ImainContentProps) {
  const { store } = useLocalData();
  const { children } = props;
  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  useEffect(() => {}, []);
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
          <IconButton className="ml-[10px] ">
            <AccountCircle />
          </IconButton>
        </div>
      </div>

      {children}
    </div>
  );
}
