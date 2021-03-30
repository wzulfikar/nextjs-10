import linkifyIt from 'linkify-it';

let linkify = null;

/**
 * Parse http(s) urls from text
 */
export default function parseUrls(text: string): linkifyIt.Match[] | null {
  if (!linkify) linkify = linkifyIt();

  return linkify.match(text)?.filter(({ url }) => url.startsWith('http'));
}
