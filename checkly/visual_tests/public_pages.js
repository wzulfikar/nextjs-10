const playwright = require('playwright');

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  console.log("[ERROR] please provide `BASE_URL` as environment variable")
  process.exit(1)
}

// Use `LOCAL=true` when running in local machine. Example:
// `LOCAL=true BASE_URL=mydomain.com MORE_DRIVERS=firefox,webkit node ./checkly/visual_tests/public_pages.js`
const isLocal = process.env.LOCAL;
const moreDrivers = process.env.MORE_DRIVERS?.split(',') || [];

// [CHECKLY] Omit these lines when adding to checkly
const viewports = require('../snippets/viewports_desktop.js');
const takeScreenshots = require('../snippets/takeScreenshots.js');
const publicPages = require('../snippets/publicPages.js');

// [CHECKLY] Uncomment these lines when adding to checkly
// {{> function_takeScreenshots}}
// {{> viewports_desktop}}

// Define what drivers, devices, and viewports to check
const drivers = ['chromium', ...moreDrivers];
const devices = [null];
const locales = ['en-US'];

// Paths to check (max 10 paths if using checkly)
const paths = [
  ...(typeof publicPages !== 'undefined' ? publicPages : []), // Use `typeof` to handle optional variables
];

(async () => {
  await takeScreenshots({baseUrl,
    playwright,
    drivers,
    devices,
    viewports,
    paths,
    locales,
    screenshotBasePath: isLocal ? './checkly/_screenshots/' : '',
  });
})();
