// TODO COMPLETAR LA CONFIGUTRACIÓN DEL MICRO EN ESTE FICHERO
// DECLARAMOS QUÉ COMPARTIMOS DE NUESTRO MICRO CON EL RESTO, QUÉ HACEMOS PÚBLICO

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'perfil',

  exposes: {
    './Module': './projects/perfil/src/app/perfil/perfil.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

//CÓMO HARÍAMOS PARA DINÁMICAMENTA HACER QUE MODULEFED USE EL MISMO WEBPACK QUE ANGULAR
//Y ASÍ EVEITAR ERRORES EN SU EJECUCIÓN

//SOLUCIÓN ALTERNATIVA A REDEFINIR LAS DEPEDENCIAS

// //obtengo las funciones que determinan qué comparte y cómo este módulo
// const { shareAll, withModuleFederationPlugin } =
//   require('@angular-architects/module-federation/webpack');

// //esta función de Node, me permite localizar un módulo
// const { createRequire } = require('module');

// //ahora poderemos buscar módulos desde esa ruta, para ello usamos esta función
// const angularRequire = createRequire(
//   //obtenemos la ruta del packee json de ese módulo
//   require.resolve('@angular-devkit/build-angular/package.json')
// );
// //ahora sí, cargamos wepack que usaba anguar devkit. obtenemos un objeto que contiene las funciones exportadas por webpack
// //la clase extraída es por desestructuración, la configuración, exprresada en MOduleFederationplugin 
// const { ModuleFederationPlugin } = angularRequire('webpack').container;

// const config = withModuleFederationPlugin({
//   name: 'productos',
//   exposes: {
//     './Component': './projects/productos/src/app/app.component.ts',
//   },
//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },
// });

// // Sustituir el plugin por el de Webpack de Angular
// config.plugins = config.plugins.map(p =>
//   p.constructor.name === 'ModuleFederationPlugin'
//     ? new ModuleFederationPlugin(p.options)
//     : p
// );

// module.exports = config;