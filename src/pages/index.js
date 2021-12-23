import { pics } from "../utils/constants.js"
import { Card } from "../component/Card.js";
const galleryGrid = document.querySelector('.gallery__grid');
const ligthbox = document.querySelector('.ligthbox');
const lightboxImage = ligthbox.querySelector('.ligthbox__image');
const cardItem = new Card();

function imageActionsHandler(e) {
  const target = e.target.classList.value;
  const classList = e.target.classList;
  if(target === 'gallery__grid-img') {
    lightBoxHandler(e);
  } else if (target === 'gallery__post-comment') {
    postCommentHandler(e, target);
  } else if(target.includes('gallery__img-like')) {
    likeHandler(target, classList);
  };
  commentIconHandler(classList);
};

function lightBoxHandler(e) {
  lightboxImage.src = e.target.src;
  lightboxImage.alt = e.target.title;
  ligthbox.classList.add('ligthbox_opened');
  document.addEventListener('click', hideLightboxHandler);
  document.addEventListener('keydown', hideLightboxHandler);
  return
};

function likeHandler(target, classList) {
  if (target === 'gallery__img-like') {
    classList.add('gallery__img-like_type_liked');
    return
  } else if (target.includes('gallery__img-like_type_liked')) {
    classList.remove('gallery__img-like_type_liked');
    return
  };
};

function commentIconHandler(classList){
  if(classList.value === 'gallery__comment-btn') {
    classList.add('gallery__comment-btn_type_opened');
    return
  } else if(classList.value.includes('opened')) {
    classList.remove('gallery__comment-btn_type_opened');
    return
  };
};

function postCommentHandler(e) {
    e.preventDefault();
    const comment = e.target.closest('form').querySelector('.gallery__comment-area').value;
    if(!comment) return;
    e.target.closest('ul').prepend(cardItem.setCommentsInfo({ author: 'User', comment }));
    const element = document.getElementById(e.target.getAttribute('for'));
    e.target.closest('form').reset();  
    // element.checked = false;    //можно закрывать автоматически после отправки комментария закрывать секцию с комментами 
};

function hideLightboxHandler(e) {
  const target = e.target.classList.value;

  if(target === 'ligthbox__close-btn' || e.key === 'Escape' || target.includes('ligthbox_opened')) {
    ligthbox.classList.remove('ligthbox_opened');
    document.removeEventListener('click', hideLightboxHandler);
    document.removeEventListener('keydown', hideLightboxHandler);
  };
};

galleryGrid.addEventListener('click', imageActionsHandler);

pics.forEach((el, id) => {
  const card = new Card(); 
  galleryGrid.append(card.createCard({ ...el , id }));
});
