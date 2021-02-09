const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth/register',
        createProxyMiddleware({
            target: 'https://apiko-marketplace-api-2019.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/auth/login',
        createProxyMiddleware({
            target: 'https://apiko-marketplace-api-2019.herokuapp.com/',
            changeOrigin: true,
        })
    );
};


// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://apiko-marketplace-api-2019.herokuapp.com/auth/login',
//       changeOrigin: true,
//     })
//   );
// };
// const createProxy = require('http-proxy-middleware');

// const proxy = createProxy({
//   target: 'https://apiko-marketplace-api-2019.herokuapp.com/',
//   pathRewrite: { '^/api': '' },
//   changeOrigin: true
// });

// // const wsProxy = createProxy({
// //   target: 'https://apiko-marketplace-api-2019.herokuapp.com/',
// //   changeOrigin: true,
// //   ws: true
// // });

// module.exports = (app) => {
//   app.use('/api', proxy);
// //   app.use('/socket.io', wsProxy);
// };
