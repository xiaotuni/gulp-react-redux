require('babel-polyfill');

const environment = {
  development: { isProduction: false },
  production: { isProduction: true }
}[process.env.NODE_ENV || 'development'];

const __host = '127.0.0.1';

module.exports = Object.assign({
  host: process.env.HOST || __host,
  port: process.env.PORT,
  apiHost: process.env.APIHOST || __host,
  apiPort: process.env.APIPORT,
  ServerAPI: 'http://127.0.0.1:11000/WebApi',
  app: {
    title: 'XTN Web Demo',
    description: 'XTN Web Demo.',
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'XTN Web Demo.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'XTN' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'XTN' },
        { property: 'og:description', content: 'XTN Web Demo.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:creator', content: 'xiaotuni@gmail.com' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ],
      // script: [{ type: 'text/javascript', src: 'http://183.196.130.125:9001/sdk/js/icom.js' }]
    },
    IsHideNavBar: environment.isProduction,
    BuildPublicPath: '/dist/',
    BaseName: '/web/',
  },

}, environment);
