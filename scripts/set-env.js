// Generate environment.ts file using environment variables
const writeFile = require('fs').writeFile;
const argv = require('yargs').argv;
require('dotenv').config();

const environment = argv.env;
const isProd = environment === 'prod';

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `\
// ${environment} environment
export const environment = {
  production: ${isProd},
  adminSiteUrl: "${process.env.ADMIN_SITE_URL}",
  backendUrl: "${process.env.BACKEND_URL}",
  apiUrl: "${process.env.API_URL}",
  rssFeedUrl: "${process.env.RSS_FEED_URL}",
  apiKey: "${process.env.API_KEY}",
};
`

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Output generated at ${targetPath}:`);
    console.log(envConfigFile);
  }
});
