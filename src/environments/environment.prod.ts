const packageJson = require('../../package.json');

export const environment = {
  production: false,
  config: packageJson,
  repoUrl: packageJson.bugs.url.replace(/issues$/, ''),
  authorUrl: /\((http.*)\)/.exec(packageJson.author)[1],
  apiUrl: 'https://www.slated.com/films/autocomplete/profiles/',
  cacheTimeoutInMs: 1000 * 60 * 60 * 24,
};
