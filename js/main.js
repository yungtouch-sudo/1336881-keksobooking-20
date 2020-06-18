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

var activateMap = function () {
  map.classList.remove('map--faded');
  var addForm = document.querySelector('.ad-form');
  addForm.classList.remove('ad-form--disabled');
  var inputSelect = addForm.querySelectorAll('input, select');
  for (var i = 0; i < inputSelect.length; i += 1) {
    inputSelect[i].removeAttribute('disabled');
  }
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  var mapFiltersInputSelect = mapFilters.querySelectorAll('input, select');
  for (var k = 0; k < mapFiltersInputSelect.length; k += 1) {
    mapFiltersInputSelect[k].removeAttribute('disabled');
  }
};

var map = document.querySelector('.map');
//activateMap(map);


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

var addPhoto = function (photos) {
  var img = '';

  for (var i = 0; i < photos.length; i++) {
    img += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return img;
};




var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCard = function (cardView) {

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
  offerType.textContent = (offerType, USER_CHOICE);

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
  photos.innerHTML = addPhoto(cardView.offer.photos);

  return card;
};

createCard(offersList[0]);

var mapFiltersContainer = map.querySelector('.map__filters-container');

var renderCard = function (card) {
  map.insertBefore(card, mapFiltersContainer);
};
renderCard(createCard(offersList[0]));

var setAdres = function (x, y){
  var adresInput = document.querySelector('#address');
  adresInput.value = x + ', ' + y;
};


var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt){
  if (evt.button === 0) {
    console.log(evt);
    activateMap();
    setAdres(evt.target.offsetTop, evt.target.offsetLeft);
  }
});
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Tab') {
    activateMap();
    setAdres(evt.target.offsetTop, evt.target.offsetLeft);
  }
});

var roomCapacity = function (evt){
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  console.log(roomNumber, capacity);
  if (roomNumber.value === 100 && capacity.value !== 0) {
    console.log(roomNumber.value, capacity.value);
    capacity.setCustomValidity('100 комнат не для гостей');
  }
  if (capacity.value > roomNumber.value) {
    console.log(roomNumber.value, capacity.value);
    capacity.setCustomValidity('число гостей не должно превышать число коммнат.');
    roomNumber.setCustomValidity('число гостей не должно превышать число коммнат.');
  }
};

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var adForm = document.querySelector('.ad-form');

// adForm.addEventListener('submit', roomCapacity);

roomNumber.addEventListener('input', roomCapacity);
capacity.addEventListener('input', roomCapacity);
