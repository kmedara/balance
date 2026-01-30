
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4GJ4JHYE.js"
    ],
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4GJ4JHYE.js"
    ],
    "route": "/expenses"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17566, hash: 'b7cf5cde064e651b77fc5a6239c3572342298c4840a8eebaaa04762eafa4d1a1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 16760, hash: 'a1b49cfd82fcf146322397e7c7ddf98715a8ddb56d9cad9cbc948736311a3269', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'expenses/index.html': {size: 41993, hash: '1f8172bbaf4b649fe6e34c6108d87ce7d5718f9598faba22097576a236f0df70', text: () => import('./assets-chunks/expenses_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 45444, hash: '8ae157f43812aaa4f67beef9ff753e1e21025146808028ff48a2a4047657c14d', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-3TTV4P2A.css': {size: 20556, hash: 'nOHovsnJMp0', text: () => import('./assets-chunks/styles-3TTV4P2A_css.mjs').then(m => m.default)}
  },
};
