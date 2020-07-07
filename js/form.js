'use strict';

(function () {
  window.setAdres = function () {
    var adresInput = document.querySelector('#address');
    var mainIcon = document.querySelector('.map__pin--main');
    adresInput.value = mainIcon.offsetTop + ', ' + mainIcon.offsetLeft;
  };

  window.roomCapacity = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    capacity.setCustomValidity('');
    roomNumber.setCustomValidity('');
    if (roomNumber.value === 100 && capacity.value !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
    }
    if (capacity.value > roomNumber.value) {
      capacity.setCustomValidity('число гостей не должно превышать число коммнат.');
      roomNumber.setCustomValidity('число гостей не должно превышать число коммнат.');
    }
  };
  window.titleLength = function () {
    var titleInput = document.querySelector('#title');
    titleInput.setCustomValidity('');
    if (titleInput.value.length < 30) {
      titleInput.setCustomValidity('Заголовок должен быть больше 30-ти символов!');
    }
  };
})();
