export class Card {
  constructor() {
    this._card = this._getCardTemplate();
    this._commentList  = this._card.querySelector('.gallery__comments-list'); 
  };

  _getCardTemplate() {
    return document.querySelector('.cardTemplate').content.querySelector('.gallery__grid-row').cloneNode(true);
  };

  _getCommentTemplate() {
    return document.querySelector('.comment-template').content.querySelector('.gallery__comment-item').cloneNode(true);
  };

  setCommentsInfo({ author, comment }) {
    const commentItem = this._getCommentTemplate()
    commentItem.querySelector('.gallery__comment-author').textContent = author;
    commentItem.querySelector('.gallery__comment').textContent = comment;
    return commentItem;
  };

  _setCardInfo({ title, link, comments, id }) {
    const commentList  = this._card.querySelector('.gallery__comments-list'); 
    this._card.querySelector('.gallery__grid-img').src = link;
    this._card.querySelector('.gallery__grid-img').alt = title;
    this._card.querySelector('.gallery__img-figcaption').textContent = title;
    this._card.querySelector('.gallery__comment-btn').setAttribute('for', id); 
    this._card.querySelector('.gallery__comment-checkbox').id = id;
    
    comments.forEach(comment => {
      this._commentList.prepend(this.setCommentsInfo(comment));
    });
  };

  createCard(props) {
    this._setCardInfo(props);
    return this._card;
  }
}