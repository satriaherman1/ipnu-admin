import axios from "axios";
import { baseUrl } from "../../config/environtment";

export class AuthRestService {
  async login(params: any) {
    try {
      return await axios.post(`${baseUrl}/auth/signin`, params);
    } catch (err) {
      console.log(err);
    }
  }
}
