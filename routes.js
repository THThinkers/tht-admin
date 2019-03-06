const routes = {
  "/": {
    name: "홈",
    path: "/"
  },
  "/user": {
    name: "회원관리",
    path: "/user",
    description: "회원의 인증여부를 관리합니다.",
    onBoard: true
  },
  "/major": {
    name: "학과관리",
    path: "/major",
    description: "회원가입시 학과목록을 관리합니다.",
    onBoard: true
  },
  "/profile": {},
  "/hybrid_day": {
    name: "하이브리드 데이",
    path: "/hybrid_day",
    description: "하이브리드 데이 게시물을 관리합니다.",
    onBoard: true
  }
};

export default routes;
