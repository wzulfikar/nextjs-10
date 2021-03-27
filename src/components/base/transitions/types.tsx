import { ReactNode } from 'react';

export type TransitionProps = {
  show: boolean;
  appear?: boolean;
  duration?: string;
  children: ReactNode;
};
