'use strict';

(function () {
  var OFFERS_NUMBER = 8;

  var MAP_WIDTH = 1200;
  var MAP_TOP_Y = 130;
  var MAP_BOTTOM_Y = 630;

  var ROOM_FROM = 1;
  var ROOM_BEFORE = 8;

  var GUEST_FROM = 1;
  var GUEST_BEFORE = 8;

  window.USER_CHOICE = [
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

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
        type: getRandomElement(window.USER_CHOICE),
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

  window.getOffersList = function () {
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

  window.addPhoto = function (photos) {
    var img = '';

    for (var i = 0; i < photos.length; i++) {
      img += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    return img;
  };
})();
