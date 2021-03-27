import { Transition } from '@headlessui/react';

export default function FadeInTransition({
  show,
  appear = undefined,
  duration = 'duration-200',
  children,
}) {
  return (
    <Transition
      show={show}
      appear={appear}
      enter={`transition-opacity ${duration}`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`transition-opacity ${duration}`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
