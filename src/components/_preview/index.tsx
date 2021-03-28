import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import logger from '@src/lib/logger';
import ErrorBoundary from '@src/components/base/ErrorBoundary';
import lazyload from '@src/components/base/lazyload';

import DisGui from './DisGui';
import components from './components';

const Error404 = lazyload(() => import('@src/components/base/Error404'));

// Sort components by key
const componentKeys = Object.keys(components).sort();

/**
 * @description
 * Preview components registered in `components` map.
 *
 * @see
 * https://next-10-template.vercel.app/_preview/SanityCheck
 */
export default function PreviewComponent() {
  const bgColors = ['white', 'whitesmoke', 'blue', 'green', 'transparent'];

  const router = useRouter();
  const { component, hideDisgui } = router.query;

  const [guiData, setGuiData] = useState({
    component: component,
    bgColor: bgColors[0],
    darkMode: false,
    wrapper: null,
  });

  const [previewProps, setPreviewProps] = useState({});

  // Extract Component, optional props, and optional wrapper class from `./components`.
  // Fallback to `{}` to handle invalid component (will result in 404).
  const { Component, props = {}, wrapper = null, githubUrl } =
    components[(guiData.component || component) as string] || {};

  useEffect(() => {
    if (guiData.component !== router.query.component) {
      setGuiData((data) => ({ ...data, component: router.query.component }));
    }
  }, [router.query.component]);

  // Render nothing if `router.query.component` is not ready yet
  if (!component) return null;

  // Render 404 page if there is no valid `Component`
  if (!Component) return <Error404 />;

  // Disable preview in production
  if (window.location.href.startsWith(process.env.NEXT_PUBLIC_PRODUCTION_URL))
    return <Error404 />;

  function resetPreviewProps() {
    setPreviewProps(() => props);
  }

  function onChangeDisGui(changeset) {
    logger.info('DisGui changed:', changeset);
    setGuiData((data) => ({ ...data, ...changeset }));
    if (changeset.component && changeset.component !== guiData.component) {
      router.push(`/_preview/${changeset.component}`, undefined, {
        shallow: true,
      });
    }
  }

  function onChangePreviewProps(changeset) {
    setPreviewProps((val) => ({ ...val, ...changeset }));
    logger.info('Preview Props changed:', changeset);
  }

  const Wrapper = ({ children }) => (
    <div
      id="preview-wrapper"
      className={`${guiData.wrapper || wrapper} ${
        guiData.darkMode ? 'dark' : ''
      }`}
    >
      {children}
    </div>
  );

  const mergePreviewProps = { ...props, ...previewProps };

  const PreviewComponent = () => <Component {...mergePreviewProps} />;

  return (
    <>
      <div style={{ backgroundColor: guiData.bgColor }}>
        <Wrapper>
          <ErrorBoundary ctx="PreviewComponent" onReset={resetPreviewProps}>
            <PreviewComponent />
          </ErrorBoundary>
        </Wrapper>
      </div>

      <div style={{ position: 'relative', zIndex: 999 }}>
        {router.query && !hideDisgui && !mergePreviewProps.hideDisgui && (
          <DisGui
            bgColors={bgColors}
            componentKeys={componentKeys}
            openInGithub={githubUrl}
            value={{ ...guiData, wrapper: guiData.wrapper || wrapper }}
            onChange={onChangeDisGui}
            previewProps={mergePreviewProps}
            onChangePreviewProps={onChangePreviewProps}
          />
        )}
      </div>
    </>
  );
}
