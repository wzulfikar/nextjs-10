import { unfurl } from 'unfurl.js';

const isUrl = /https?:\/\//;

const allowOrigins = process.env.UNFURL_ALLOW_ORIGINS?.split(',');

function parseWildcardDomain(domain) {
  if (domain.startsWith('*')) {
    return domain.substr(2).split('.').splice(-2).join('.');
  }
  if (domain.startsWith('localhost')) {
    return 'localhost';
  }
  return domain;
}

/**
 * @description
 * Get open graph metadata from given `url` query. Example:
 *
 * @example
 * ```
 * // Get metadata for github.com
 * fetch('/api/unfurl?url=https://github.com').then(res => res.json()).then(json => console.log(json));
 * ```
 *
 * @see
 * [https://nextjs-10-template.vercel.app/api/unfurl?url=https://github.com](https://nextjs-10-template.vercel.app/api/unfurl?url=https://github.com)
 */
async function handler(req, res) {
  const url = req.query.url;
  const origin = req.headers.origin || req.headers.host;

  // Check origins (wildcard supported)
  let allowOrigin = null;
  allowOrigins.forEach((domain) => {
    if (origin === domain || parseWildcardDomain(origin) === domain) {
      allowOrigin = origin;
    }
  });

  if (allowOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  }

  if (!url) {
    return res.send('Please submit a url with querystring', 400);
  }

  if (!isUrl.test(url)) {
    return res.send('Please only submit http(s) urls', 400);
  }

  try {
    const result = await unfurl(url);
    res.send(result);
  } catch (err) {
    res.send('unfurl failed: ' + err.message);
  }
}

export default handler;
