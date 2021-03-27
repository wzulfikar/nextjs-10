import lazyload from '@src/components/base/lazyload';

type ComponentOptions = {
  // Wrap component with wrapper class (eg. `max-w-md`)
  wrapper?: string;

  // Pass props to underlying component. To keep the preview
  // component simple, only expose props that you want to control
  // from the preview page.
  props?: any;
};

const loadComponent = (component, opts?: ComponentOptions) => ({
  Component: lazyload(component),
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
    wrapper: wrapper.center,
    props: { text: 'Hello world, it works!' },
  },
  LottiePreview: loadComponent(() => import('./containers/LottiePreview'), {
    wrapper: wrapper.center,
    props: {
      animationUrl:
        'https://assets5.lottiefiles.com/packages/lf20_mc6rrdlr.json',
    },
  }),
  Loader_DotsLoader: loadComponent(
    () => import('@src/components/base/DotsLoader'),
    {
      props: { color: 'gray', size: 'sm', align: 'center' },
    }
  ),
  ContentPlaceholder: loadComponent(
    () => import('./containers/ContentPlaceholder'),
    {
      props: { text: 'This is a placeholder', circle: false },
    }
  ),
  TransitionPreview: loadComponent(
    () => import('./containers/TransitionsPreview'),
    {
      wrapper: wrapper.center,
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
  TailwindPreview: loadComponent(() => import('./containers/TailwindPreview')),
  AntdPreview: loadComponent(() => import('./containers/AntdPreview'), {
    wrapper: wrapper.center,
  }),
  LinkPreview: loadComponent(() => import('@src/components/LinkPreview'), {
    wrapper: wrapper.center,
    props: { url: 'https://github.com' },
  }),
};

export default components;
