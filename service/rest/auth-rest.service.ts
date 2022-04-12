import axios from "axios";
import { useRouter } from "next/router";
import { baseUrl } from "../../config/environtment";

export class AuthRestService {
  private router = useRouter();

  login(params: any) {
    return axios.post(`${baseUrl}/auth/signin`, params);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.push("/login");
  }
}
