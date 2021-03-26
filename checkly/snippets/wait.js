const wait = (time) =>
  new Promise(function (resolve) {
    setTimeout(resolve, time);
  });

// [CHECKLY] Omit these lines when adding to checkly
module.exports = wait;
