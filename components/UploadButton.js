import { useRef } from "react";
import { Button } from "antd";

const UploadButton = ({ children, handleFile }) => {
  const fileRef = useRef();
  const handleButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleFileChange = e => {
    handleFile(e.target.files);
  };
  return (
    <>
      <input
        ref={fileRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button onClick={handleButtonClick}>{children}</Button>
    </>
  );
};

export default UploadButton;
