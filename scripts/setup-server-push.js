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
const isLocal = (element, type) => {
  const href = getHref(element, type);
  return href ? !href.startsWith('http') : false;
};

const setupScriptPreload = (scriptElement) => {
  scriptElement.attributes['rel'] = 'preload';
};

const getHref = (element, as) => {
  switch (as) {
    case 'script':
      return element.getAttribute('src');
    case 'stylesheet':
      return element.getAttribute('href');
    default:
      throw new Error('Unknown value for "as": ' + as);
  }
};


const preloadLinkExists = (root, href) => {
  return !!root.querySelector(`link[rel="preload"][href="${href}"]`);
}

const preloadLinkRepr = (href, as) => {
  return `<link href="${href}" rel="preload" as="${as}">`;
}

const addLink = (root, sourceElement, as) => {
  const href = getHref(sourceElement, as);
  const repr = preloadLinkRepr(href, as);

  if (preloadLinkExists(root, href)) {
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

const updateLink = (linkElement, as) => {
  linkElement.setAttribute('rel', 'preload');
  linkElement.setAttribute('as', as);
  const href = getHref(linkElement, as);
  console.log(`Updated <link href="${href}" rel="preload" as="${as}">`);
}

const setUpLinks = (root) => {
  // Setup preloading of generated scripts
  let scripts = [...root.querySelectorAll('script')];
  scripts.filter((el => isLocal(el, 'script'))).forEach(
    el => addLink(root, el, 'script')
  );

  // Setup preloading of stylesheets
  let styles = [...root.querySelectorAll('link[rel="stylesheet"]')];
  styles.filter((el => isLocal(el, 'stylesheet'))).forEach(
    el => updateLink(el, 'stylesheet')
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
