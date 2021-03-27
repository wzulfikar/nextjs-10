import { Transition } from '@headlessui/react';

import { TransitionProps } from './types';

export default function SlideDownTransition({
  show,
  appear = undefined,
  children,
}: TransitionProps) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="opacity-0 -translate-y-5"
      enterTo="opacity-100 translate-y-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-5"
    >
      {children}
    </Transition>
  );
}
