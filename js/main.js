'use strict';
var OFFERS_NUMBER = 8;

var MAP_WIDTH = 1200;
var MAP_TOP_Y = 130;
var MAP_BOTTOM_Y = 630;

var ROOM_FROM = 1;
var ROOM_BEFORE = 8;

var GUEST_FROM = 1;
var GUEST_BEFORE = 8;

var USER_CHOICE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var TITLES = [
  '1-комн и 2-комн квартиры',
  '1-комнатные квартиры с балконом',
  '1-комнатные квартиры на выходные',
  '1-комнатные квартиры на неделю',
  '1-комнатные квартиры посуточно'
];
var DESCRIPTIONS = [
  'Снять квартиру',
  'Cнять команту',
  'Cнять гараж',
  'Снять офис',
  'Снять подвал'
];

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var minmaxRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getOffersList = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    offers[i] = getImageData(i);
  }
  return offers;
};

var createFeatures = function (arr) {
  var numberElement = minmaxRandom(1, arr.length);
  var features = [];
  var feature = getRandomElement(arr);

  for (var i = 0; i < numberElement; i++) {

    while (features.includes(feature)) {
      feature = getRandomElement(arr);
    }

    features[i] = feature;
  }

  return features;
};


var getImageData = function (index) {
  var positionX = minmaxRandom(0, MAP_WIDTH);
  var positionY = minmaxRandom(MAP_TOP_Y, MAP_BOTTOM_Y);
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: positionX + ', ' + positionY,
      price: getRandomInt(10000, 20000),
      type: getRandomElement(USER_CHOICE),
      rooms: minmaxRandom(ROOM_FROM, ROOM_BEFORE),
      guests: minmaxRandom(GUEST_FROM, GUEST_BEFORE),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: createFeatures(FACILITIES),
      description: getRandomElement(DESCRIPTIONS),
      photos: createFeatures(PHOTOS)
    },
    location: {
      x: positionX,
      y: positionY
    }
  };
};


var activateMap = function (addMap) {
  addMap.classList.remove('map--faded');
};

var map = document.querySelector('.map');
activateMap(map);


var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = pinData.location.x + 'px';
  pin.style.top = pinData.location.y + 'px';

  var pinAvatar = pin.querySelector('img');
  pinAvatar.src = pinData.author.avatar;
  pinAvatar.alt = pinData.offer.title;

  return pin;

};

var offersList = getOffersList();

var fragment = document.createDocumentFragment();
for (var j = 0; j < offersList.length; j++) {
  fragment.appendChild(renderPin(offersList[j]));
}
map.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCard = function (cardView) {
  var card = cardTemplate.cloneNode(true);

  var title = card.querySelector('.popup__title');
  title.textContent = cardView.pinData.title;

  var address = card.querySelector('.popup__text--address');
  address.textContent = cardView.pinData.address;

  var price = card.querySelector('.popup__text--price');
  price.textContent = cardView.pinData.price + ' ₽/ночь';

  var offerType = [];
  offerType.push(cardView.pinData.popupType);
  offerType.textContent = (offerType, USER_CHOICE);

  var capacity = card.querySelector('.popup__text--capacity');
  var cardText = (cardView.pinData.rooms, cardView.pinData.guests);
  capacity.textContent = cardText;

  var time = card.querySelector('.popup__text--time');
  time.textContent = 'Заезд после ' + cardView.pinData.checkin + ', выезд до ' + cardView.pinData.checkout;

  var features = card.querySelector('.popup__features');
  features.textContent = (cardView.pinData.FACILITIES);

  var description = card.querySelector('.popup__description');
  description.textContent = cardView.pinData.description;

  var photos = card.querySelector('.popup__photos');
  photos.innerHTML = (cardView.pinData.photos);

  var avatar = card.querySelector('.popup__avatar');
  avatar.src = cardView.pinData.avatar;

  return card;

};

var mapFiltersContainer = map.querySelector('.map__filters-container');

var renderCard = function (card) {
  map.insertBefore(card, mapFiltersContainer);
};
renderCard(mapFiltersContainer);
console.log(card);
