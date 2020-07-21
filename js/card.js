'use strict';

(function () {

  window.addPhoto = function (photos) {
    var img = '';

    for (var i = 0; i < photos.length; i++) {
      img += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    return img;
  };

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
    var ruType = '';
    if (cardView.offer.type === 'flat') {
      ruType = 'Квартира';
    }
    if (cardView.offer.type === 'palace') {
      ruType = 'Комната';
    }
    if (cardView.offer.type === 'house') {
      ruType = 'Дом';
    }
    if (cardView.offer.type === 'bungalo') {
      ruType = 'Бунгало';
    }
    offerType.textContent = ruType;
    var capacity = card.querySelector('.popup__text--capacity');
    var cardText = cardView.offer.rooms + ' комнаты для ' + cardView.offer.guests + ' гостей.';
    capacity.textContent = cardText;

    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + cardView.offer.checkin + ', выезд до ' + cardView.offer.checkout;

    var features = card.querySelector('.popup__features');
    features.textContent = '';
    for (var i = 0; i < cardView.offer.features.length; i += 1) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + cardView.offer.features[i]);
      features.appendChild(feature);
    }

    var description = card.querySelector('.popup__description');
    description.textContent = cardView.offer.description;

    var photos = card.querySelector('.popup__photos');
    photos.innerHTML = window.addPhoto(cardView.offer.photos);

    var onPopupClose = function(e) {
      if (e.type === 'click' || e.key === 'Escape') {
        window.popupClose();
        document.removeEventListener('keydown', onPopupClose);
        card.querySelector('.popup__close').removeEventListener('click', onPopupClose);
      }
    };
    card.querySelector('.popup__close').addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupClose);

    return card;
  };

  window.renderCard = function (card) {
    var mapFiltersContainer = window.map.querySelector('.map__filters-container');
    window.map.insertBefore(card, mapFiltersContainer);
  };


})();
