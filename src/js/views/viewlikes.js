import { elements } from "./elements";
import {limitTitle} from './viewsearch';
export const ToggleChange = (isLiked) => {
    const likeVal = isLiked? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${likeVal}`);
}
export const LikesMenu = (totallikes) => {
    
    elements.likesMenu.style.visibility = totallikes>0 ? 'visible':'hidden';
}

export const displayLikes = (likes) => {
    const like = `
                        <li>
                            <a class="likes__link" href='${likes.id}'>
                                <figure class="likes__fig">
                                    <img src="${likes.image}" alt="Test">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${limitTitle(likes.title)}</h4>
                                    <p class="likes__author">${likes.author}</p>
                                </div>
                            </a>
                        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend',like);
}

export const removeLikes = (id) => {
    const deleteItem = document.querySelector(`.likes__link[href*="${id}"]`);
    if(deleteItem) deleteItem.parentElement.removeChild(deleteItem);
}