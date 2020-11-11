import { completeIconSet, ITylerIcon, tylIcon360 } from '@tylertech/tyler-icons';

console.log('Complete set', completeIconSet);

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

function buildIconList(iconSet: ITylerIcon[]) {
    const iconList = document.querySelector('.icon-list') as HTMLElement;
    iconList.innerHTML = '';
    iconSet.forEach((icon: ITylerIcon) => iconList.appendChild(buildIconCard(icon)));
}

const searchField = document.querySelector('input') as HTMLInputElement;
searchField.addEventListener('keydown', function() {
    const newIconSet = completeIconSet.filter((icon: ITylerIcon) => (icon.name as string).includes(searchField.value));
    buildIconList(newIconSet);
});

buildIconList(completeIconSet);
