const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const devProxy = {
  "/api": {
    target: "http://localhost:4000",
    changeOrigin: true
  }
};
app.prepare().then(() => {
  const server = express();
  const proxyMiddleware = require("http-proxy-middleware");
  Object.entries(devProxy).forEach(([url, option]) => {
    server.use(proxyMiddleware(url, option));
  });
  server.all("*", (req, res) => handle(req, res));
  server.listen(3000, () => {
    console.log("Server listen");
  });
});
