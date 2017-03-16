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
  // ServerAPI: 'http://183.196.130.101:9202/valuechange/mapi',                    // 新奥环境地址--正式
  // ServerAPI: 'http://183.196.130.125:9102/valuechange/mapi',                       // 新奥环境地址--测试
  ServerAPI: 'http://124.205.25.6/vep/api',                                        // 公司测试环境
  // ServerAPI: 'http://10.1.1.117:8003/api',
  app: {
    title: '新奥',
    description: '新奥轻应用，手机应用程序.',
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: '新奥轻应用，手机应用程序.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '新奥' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: '新奥' },
        { property: 'og:description', content: '新奥轻应用，手机应用程序.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@xinao' },
        { property: 'og:creator', content: '@xinao' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ],
      script: [{ type: 'text/javascript', src: 'http://183.196.130.125:9001/sdk/js/icom.js' }]
    },
    IsHideNavBar: environment.isProduction,
    BuildPublicPath: '/dist/',
    BaseName: '/',
    // BuildPublicPath: '/valuechange/mobile/',
    // BaseName: '/valuechange/mobile/',
  },

}, environment);
