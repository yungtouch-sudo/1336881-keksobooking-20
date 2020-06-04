'use strict';
var MAP_WIDTH = 1200;
var MAP_TOP_Y = 130;
var MAP_BOTTOM_Y = 630;

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var MinMaxRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
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

var userSetting = function (settingsList){
  var positionX = MinMaxRandom(0, MAP_WIDTH);
  var positionY = MinMaxRandom(MAP_TOP_Y, MAP_BOTTOM_Y);
  var creator = {
    author:{
      avatar: "img/avatars/user0" + (settingsList + 1) + ".png"
    },
    theCreator: {
      title: "строка, заголовок предложения",
      address: positionX + ", " + positionY,
      price: число, стоимость,
      type: getRandomElement(USER_CHOICE),
      rooms: MinMaxRandom(ROOM_FROM, ROOM_BEFORE),
      guests: MinMaxRandom(GUEST_FROM, GUEST_BEFORE),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getRandomElement(FACILITIES),
      description: "строка с описанием",
      photos: (PHOTOS)
},
    location: {
      x: positionX,
      y: positionY
    }
  };
  return theCreator;
};
