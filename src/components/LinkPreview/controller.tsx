import { memo } from 'react';
import { useAsync } from 'react-use';

import getMetadata from '@src/lib/unfurl/getMetadata';
import LinkPreview from './elements';

type UnfurlProps = {
  url: string;
};

/**
 * `Unfurl` fetches url metadata and renders it using `LinkPreview` component.
 */
function LinkPreviewController({ url }: UnfurlProps) {
  const { value, loading, error } = useAsync(
    () => getMetadata('/api/unfurl', url),
    [url]
  );

  return (
    <LinkPreview
      url={url}
      error={error?.message || value?.error}
      loading={loading}
      title={value?.metadata.title}
      description={value?.metadata.description}
      images={value?.metadata.open_graph?.images}
    />
  );
}

export default memo(LinkPreviewController);
