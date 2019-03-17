export const isBrowser = () => !!process.browser;
export const SERVER_HOST = `http://${process.env.SERVER_HOST ||
  "localhost"}:3000`;
