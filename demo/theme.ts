const themeToggleButton = document.querySelector('#theme-toggle-button');
const themeToggleIcon = document.querySelector('#theme-toggle-icon');

type Theme = 'light' | 'dark';

const THEME_KEY = '.TylerIcons.Theme';
const THEME_ATTR = 'data-theme';

function setDarkMode(): void {
  localStorage.setItem(THEME_KEY, 'dark');
  document.documentElement.setAttribute(THEME_ATTR, 'dark');
  themeToggleIcon.setAttribute('name', 'wb_sunny');
}

function setLightMode(): void {
  localStorage.setItem(THEME_KEY, 'light');
  document.documentElement.setAttribute(THEME_ATTR, 'light');
  themeToggleIcon.setAttribute('name', 'brightness_3');
}

function setTheme(theme: Theme): void {
  if (theme === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
  }
}

themeToggleButton.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute(THEME_ATTR) as Theme;
  setTheme(theme === 'light' ? 'dark' : 'light');
});

const localStorageTheme = localStorage.getItem(THEME_KEY) as Theme;
setTheme(localStorageTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));