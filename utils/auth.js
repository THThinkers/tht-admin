export const getCookie = ctx => {
  const cookie = ctx.req && ctx.req.headers ? ctx.req.headers.cookie : "";
  return cookie;
};
