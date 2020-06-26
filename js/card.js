'use strict';

(function () {
  window.createCard = function (cardView) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    var avatar = card.querySelector('.popup__avatar');
    avatar.src = cardView.author.avatar;

    var title = card.querySelector('.popup__title');
    title.textContent = cardView.offer.title;


    var address = card.querySelector('.popup__text--address');
    address.textContent = cardView.offer.address;

    var price = card.querySelector('.popup__text--price');
    price.textContent = cardView.offer.price + ' ₽/ночь';

    var offerType = card.querySelector('.popup__type');
    offerType.textContent = (offerType, window.USER_CHOICE);

    var capacity = card.querySelector('.popup__text--capacity');
    var cardText = (cardView.offer.rooms, cardView.offer.guests);
    capacity.textContent = cardText;

    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + cardView.offer.checkin + ', выезд до ' + cardView.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.textContent = (cardView.offer.FACILITIES);

    var description = card.querySelector('.popup__description');
    description.textContent = cardView.offer.description;

    var photos = card.querySelector('.popup__photos');
    photos.innerHTML = window.addPhoto(cardView.offer.photos);

    return card;
  };

  window.renderCard = function (card) {
    var mapFiltersContainer = window.map.querySelector('.map__filters-container');
    window.map.insertBefore(card, mapFiltersContainer);
  };
})();
