// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   // Proxy for token request
//   app.use(
//     "/connect",
//     createProxyMiddleware({
//       target: "https://oauth.fatsecret.com",
//       changeOrigin: true,
//       secure: false,
//       logLevel: "debug",
//     })
//   );

//   // Proxy for food data request
//   app.use(
//     "/rest",
//     createProxyMiddleware({
//       target: "https://platform.fatsecret.com",
//       changeOrigin: true,
//       secure: false,
//       logLevel: "debug",
//     })
//   );
// };

// ------------------------------------------------------------------------------
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for token request
  app.use(
    "/connect",
    createProxyMiddleware({
      target: "https://oauth.fatsecret.com",
      changeOrigin: true,
      secure: false, // or set to true if the target has a valid SSL cert
      logLevel: "info", // Change to 'info' for less detailed logging
    })
  );

  // Proxy for food data request
  app.use(
    "/rest",
    createProxyMiddleware({
      target: "https://platform.fatsecret.com",
      changeOrigin: true,
      secure: false, // or set to true if the target has a valid SSL cert
      logLevel: "info", // Change to 'info' for less detailed logging
    })
  );
};
