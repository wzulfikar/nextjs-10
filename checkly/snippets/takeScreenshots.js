// [CHECKLY] Omit these lines when adding to checkly
const takeScreenshot = require('./takeScreenshot.js');

// [CHECKLY] Uncomment these lines when adding to checkly
// {{> function_takeScreenshots}}

async function takeScreenshots({
  baseUrl,
  playwright,
  drivers,
  devices,
  viewports,
  paths,
  locales,
  screenshotBasePath,
}) {
  return paths.map((path) =>
    drivers.map((driver) =>
      devices.map((device) =>
        viewports.map((viewport) =>
          locales.map((locale) =>
            takeScreenshot({
              baseUrl,
              playwright,
              driver,
              device,
              viewport,
              path,
              locale,
              screenshotBasePath,
            })
          )
        )
      )
    )
  );
}

// [CHECKLY] Omit these lines when adding to checkly
module.exports = takeScreenshots;
