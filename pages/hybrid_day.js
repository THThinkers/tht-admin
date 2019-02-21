import { Layout, WithAuth } from "../components";

const hybridDay = () => {
  return <Layout>하이브리드 페이지 관리.</Layout>;
};

export default WithAuth(hybridDay);
