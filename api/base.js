import Axios from "axios";

const login = ({ username = "", password = "" }) => {
  return Axios.post("/api/admin/login", {
    username,
    password
  });
};

export { login };
