import Axios from "axios";
import { SERVER_HOST } from "../utils/environment";

const instance = Axios.create({
  baseURL: `${SERVER_HOST}/api/admin/major`, // 서버에서 호출 시
  withCredentials: true
});

const getMajorList = ({ option = {} }) => {
  return instance.get("/list", option);
};

const addMajor = ({ name }) => {
  return instance.post("/", { name });
};

const deleteMajor = ({ majorId }) => {
  return instance.delete(`?majorId=${majorId}`);
};

const updateMajor = ({ newMajor }) => {
  return instance.put("/", updateMajor);
};

export { getMajorList, addMajor, deleteMajor, updateMajor };
