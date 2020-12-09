import { completeIconSet as standardIcons, ITylerIcon } from '@tylertech/tyler-icons/standard';
import { completeIconSet as extendedIcons } from '@tylertech/tyler-icons/extended';
import { completeIconSet as customIcons } from '@tylertech/tyler-icons/custom';
import { IChipComponent, IChipSetComponent, IChipSelectEventData } from '@tylertech/tyler-components-web';
import { debounce } from '@tyler-components-web/core';

console.log('Standard set:', standardIcons);
console.log('Extended set:', extendedIcons);
console.log('Custom set:', customIcons);

const countLabel = document.querySelector('#icon-count') as HTMLElement;
let selectedIconSet = 'standard';

function buildIconCard(icon: ITylerIcon): HTMLDivElement {
  const iconCard = document.createElement('div');
  iconCard.classList.add('icon-card');
  iconCard.appendChild(buildSVGElement(icon));
  iconCard.appendChild(document.createTextNode(icon.name));
  return iconCard;
}

function buildSVGElement(icon: ITylerIcon): SVGElement {
  const div = document.createElement('div');
  div.innerHTML = icon.data;
  return div.querySelector('svg') || document.createElementNS('http://www.w3.org/2000/svg', 'path');
}

function buildIcons(): void {
  switch (selectedIconSet) {
    case 'standard':
      buildIconList(standardIcons);
      break;
    case 'extended':
      buildIconList(extendedIcons);
      break;
    case 'custom':
      buildIconList(customIcons);
      break;
  }
}

function buildIconList(iconSet: any[]): void {
  const iconList = document.querySelector('.icon-list') as HTMLElement;
  iconList.innerHTML = '';
  iconSet.forEach((icon: ITylerIcon) => iconList.appendChild(buildIconCard(icon)));
  countLabel.textContent = `${iconSet.length}`;
}

function buildFilteredIconList(): void {
  const iconSet = getSelectedIconSet();
  const newIconSet = iconSet.filter((icon: ITylerIcon) => (icon.name as string).includes(searchField.value));
  buildIconList(newIconSet);
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
chipSet.addEventListener('tcw-chip-select', (evt: CustomEvent<IChipSelectEventData>) => {
  selectedIconSet = evt.detail.value;

  const chips = Array.from(chipSet.querySelectorAll('tcw-chip')) as IChipComponent[];
  chips.filter(chip => chip.value !== selectedIconSet).forEach(chip => chip.selected = false);

  if (searchField.value.trim().length) {
    return buildFilteredIconList();
  }

  buildIcons();
});

buildIcons();
