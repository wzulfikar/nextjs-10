import { Transition } from '@headlessui/react';

import { TransitionProps } from './types';

export default function CollapseTransition({
  show,
  appear = undefined,
  children,
}: TransitionProps) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="transition-all ease-in-out duration-300 sm:duration-300"
      enterFrom="opacity-0 max-h-0"
      enterTo="opacity-100 max-h-screen"
      leave="transition-all ease-in-out duration-300 sm:duration-300"
      leaveFrom="opacity-100 max-h-screen"
      leaveTo="opacity-0 max-h-0"
    >
      {children}
    </Transition>
  );
}
