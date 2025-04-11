const themeToggleButton = document.querySelector('#theme-toggle-button');
const themeToggleIcon = document.querySelector('#theme-toggle-icon');

type Theme = 'light' | 'dark';

function setDarkMode(): void {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleIcon.setAttribute('name', 'wb_sunny');
}

function setLightMode(): void {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggleIcon.setAttribute('name', 'brightness_3');
}

function setTheme(theme: Theme): void {
  if (theme === 'light') {
    setDarkMode();
  } else {
    setLightMode();
  }
}

themeToggleButton.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') as Theme;
  setTheme(theme);
});

const browserTheme = window.matchMedia('(prefers-color-scheme: dark)');
setTheme(browserTheme.matches ? 'dark' : 'light');