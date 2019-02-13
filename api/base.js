import Axios from "axios";

const login = ({ username = "", password = "" }) => {
  return Axios.post("/api/admin/login", {
    username,
    password
  });
};
const logout = () => Axios.get("/api/admin/logout");
const profile = option => {
  return Axios.get("http://localhost:3000/api/admin/profile", {
    ...option,
    withCredentials: true
  });
};

export { login, logout, profile };
