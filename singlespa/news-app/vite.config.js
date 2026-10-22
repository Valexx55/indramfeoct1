
const { defineConfig } = require('vite');
const path = require('node:path');

module.exports = defineConfig({
  root: path.resolve(__dirname, 'dist/news-app/browser'),

  server: {
    host: '127.0.0.1',
    port: 4201,
    strictPort: true,
    cors: true
  },

  appType: 'mpa'
});
