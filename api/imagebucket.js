import Axios from "axios";
import { SERVER_HOST } from "../utils/environment";

const instance = Axios.create({
  baseURL: `${SERVER_HOST}/api/admin/imagebucket`, // 서버에서 호출 시
  withCredentials: true
});

const getImage = ({ target }) => {
  return instance.get(`?target=${target}`);
};
const setImage = ({ target, imageUrl }) => {
  return instance.post("/", { target, imageUrl });
};

export { getImage, setImage };
