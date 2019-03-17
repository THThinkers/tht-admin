import Axios from "axios";
import { SERVER_HOST } from "../utils/environment";
const login = ({ username = "", password = "" }) => {
  return Axios.post(`${SERVER_HOST}/api/admin/login`, {
    username,
    password
  });
};
const logout = () => Axios.get(`${SERVER_HOST}/api/admin/logout`);
const profile = option => {
  return Axios.get(`${SERVER_HOST}/api/admin/profile`, {
    ...option,
    withCredentials: true
  });
};

export { login, logout, profile };
