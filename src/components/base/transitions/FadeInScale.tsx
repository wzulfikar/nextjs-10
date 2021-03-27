import { Transition } from '@headlessui/react';

import { TransitionProps } from './types';

export default function FadeInScaleTransition({
  show,
  appear = undefined,
  children,
}: TransitionProps) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
}
