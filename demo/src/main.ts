import * as standardIconsModule from '@tylertech/tyler-icons/standard';
import * as extendedIconsModule from '@tylertech/tyler-icons/extended';
import * as customIconsModule from '@tylertech/tyler-icons/custom';
import { type IChipComponent, type IChipSetComponent, type IChipSelectEventData } from '@tylertech/forge';
import { debounce } from '@tylertech/forge-core';

const standardIcons = Object.values(standardIconsModule);
const extendedIcons = Object.values(extendedIconsModule);
const customIcons = Object.values(customIconsModule);

console.log('Standard set:', standardIcons);
console.log('Extended set:', extendedIcons);
console.log('Custom set:', customIcons);

const countLabel = document.querySelector('#icon-count') as HTMLElement;
let selectedIconSet = 'standard';

declare type ITylerIcon = standardIconsModule.ITylerIconStandard | extendedIconsModule.ITylerIconExtended | customIconsModule.ITylerIconCustom

function buildIconCard(icon: ITylerIcon, cssClass: string): HTMLDivElement {
  const iconCard = document.createElement('div');
  iconCard.classList.add('icon-card');
  iconCard.appendChild(buildSVGElement(icon));
  iconCard.appendChild(buildFontElement(icon, cssClass));
  iconCard.appendChild(document.createTextNode(icon.name));
  return iconCard;
}

function buildSVGElement(icon: ITylerIcon): SVGElement {
  const div = document.createElement('div');
  div.innerHTML = icon.data;
  return div.querySelector('svg') || document.createElementNS('http://www.w3.org/2000/svg', 'path');
}

function buildFontElement(icon: ITylerIcon, cssClass: string): HTMLElement {
  const i = document.createElement('i');
  i.classList.add(cssClass);
  i.style.color = 'red';
  // i.classList.add(`${cssClass}-${icon.name}`);
  i.textContent = icon.name;
  return i;
}

function buildIcons(): void {
  switch (selectedIconSet) {
    case 'standard':
      buildIconList(standardIcons, 'tyler-icons');
      break;
    case 'extended':
      buildIconList(extendedIcons, 'tyler-icons-ext');
      break;
    case 'custom':
      buildIconList(customIcons, 'tyler-icons-custom');
      break;
  }
}

function buildIconList(iconSet: any[], cssClass: string): void {
  const iconList = document.querySelector('.icon-list') as HTMLElement;
  iconList.innerHTML = '';
  iconSet.forEach((icon: ITylerIcon) => iconList.appendChild(buildIconCard(icon, cssClass)));
  countLabel.textContent = `${iconSet.length}`;
}

function buildFilteredIconList(): void {
  const iconSet = getSelectedIconSet();
  const newIconSet = iconSet.filter((icon: ITylerIcon) => (icon.name as string).includes(searchField.value));
  buildIconList(newIconSet, 'tyler-icons');
}

function getSelectedIconSet(): any[] {
  switch (selectedIconSet) {
    case 'standard':
      return standardIcons;
    case 'extended':
      return extendedIcons;
    case 'custom':
      return customIcons;
  }
  return [];
}

// Handle searching
const searchField = document.querySelector('input') as HTMLInputElement;
searchField.addEventListener('keydown', debounce(buildFilteredIconList, 500));

// Listen for clear button
const clearButton = document.querySelector('#clear-button') as HTMLButtonElement;
clearButton.addEventListener('click', () => {
  searchField.value = '';
  buildIcons();
});

// Listen for chip-set changes
const chipSet = document.querySelector('#icon-set-options') as IChipSetComponent;
chipSet.addEventListener('forge-chip-select', (evt: CustomEvent<IChipSelectEventData>) => {
  selectedIconSet = evt.detail.value;

  const chips = Array.from(chipSet.querySelectorAll('forge-chip')) as IChipComponent[];
  chips.filter(chip => chip.value !== selectedIconSet).forEach(chip => chip.selected = false);

  if (searchField.value.trim().length) {
    return buildFilteredIconList();
  }

  buildIcons();
});

buildIcons();
