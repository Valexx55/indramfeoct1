// TODO COMPLETAR LA CONFIGUTRACIÓN DEL MICRO EN ESTE FICHERO
// DECLARAMOS QUÉ COMPARTIMOS DE NUESTRO MICRO CON EL RESTO, QUÉ HACEMOS PÚBLICO

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'perfil',

  exposes: {
    './Component': './projects/perfil/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
