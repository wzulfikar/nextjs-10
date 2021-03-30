import { FiExternalLink } from 'react-icons/fi';

export default function GridCell({
  title = undefined,
  url = undefined,
  colspan = '',
  children,
}) {
  return (
    <div
      className={`${colspan} group bg-gray-300 dark:bg-gray-700 p-4 pt-8 mb-3 sm:mb-0 relative`}
    >
      {title && (
        <span className="absolute text-gray-800 dark:text-gray-400 top-1 text-sm font-medium">
          {title}
        </span>
      )}
      {url && (
        <a
          className="absolute hidden group-hover:block text-gray-800 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 right-2 top-1.5"
          rel="noopener noreferrer"
          href={url}
          target="_blank"
        >
          <FiExternalLink />
        </a>
      )}
      {children}
    </div>
  );
}
