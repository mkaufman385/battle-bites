// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/connect/token",
//     createProxyMiddleware({
//       target: "https://oauth.fatsecret.com",
//       changeOrigin: true,
//     })
//   );
// };

// ------------------------------------------------------------------------------

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for token request
  app.use(
    "/connect",
    proxy({
      target: "https://oauth.fatsecret.com",
      changeOrigin: true,
      secure: false,
    })
  );

  // Proxy for food data request
  app.use(
    "/rest",
    proxy({
      target: "https://platform.fatsecret.com",
      changeOrigin: true,
      secure: false,
    })
  );
};
