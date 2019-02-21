const routes = {
  "/": {
    name: "홈",
    path: "/"
  },
  "/user": {
    name: "회원관리",
    path: "/user",
    description: "회원의 인증여부를 관리합니다."
  },
  "/profile": {},
  "/hybrid_day": {
    name: "하이브리드 데이",
    path: "/hybrid_day",
    description: "하이브리드 데이 게시물을 관리합니다."
  }
};

export default routes;
