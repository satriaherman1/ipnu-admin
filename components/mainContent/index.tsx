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
    <div className="py-[30px] px-[20px] lg:px-[40px] w-[100%] mt-[60px] lg:mt-0">
      <Head>
        <meta name="google-signin-client_id" content="29223967428-9m3uh7cao43bgqmv1qsfhipakpike32n.apps.googleusercontent.com"></meta>
      </Head>
      <Script src="https://apis.google.com/js/platform.js" async defer></Script>
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
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
      {children}
    </div>
  );
}
