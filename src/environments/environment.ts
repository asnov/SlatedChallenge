// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const packageJson = require('../../package.json');

export const environment = {
  production: false,
  config: packageJson,
  repoUrl: packageJson.bugs.url.replace(/issues$/, ''),
  authorUrl: /\((http.*)\)/.exec(packageJson.author)[1],
  apiUrl: 'https://www.slated.com/films/autocomplete/profiles/',
  cacheTimeoutInMs: 1000 * 30,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
