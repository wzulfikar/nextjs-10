import _useDarkMode from 'use-dark-mode';

export default function useDarkMode(initialValue: boolean) {
  return _useDarkMode(initialValue, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });
}
