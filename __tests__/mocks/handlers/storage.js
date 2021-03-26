let storage = {};

function put(key, fn) {
  if (!process.browser) return;

  const data = fn(get(key));

  console.log('[msw] storage.put:', key, data);

  storage[key] = data;
}

function get(key) {
  if (!process.browser) return;

  console.log('[msw] storage.get:', key, storage[key]);

  return storage[key];
}

module.exports.get = get;
module.exports.put = put;
