import { Transition } from '@headlessui/react';

import { TransitionProps } from './types';

export default function Rotate90Transition({
  show,
  appear = undefined,
  children,
}: TransitionProps) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="transition ease-out duration-300"
      enterFrom="transform rotate-0"
      enterTo="transform rotate-90"
      leave="transition ease-in duration-200"
      leaveFrom="transform rotate-90"
      leaveTo="transform rotate-0"
    >
      {children}
    </Transition>
  );
}
