import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:3000/api/admin/user", // 서버에서 호출 시
  withCredentials: true
});
const getUserList = (option = {}) => {
  return instance.get("/list", option);
};
const verifyUser = ({ userId = "" }) => {
  return instance.put("/verify", { userId });
};
export { getUserList, verifyUser };
