type MetadataResponse = {
  metadata?: any;
  error?: any;
};

export default async function getMetadata(
  unfurlEndpoint: string,
  targetUrl: string
): Promise<MetadataResponse> {
  return fetch(`${unfurlEndpoint}?url=${encodeURI(targetUrl)}`)
    .then(async (res) => ({ metadata: await res.json() }))
    .catch((e) => ({ error: '[unfurl] getMetadata failed: ' + e.message }));
}
