
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/modals/modal-shell/modal-shell.ts": [
    "chunk-3LWFVOAW.js",
    "chunk-JXDDBONQ.js",
    "chunk-5CK7NKRR.js",
    "chunk-XCY2XRND.js"
  ],
  "node_modules/primeng/fesm2022/primeng-datepicker.mjs": [
    "chunk-5Z4KVIYA.js",
    "chunk-D46TXBMP.js",
    "chunk-5CK7NKRR.js",
    "chunk-XCY2XRND.js"
  ],
  "src/app/modals/budget-modal/budget-modal.ts": [
    "chunk-ZOUMCFB7.js",
    "chunk-HCJELYY2.js",
    "chunk-BVFRYNHU.js",
    "chunk-D46TXBMP.js",
    "chunk-5CK7NKRR.js",
    "chunk-XCY2XRND.js"
  ],
  "src/app/components/user-actions/user-actions.ts": [
    "chunk-RZHHI7DC.js",
    "chunk-JXDDBONQ.js",
    "chunk-HCJELYY2.js",
    "chunk-BVFRYNHU.js",
    "chunk-D46TXBMP.js",
    "chunk-5CK7NKRR.js",
    "chunk-XCY2XRND.js"
  ],
  "src/app/layouts/web/default/default.ts": [
    "chunk-VPZASPSG.js",
    "chunk-F37M7ID2.js",
    "chunk-XCY2XRND.js"
  ],
  "src/app/calendar/calendar.ts": [
    "chunk-EJXLY3B7.js",
    "chunk-BVFRYNHU.js",
    "chunk-D46TXBMP.js",
    "chunk-5CK7NKRR.js",
    "chunk-F37M7ID2.js",
    "chunk-XCY2XRND.js"
  ],
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    "chunk-PC6E52SV.js"
  ]
},
  assets: {
    'index.csr.html': {size: 22546, hash: '54dcf205273c158913f250b3045092ac6daaad1309f049c220b8118cfb17e87e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 16920, hash: '83d3b359f78b143d19de3daeb564bd78db001469503587df3dc2056adc6e624d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PFQTMPGD.css': {size: 31371, hash: 't84YvtdWbrs', text: () => import('./assets-chunks/styles-PFQTMPGD_css.mjs').then(m => m.default)}
  },
};
