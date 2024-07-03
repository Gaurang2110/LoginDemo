import {createContext} from 'react';

export const themes = {
  light: {
    backgroundColor: '#f2f2f2',
    textColor: '#000000',
    cardColor: '#d3d3d3',
    lightColor: '#FFFFF7',
  },
  dark: {
    backgroundColor: '#020202',
    textColor: '#ffffff',
    cardColor: '#A9A9A9',
    lightColor: '#454545',
  },
};

export const ThemeContext = createContext(themes.light);
