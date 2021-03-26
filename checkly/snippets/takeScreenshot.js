// [CHECKLY] Omit these lines when adding to checkly
const wait = require('./wait.js');

async function takeScreenshot({
  baseUrl,
  playwright,
  driver,
  viewport,
  device = undefined,
  path = '/',
  screenshotBasePath = '',
  locale,
}) {
  // Separator for suffix
  const separator = '_';

  // Suffix for screenshot name.
  // Example: _.chromium.1280x1280.no-device.jpg
  const suffix = `--${driver}${separator}${viewport.width}x${
    viewport.height
  }${separator}${device || 'no-device'}${separator}${locale}`;

  const name = path.replace(/\//g, '_') + `${suffix}.jpg`;

  const options = {
    path: screenshotBasePath + name,
    fullPage: true,
  };

  const browser = await playwright[driver].launch();
  const ctx = await browser.newContext({
    ...(device ? playwright.devices[device] : {}),
    locale,
  });
  const page = await ctx.newPage();

  await page.setViewportSize(viewport);
  await page.goto(baseUrl + path);

  // Wait 2 seconds for additional network requests
  await wait(2000);

  await page.screenshot(options);
  await browser.close();

  console.log('[INFO] screenshot done:', name);
}

// [CHECKLY] Omit below lines when adding to checkly
module.exports = takeScreenshot;
