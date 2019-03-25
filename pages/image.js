import { useState, useRef } from "react";
import { Modal, Button, message } from "antd";
import { Layout, UploadButton, WithAuth } from "../components";
import { useAsyncAction } from "../hooks/async";
import * as cloudinaryApi from "../api/cloudinary";
import * as imageApi from "../api/imagebucket";

const imageType = {
  members: "조직도"
};
const Image = () => {
  const [modalType, setModalType] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSetImage = (data, success) => {
    success && getImage({ target: modalType });
    message.info("이미지 등록에 성공하였습니다.");
  };
  const handleGetImage = (data, success) => {
    success && setImageUrl(data.payload);
  };

  const [getImageStatus, getImage] = useAsyncAction({
    api: imageApi.getImage,
    callback: handleGetImage
  });
  const [setImageStatus, setImage] = useAsyncAction({
    api: imageApi.setImage,
    callback: handleSetImage
  });
  const handleFile = async files => {
    const file = files[0];
    const handlingError = () =>
      message.error("이미지 업로드에 실패하였습니다.");
    try {
      const response = await cloudinaryApi.uploadImage({
        file,
        tags: modalType,
        preset: modalType
      });
      const { url } = response.data;
      setImage({ target: modalType, imageUrl: url });
    } catch (err) {
      console.error(err.response);
      handlingError();
    }
  };
  const handleOpenModal = type => () => {
    setModalType(type);
    getImage({ target: type });
  };
  const handleCloseModal = () => setModalType(null);
  return (
    <Layout>
      {Object.entries(imageType).map(([type, name]) => {
        return (
          <Button onClick={handleOpenModal(type)}>{name} 이미지 관리</Button>
        );
      })}
      <Modal
        title={modalType && `${imageType[modalType]} 이미지 관리`}
        visible={!!modalType}
        width={800}
        footer={[
          <Button type="primary" key="confirm" onClick={handleCloseModal}>
            확인
          </Button>
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {getImageStatus && (
            <img width={500} src={imageUrl} alt={`${modalType} 이미지`} />
          )}
          <div>
            <p>새 이미지를 업로드하세요.</p>
            <UploadButton handleFile={handleFile}>업로드</UploadButton>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default WithAuth(Image);
