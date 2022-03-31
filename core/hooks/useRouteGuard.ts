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

    // redirect to login page if accessing a private page and not logged in
    const redirectPath = "/login";

    if (!login) {
      setAuthorized(false);
      router.push(redirectPath);
    } else {
      setAuthorized(true);
    }
  }
}
