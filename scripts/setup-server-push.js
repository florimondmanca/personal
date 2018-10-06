// Modify index.html to configure server push on styles and js files

const fs = require('fs');
const path = require('path');
const JSDOM = require('jsdom').JSDOM;

const INDEX_DOT_HTML = path.join(__dirname, '../', 'dist', 'browser', 'index.html');

/** Return whether an HTML element refers to a local script.

Examples:
- <script src="http://cdn.com/script.js"> => false
- <script src="script.js"> => true
*/
const isLocal = (element) => {
  const href = getHref(element);
  return href ? !href.startsWith('http') : false;
};

const setupScriptPreload = (scriptElement) => {
  scriptElement.attributes['rel'] = 'preload';
};

const getHref = (element) => {
  return element.getAttribute('src') || element.getAttribute('href');
};

const linkExists = (root, href) => {
  return !!root.querySelector(`link[rel="preload"][href="${href}"]`);
}

const linkRepr = (href, as) => {
  return `<link href="${href}" rel="preload" as="${as}">`;
}

const addLink = (root, sourceElement, as) => {
  const href = getHref(sourceElement);
  const repr = linkRepr(href, as);

  if (linkExists(root, href)) {
    console.log(`Skipped ${repr} because it already exists`);
    return;
  }

  const linkElement = root.createElement('link');
  linkElement.setAttribute('rel', 'preload');
  linkElement.setAttribute('as', as);
  linkElement.setAttribute('href', href);

  root.querySelector('head').appendChild(linkElement);

  console.log(`Added ${repr}`);
}

const setUpLinks = (root) => {
  // Setup preloading of generated scripts
  let scripts = [...root.querySelectorAll('script')];
  scripts.filter(isLocal).forEach(
    el => addLink(root, el, 'script')
  );

  // Setup preloading of stylesheets
  let styles = [...root.querySelectorAll('link[rel="stylesheet"]')];
  styles.filter(isLocal).forEach(
    el => addLink(root, el, 'style')
  );
}

const write = (location, contents, root) => {
  fs.writeFile(location, contents, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully updated ${location} for server push`);
  })
}

const main = (location) => {
  console.log('Setting up HTTP/2 server push on ' + location)
  fs.readFile(location, (err, data) => {
    if (err) {
      throw err;
    }
    // Read buffer as string
    const html = data.toString('utf8');

    // See: https://www.npmjs.com/package/jsdom
    const dom = new JSDOM(html);
    const root = dom.window.document;

    setUpLinks(root);

    // NOTE: outerHTML doesn't get the doctype => add it manually
    const output = '<!doctype html>\n' + root.documentElement.outerHTML;
    write(location, output);
  });
}

main(INDEX_DOT_HTML);
