import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:3000/api/admin/user", // 서버에서 호출 시
  withCredentials: true
});
// 서버에서 호출할 수 있는 모든 api에는 option안에 header로 현재 cookie를 넣어줘야 합니다.
const getUserProfile = ({ userId = "", option = {} }) => {
  return instance.get(`/profile?userId=${userId}`, option);
};
const getUserList = (option = {}) => {
  return instance.get("/list", option);
};
const verifyUser = ({ userId = "" }) => {
  return instance.put("/verify", { userId });
};
const deleteUser = ({ userId = "" }) => {
  return instance.delete(`/delete/${userId}`);
};
const updateUser = ({ _id, ...updateFields }) => {
  return instance.put("/update", { _id, ...updateFields });
};
export { getUserProfile, getUserList, verifyUser, deleteUser, updateUser };
