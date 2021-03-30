import lazyload from '@src/components/base/lazyload';
import _getGithubUrl from '@src/lib/github/getGithubUrl';

type ComponentOptions = {
  // Wrap component with wrapper class (eg. `max-w-md`)
  wrapper?: string;

  // File url to open in github
  githubUrl?: string;

  // Pass props to underlying component. To keep the preview
  // component simple, only expose props that you want to control
  // from the preview page.
  props?: any;
};

const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO;

const getGithubUrl = (previewPath: string) => {
  // Append .tsx extension if not exist
  if (!previewPath.endsWith('.tsx')) {
    previewPath += '.tsx';
  }

  // Resolve absolute import
  if (previewPath.startsWith('@src')) {
    previewPath = previewPath.replace('@src', 'src');
  }

  // Resolve relative path
  if (previewPath.startsWith('./')) {
    previewPath = previewPath.replace('./', 'src/components/_preview/');
  }

  const repoParts = githubRepo.split('/');
  const repoName = repoParts.pop();
  const owner = repoParts.pop();

  return _getGithubUrl({
    owner,
    repo: repoName,
    branch: 'main',
    file: previewPath,
  });
};

const defaultGithubUrl = getGithubUrl('./components.tsx');

const loadComponent = (component, opts?: ComponentOptions) => ({
  Component: lazyload(component),
  githubUrl: opts?.githubUrl,
  wrapper: opts?.wrapper,
  props: opts?.props,
});

// Default wrappers
const wrapper = {
  center: 'bg-gray-200 dark:bg-gray-800 h-full min-h-screen flex xy-center',
};

// Use this map to list out the components that are available for preview.
const components = {
  SanityCheck: {
    Component: ({ text }) => (
      <div className="dark:text-white">
        <b>{text}</b>
      </div>
    ),
    githubUrl: defaultGithubUrl,
    wrapper: wrapper.center,
    props: { text: 'Hello world, it works!' },
  },
  LottiePreview: loadComponent(() => import('./containers/LottiePreview'), {
    wrapper: wrapper.center,
    githubUrl: getGithubUrl('./containers/LottiePreview'),
    props: {
      animationUrl:
        'https://assets5.lottiefiles.com/packages/lf20_mc6rrdlr.json',
    },
  }),
  Loader_DotsLoader: loadComponent(
    () => import('@src/components/base/DotsLoader'),
    {
      githubUrl: getGithubUrl('@src/components/base/DotsLoader'),
      props: { color: 'gray', size: 'sm', align: 'center' },
    }
  ),
  ContentPlaceholder: loadComponent(
    () => import('./containers/ContentPlaceholder'),
    {
      githubUrl: getGithubUrl('./containers/ContentPlaceholder'),
      props: { text: 'This is a placeholder', circle: false },
    }
  ),
  TransitionPreview: loadComponent(
    () => import('./containers/TransitionsPreview'),
    {
      wrapper: wrapper.center,
      githubUrl: getGithubUrl('./containers/TransitionsPreview'),
      props: {
        fadeInTransition: false,
        collapseTransition: false,
        fadeInScaleTransition: false,
        popOutTransition: false,
        rotate90Transition: false,
        slideDownTransition: false,
        slideOverTransition: false,
      },
    }
  ),
  TailwindPreview: loadComponent(() => import('./containers/TailwindPreview'), {
    githubUrl: getGithubUrl('./containers/TailwindPreview'),
  }),
  AntdPreview: loadComponent(() => import('./containers/AntdPreview'), {
    githubUrl: getGithubUrl('./containers/AntdPreview/index.tsx'),
    wrapper: wrapper.center,
  }),
  BaseWebPreview: loadComponent(() => import('./containers/BaseWebPreview'), {
    githubUrl: getGithubUrl('./containers/BaseWebPreview/index.tsx'),
    wrapper: wrapper.center,
  }),
  LinkPreview: loadComponent(() => import('@src/components/LinkPreview'), {
    wrapper: wrapper.center,
    githubUrl: getGithubUrl('@src/components/LinkPreview/index.tsx'),
    props: { url: 'https://github.com' },
  }),
  StripePreview: {
    redirect: '/_preview/StripePreview',
  },
};

export default components;
