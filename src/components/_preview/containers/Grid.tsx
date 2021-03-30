import { FiExternalLink } from 'react-icons/fi';

import getGithubUrl from '../getGithubUrl';

Grid.Cell = Cell;

/**
 * @description
 * Utility component to wrap preview components inside a grid cell.
 *
 * @example
 * <Grid>
 *   <Grid.Cell title="Calendar" url="https://ant.design/components/calendar">
 *     <Calendar />
 *   </Grid.Cell>
 * </Grid>
 */
function Cell({ title, url, colspan = '', children }) {
  return (
    <div
      className={`${colspan} group bg-gray-300 dark:bg-gray-700 p-4 pt-8 mb-3 sm:mb-0 relative`}
    >
      <div className="absolute text-gray-700 dark:text-gray-400 top-1 text-sm font-medium w-full">
        <a title="Open in Github" href={getGithubUrl(title)}>
          {title}
        </a>
        <a
          title="Go to documentation site"
          className="absolute top-0.5 right-6 hidden group-hover:block text-gray-800 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
          rel="noopener noreferrer"
          href={url}
          target="_blank"
        >
          <FiExternalLink />
        </a>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function Grid({ title, children }) {
  return (
    <div>
      <h1 className="text-center text-xl text-gray-800 dark:text-gray-300 font-semibold">
        {title}
      </h1>
      <div className="sm:grid sm:grid-cols-3 gap-3 px-3 max-w-6xl mt-4">
        {children}
      </div>
    </div>
  );
}
