
import 'zone.js';

import { registerApplication, start } from 'single-spa';
import * as singleSpa from 'single-spa';

// Solo para depurar
window.singleSpa = singleSpa;

// Registro del microfrontend News
registerApplication({
  name: '@vm/news-app',
  app: () => import('http://127.0.0.1:4201/main.js'),
  activeWhen: location =>
    location.pathname === '/news' ||
    location.pathname.startsWith('/news/')
});

// Registro del microfrontend Favorites
registerApplication({
  name: '@vm/favorites-app',
  app: () => import('http://127.0.0.1:4202/main.js'),
  activeWhen: location =>
    location.pathname === '/favorites' ||
    location.pathname.startsWith('/favorites/')
});

// Arranque de single-spa
start();
