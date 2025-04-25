import { defineAppBarComponent, defineAppBarSearchComponent, defineCardComponent, defineIconComponent, defineScaffoldComponent, IAppBarComponent, IBadgeComponent, IconRegistry, IIcon } from '@tylertech/forge';
import { debounce } from '@tylertech/forge-core';

defineAppBarComponent();
defineAppBarSearchComponent();
defineIconComponent();
defineScaffoldComponent();
defineCardComponent();

import * as iconsModule from '../tyler-icons-metadata.json' with { type: 'json' };

const ICONS_PAGE_SIZE = 100;
const INFINITE_SCROLL_THRESHOLD = 50;
const NUMBER_FORMAT = new Intl.NumberFormat('en-US');

const _allIcons = Object.values(iconsModule.default) as IIcon[];
IconRegistry.define(_allIcons);

let visibleIcons = _allIcons.slice(0, ICONS_PAGE_SIZE);
let filteredIcons = _allIcons;

console.log('Icons:', _allIcons);

const appBar = document.querySelector('#app-bar') as IAppBarComponent;
appBar.titleText = `Tyler Icons (${NUMBER_FORMAT.format(_allIcons.length)})`;

const iconList = document.querySelector('.icon-list') as HTMLElement;
const contentHeader = document.querySelector('.content-header') as HTMLElement;

// Handle infinite scroll
const scrollContainer = document.querySelector('#scroll-container') as HTMLElement;
scrollContainer.addEventListener('scroll', () => {
  const isScrolledBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - INFINITE_SCROLL_THRESHOLD;
  if (isScrolledBottom && filteredIcons.length > visibleIcons.length) {
    const currentLength = visibleIcons.length;
    const nextIcons = filteredIcons.slice(currentLength, currentLength + ICONS_PAGE_SIZE);
    nextIcons.forEach((icon: IIcon) => iconList.appendChild(buildIconCard(icon)));
    visibleIcons = [...visibleIcons, ...nextIcons];
  }
}, { passive: true });

function buildIconCard(icon: IIcon): HTMLDivElement {
  const iconCard = document.createElement('div');
  iconCard.classList.add('icon-card');
  iconCard.appendChild(buildIconElement(icon));

  const iconText = document.createElement('span');
  iconText.textContent = icon.name;
  iconText.classList.add('forge-typography--label2', 'icon-name');
  iconCard.appendChild(iconText);

  return iconCard;
}

function buildIconElement(icon: IIcon): HTMLElement {
  const forgeIcon = document.createElement('forge-icon');
  forgeIcon.name = icon.name;
  return forgeIcon;
}

function renderIcons(icons: IIcon[]): void {
  iconList.innerHTML = '';
  if (icons.length === 0) {
    const noIconsMessage = document.createElement('div');
    noIconsMessage.classList.add('forge-typography--label2');
    noIconsMessage.textContent = 'No icons found';
    iconList.appendChild(noIconsMessage);
    return;
  }
  icons.forEach((icon: IIcon) => iconList.appendChild(buildIconCard(icon)));
}

function handleFilter(): void {
  const searchValue = searchField.value.trim().toLowerCase();
  filteredIcons = _allIcons.filter((icon: IIcon) => icon.name.toLowerCase().includes(searchValue));
  visibleIcons = filteredIcons.slice(0, ICONS_PAGE_SIZE);
  renderIcons(visibleIcons)
  setFilteredBadge();

  if (scrollContainer.scrollTop > 0) {
    scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function setFilteredBadge(): void {
  let filteredBadge = document.querySelector('#filtered-badge') as IBadgeComponent | null;
  if (searchField.value.trim().length) {
    if (!filteredBadge) {
      filteredBadge = document.createElement('forge-badge') as IBadgeComponent;
      filteredBadge.id = 'filtered-badge';
      contentHeader.appendChild(filteredBadge);
    }
    filteredBadge.textContent = `Filtered: ${NUMBER_FORMAT.format(filteredIcons.length)}`;
  } else {
    filteredBadge?.remove();
  }
}

// Handle searching
const searchField = document.querySelector('input') as HTMLInputElement;
searchField.addEventListener('keydown', debounce(handleFilter, 300));

// Listen for clear button
const clearButton = document.querySelector('#clear-button') as HTMLButtonElement;
clearButton.addEventListener('click', () => {
  searchField.value = '';
  filteredIcons = _allIcons;
  visibleIcons = _allIcons.slice(0, ICONS_PAGE_SIZE);
  renderIcons(visibleIcons);
  setFilteredBadge();
});

// Render initial icons
renderIcons(visibleIcons);
