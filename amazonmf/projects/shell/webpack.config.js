const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  /*remotes: {
    "carrito": "http://localhost:4201/remoteEntry.js",
    "productos": "http://localhost:4203/remoteEntry.js",
    "perfil": "http://localhost:4202/remoteEntry.js",    
  },*/

  //esta configuración jujnto con el servido de nginsxgonf de sheel , permite eliminar CORS
  remotes: {
  "carrito": "/carrito/remoteEntry.js",
  "productos": "/productos/remoteEntry.js",
  "perfil": "/perfil/remoteEntry.js",
},

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  //TODO probar import model tb
   sharedMappings:["@shared-lib","@core-lib"] //el shell es el módulo raíz y carga estas librerías una sola vez y la comparte con el resto de micros así realmente tenemos una instancia singleton  

});
