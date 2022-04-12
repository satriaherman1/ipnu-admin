import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useRouteGuard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck();
  }, []);

  function authCheck() {
    const currentUser: any = localStorage.getItem("currentUser");
    const userData = JSON.parse(currentUser);
    const login = userData?.login;

    const redirectPath = "/login";

    if (!login) {
      setAuthorized(false);
      router.push(redirectPath);
    } else {
      setCookie("_accessToken", userData.accessToken, 1);
      const token = getCookie("_accessToken");
      console.log(token);
      setAuthorized(true);
    }
  }

  function setCookie(cname: string, cvalue: any, exdays: any) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
