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
    var ruType = '';
    if (cardView.offer.type === 'flat') ruType = 'Квартира';
    if (cardView.offer.type === 'palace') ruType = 'Комната';
    if (cardView.offer.type === 'house') ruType = 'Дом';
    if (cardView.offer.type === 'bungalo') ruType = 'Бунгало';
    offerType.textContent = ruType;

    console.log(cardView.offer.features);

    console.log(cardView);

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
      console.log(feature);
      features.appendChild(feature);
    }

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

  var mapPin = document.querySelector('.map__pin--main');
  var mapPinMove = false;
  var mapGlobal = document.querySelector('.map');
  mapGlobal.addEventListener('mousemove', function (evt){
    if (mapPinMove) {
      mapPin.style.top = (evt.pageY - mapGlobal.offsetTop - 32) + 'px';
      mapPin.style.left = (evt.pageX - mapGlobal.offsetLeft - 32) + 'px';
    }
  });
  mapPin.addEventListener('mousedown', function (){
    mapPinMove = true;
  });
  mapPin.addEventListener('mouseup', function (evt){
    mapPinMove = false;
    window.setAdres(evt.target.offsetTop - 75, evt.target.offsetLeft - 32);
  });


})();
