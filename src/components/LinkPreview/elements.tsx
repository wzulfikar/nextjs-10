import Link from 'next/link';
import { IoNewspaperOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';

import { BsLink45Deg } from 'react-icons/bs';
import { MdError } from 'react-icons/md';

type LinkPreviewImage = {
  url: string;
};

type LinkPreviewProps = {
  url: string;
  title: string;
  description: string;
  images?: LinkPreviewImage[];
  loading?: boolean;
  error?: string;
};

/**
 * Stateless component that renders its props as link preview.
 */
export default function LinkPreview({
  url,
  title,
  description,
  images,
  loading,
  error,
}: LinkPreviewProps) {
  return (
    <div
      className="relative max-w-lg text-gray-700 dark:text-gray-300"
      aria-label={loading ? 'loading link preview' : 'link preview'}
    >
      <Link href={loading ? '' : url}>
        <a>
          <div className="flex rounded-xl min-w-sm w-full border-gray-300 border">
            <div className="w-32 relative bg-gray-100 dark:bg-gray-700 rounded-l-xl border-r">
              <div className="pt-full" />
              {images?.length > 0 ? (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    width={150}
                    height={150}
                    src={images[0].url}
                    alt={title}
                    className="w-full h-full object-cover rounded-l-xl"
                  />
                </div>
              ) : (
                !loading && (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {error ? (
                      <MdError className="w-6 h-6 text-gray-500" />
                    ) : (
                      <IoNewspaperOutline className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                )
              )}
            </div>
            <div
              className="bg-white dark:bg-gray-800 flex flex-col space-y-0.5 p-3 text-left rounded-r-xl max-w-xs"
              style={{ width: 'calc(100% - 8rem)' }}
            >
              <p className="dark:opacity-90 truncate font-medium mb-1">
                {loading ? (
                  <Skeleton width={150} />
                ) : error ? (
                  'Could not preview link'
                ) : (
                  title
                )}
              </p>
              <p className="dark:opacity-75 text-sm line-clamp-3 leading-snug flex-grow">
                {loading ? <Skeleton count={2} /> : error ? error : description}
              </p>
              <p className="opacity-90 dark:opacity-50 flex items-center pt-0.5">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  url && (
                    <>
                      <BsLink45Deg className="w-4-h-4 mr-1 mt-1" />
                      {new URL(url).hostname.replace('www.', '')}
                    </>
                  )
                )}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
