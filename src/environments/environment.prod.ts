export const environment = {
  production: true,
  version: require('../../package.json').version,
  repoUrl: require('../../package.json').bugs.url.replace(/issues$/, ''),
  apiUrl: 'https://www.slated.com/films/autocomplete/profiles/',
  cacheTimeoutInMs: 1000 * 60 * 60 * 24,
};
