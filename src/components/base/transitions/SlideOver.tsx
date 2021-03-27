import { Transition } from '@headlessui/react';

import { TransitionProps } from './types';

export default function SlideOverTransition({
  show,
  appear = undefined,
  children,
}: TransitionProps) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      {children}
    </Transition>
  );
}
