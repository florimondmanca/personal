// Generate http2.js config file

const fs = require('fs');
const path = require('path');
const JSDOM = require('jsdom').JSDOM;

const DIST_FOLDER = path.join(__dirname, '../', 'dist');
const INDEX_DOT_HTML = path.join(DIST_FOLDER, 'browser', 'index.html');
const OUTPUT = path.join(DIST_FOLDER, 'server', 'http2.config.js');

/** Return whether an HTML element refers to a local script.
Examples:
- <script src="http://cdn.com/script.js"> => false
- <script src="script.js"> => true
*/
const isLocal = (element) => {
  const href = getHref(element);
  return href ? !href.startsWith('http') : false;
};

const getHref = (element) => {
  return element.getAttribute('src') || element.getAttribute('href');
}

const getLinkHeader = (root) => {
  const links = [];

  // Find all scripts and stylesheets.
  // "as" attribute corresponds to the HTML as property defined
  // in the rel="preload" spec.
  // See: https://w3c.github.io/preload/#as-attribute
  const elementGroups = [{
      as: 'script',
      elements: [...root.querySelectorAll('script')]
    },
    {
      as: 'style',
      elements: [...root.querySelectorAll('link[rel="stylesheet"]')]
    },
  ]
  // Remove non-local assets.
  elementGroups.forEach(
    group => group.elements = group.elements.filter(isLocal)
  );
  // Build and push the Link header for each asset.
  elementGroups.forEach(
    group => {
      const as = group.as;
      group.elements.forEach(
        el => {
          const href = getHref(el);
          // Format of Link header items is defined here:
          // https://w3c.github.io/preload/#server-push-http-2
          const header = `</${href}>; rel=preload; as=${as}`;
          console.log(`Add ${header}`);
          links.push(header);
        }
      );
    }
  );
  return links.join(', ');
};

const write = (location, contents, callback) => {
  fs.writeFile(location, contents, (err) => {
    if (err) {
      throw err;
    }
    if (callback) { callback(); }
  })
};

const main = (location) => {
  console.log(`Reading index.html from ${location}...`);
  fs.readFile(location, (err, data) => {
    if (err) {
      throw err;
    }
    // Read buffer as string
    const html = data.toString('utf8');

    // See: https://www.npmjs.com/package/jsdom
    const dom = new JSDOM(html);
    const root = dom.window.document;

    const config = {
      linkHeader: getLinkHeader(root),
    };
    const configString = JSON.stringify(config, null, 4);

    const outputContents = `module.exports = ${configString};\n`;
    write(OUTPUT, outputContents, () => {
      console.log(`Successfully generated HTTP/2 config file at ${OUTPUT}`);
      console.log(outputContents);
    });

  });
};

main(INDEX_DOT_HTML);
