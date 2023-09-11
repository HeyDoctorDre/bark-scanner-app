export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme: 'light' | 'dark') => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
