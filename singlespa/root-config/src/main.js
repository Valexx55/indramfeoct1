
/*
Mantenemos Zone.js como dependencia global del orquestador single-spa porque cada Micro
necesite de esa librería para inicializarse correctamente y que la APP Angular funciones 
Otra opción sería hacer zone-less nuestras apps o modificar bootstrap y mount dentro de cada
módulo, pero sería redundante la recarga de zone cada vez que se carga la app

npx ng serve --port 4201 dentro de news para arrancar el micro angular independientemente
npx ng serve --port 4202 dentro de favs para arrancar el micro angular independientemente

*/
import 'zone.js';//

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
