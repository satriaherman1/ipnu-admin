import axios from "axios";
import { useRouter } from "next/router";
import { baseUrl } from "../../config/environtment";

export class AuthRestService {
  private router = useRouter();

  async login(params: any) {
    try {
      return await axios.post(`${baseUrl}/auth/signin`, params);
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.push("/login");
  }
}
