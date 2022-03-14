import axios from "axios";
import { baseUrl } from "../../config/environtment";

export class MemberRestService {
  async getMembers() {
    try {
      return await axios.get(`${baseUrl}/members`);
    } catch (err) {
      console.log(err);
    }
  }
  async crateMember(params: IMember) {
    try {
      return await axios.post(`${baseUrl}/members`, params);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteMemberById(id: any) {
    try {
      return await axios.delete(`${baseUrl}/members/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}
