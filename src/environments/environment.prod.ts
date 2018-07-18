export const environment = {
  production: true,
  version: require('../../package.json').version,
  apiUrl: 'https://www.slated.com/films/autocomplete/profiles/',
  cacheTimeoutInMs: 1000 * 60 * 60 * 24,
};
