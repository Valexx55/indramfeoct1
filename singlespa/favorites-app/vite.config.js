const { defineConfig } = require('vite');
const path = require('node:path');

module.exports = defineConfig({
  root: path.resolve(__dirname, 'dist/favorites-app/browser'),

  server: {
    host: '127.0.0.1',
    port: 4202,
    strictPort: true,
    cors: true
  },

  appType: 'mpa'
});