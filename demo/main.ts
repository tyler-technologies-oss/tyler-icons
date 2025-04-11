import { defineAppBarComponent, defineAppBarSearchComponent, defineCardComponent, defineIconComponent, defineScaffoldComponent, IconRegistry, IIcon } from '@tylertech/forge';

defineAppBarComponent();
defineAppBarSearchComponent();
defineIconComponent();
defineScaffoldComponent();
defineCardComponent();

import * as iconsModule from '../tyler-icons.mjs';

const allIcons = Object.values(iconsModule) as IIcon[];
IconRegistry.define(allIcons);

console.log('Icons:', allIcons);

const countLabel = document.querySelector('#icon-count') as HTMLElement;

function buildIconCard(icon: IIcon): HTMLDivElement {
  const iconCard = document.createElement('div');
  iconCard.classList.add('icon-card');
  iconCard.appendChild(buildIconElement(icon));
  iconCard.appendChild(document.createTextNode(icon.name));
  return iconCard;
}

function buildIconElement(icon: IIcon): HTMLElement {
  const forgeIcon = document.createElement('forge-icon');
  forgeIcon.name = icon.name;
  return forgeIcon;
}

function buildIconList(icons: IIcon[]): void {
  const iconList = document.querySelector('.icon-list') as HTMLElement;
  iconList.innerHTML = '';
  icons.forEach((icon: IIcon) => iconList.appendChild(buildIconCard(icon)));
  countLabel.textContent = `${icons.length}`;
}

function buildFilteredIconList(): void {
  const filteredIcons = allIcons.filter(icon => icon.name.includes(searchField.value));
  buildIconList(filteredIcons);
}

// Handle searching
const searchField = document.querySelector('input') as HTMLInputElement;
searchField.addEventListener('keydown', buildFilteredIconList);

// Listen for clear button
const clearButton = document.querySelector('#clear-button') as HTMLButtonElement;
clearButton.addEventListener('click', () => {
  searchField.value = '';
  buildIconList(allIcons);
});

// Build the initial icon list
buildIconList(allIcons);
