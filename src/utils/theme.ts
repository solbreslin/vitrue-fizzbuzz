import { shuffle } from 'lodash';

export const THEME_COLORS = ['blue', 'green', 'red', 'yellow'];
export const setRandomTheme = () => {
  const colors = shuffle([...THEME_COLORS]);

  document.documentElement.style.setProperty(
    '--theme-color-1',
    `var(--color-${colors[0]})`
  );

  document.documentElement.style.setProperty(
    '--theme-color-2',
    `var(--color-${colors[1]})`
  );
};
export const resetTheme = () => {
  document.documentElement.style.setProperty(
    '--theme-color-1',
    `var(--color-grey-light)`
  );

  document.documentElement.style.setProperty(
    '--theme-color-2',
    `var(--color-black)`
  );
};
