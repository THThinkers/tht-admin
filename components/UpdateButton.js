import { Button, message } from "antd";
import { verifyUser } from "../api/user";

const VerifyBtn = ({ _id, isVerified, handleVerified }) => {
  const handleVerifyUser = async userId => {
    try {
      await verifyUser({ userId });
      message.info("인증변경에 성공하였습니다.");
      handleVerified && handleVerified(true, userId);
    } catch (err) {
      message.error("에러가 발생하였습니다. 다시 시도해주세요.");
      handleVerified && handleVerified(false, userId);
    }
  };
  return (
    <Button
      type={isVerified ? "danger" : "primary"}
      onClick={() => handleVerifyUser(_id)}
    >
      {isVerified ? "인증해제" : "인증"}
    </Button>
  );
};

export default VerifyBtn;
