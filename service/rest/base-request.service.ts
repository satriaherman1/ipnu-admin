import axios from "axios";
import FormatService from "../format/format.service";

const formatService = new FormatService();

const token = formatService.getCookie("_accessToken");
const headers = {
  Authorization: "Bearer " + token,
};

export { headers };
