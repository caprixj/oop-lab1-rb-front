const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/callback','/admin','/booking','/invoice','/responses'],
    createProxyMiddleware({
      target: 'http://localhost:8080/',
      changeOrigin: true
    })
  );
};
