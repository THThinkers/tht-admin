import { useEffect } from "react";
import Head from "next/head";
import { Button } from "antd";
import { createWidget, widget } from "../utils/cloudinaryWidget";

const Cloudinary = ({ children }) => {
  const handleOpenWidget = () => {
    widget && widget.open();
  };
  useEffect(() => {
    if (!widget && global.cloudinary) {
      createWidget(global.cloudinary);
    }
  }, []);
  return (
    <>
      <Head>
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
          key="cloudinary"
        />
      </Head>
      <Button onClick={handleOpenWidget}>이미지 업로드</Button>
    </>
  );
};

export default Cloudinary;
