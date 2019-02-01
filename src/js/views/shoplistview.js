import {elements} from './elements';

export const addItemShop = (item) =>{
    //console.log(item.id)
    const additem = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value='${item.count}' step=${item.count} class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>    
    `;
    elements.shopList.insertAdjacentHTML('beforeend',additem);
}
export const deleteItemShop = (id) => {
    const deleteItem = document.querySelector(`[data-itemid="${id}"]`)
    deleteItem.parentElement.removeChild(deleteItem);
}