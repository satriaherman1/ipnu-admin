import { Cookie } from "@mui/icons-material";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { AuthRestService } from "../../service/rest/auth-rest.service";

export default function Login() {
  const authRestService = new AuthRestService();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const router = useRouter();

  const submitLogin = () => {
    setIsLoading(true);
    const params = {
      username: username,
      password: password,
    };

    authRestService
      .login(params)
      .then((res) => {
        if (res) {
          const data = res?.data;
          let userData: any = {
            username: data?.username,
            email: data?.email,
            accessToken: data?.accessToken,
            login: true,
          };

          userData = JSON.stringify(userData);

          localStorage.setItem("currentUser", userData);
          setIsLoading(false);
          router.push("/");
        } else {
          setErr(true);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const currentUser: any = localStorage.getItem("currentUser");
    const userData = JSON.parse(currentUser);
    const login = userData?.login;

    if (login && login !== undefined) {
      router.back();
    }
  });

  return (
    <div className={`login`}>
      <Loading isLoading={isLoading} />
      <section className="login-container bg-white px-9 pt-6 pb-10 flex flex-col w-[90%] max-w-[500px]">
        <h2 className="text-[32px] font-[700] text-center mb-5">Login</h2>

        {err && (
          <Alert severity="error" className=" mb-4">
            Username atau Password Error
          </Alert>
        )}

        <TextField onChange={(e) => setUsername(e.target.value)} label="Email" variant="outlined" />
        <br />

        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" />
        <Box sx={{ bgcolor: "primary.main" }} className="mt-4 rounded w-[fit-content]">
          <Button onClick={submitLogin} variant="contained">
            Login
          </Button>
        </Box>
      </section>
    </div>
  );
}
