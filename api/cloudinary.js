import axios from "axios";

const basePath = `https://api.cloudinary.com/v1_1/${
  process.env.CLOUDINARY_NAME
}/image/upload`;

export const uploadImage = ({ file, tag, preset }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", tag);
  formData.append("upload_preset", preset);
  formData.append("api_key", process.env.CLOUDINARY_API);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data"
  };
  return axios.post(basePath, formData, { headers });
};
