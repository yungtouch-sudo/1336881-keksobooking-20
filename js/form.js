'use strict';
(function () {
  window.setAdress = function () {
    var adresInput = document.querySelector('#address');
    adresInput.value = window.mainPin.offsetTop + ', ' + window.mainPin.offsetLeft;
  };

  window.activateForm = function () {
    var addForm = document.querySelector('.ad-form');
    addForm.classList.remove('ad-form--disabled');
    var inputSelect = addForm.querySelectorAll('input, select, textarea, [type="submit"]');
    for (var i = 0; i < inputSelect.length; i += 1) {
      inputSelect[i].removeAttribute('disabled');
    }
  };

  window.deactivateForm = function () {
    var addForm = document.querySelector('.ad-form');
    addForm.reset();
    addForm.classList.add('ad-form--disabled');
    var inputSelect = addForm.querySelectorAll('input, select, textarea, [type="submit"]');
    for (var i = 0; i < inputSelect.length; i += 1) {
      inputSelect[i].setAttribute('disabled', 'disabled');
    }
  };

  window.roomCapacityValidte = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    capacity.setCustomValidity('');
    roomNumber.setCustomValidity('');
    if (roomNumber.value === 100 && capacity.value !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
      return false;
    }
    if (capacity.value > roomNumber.value) {
      capacity.setCustomValidity('число гостей не должно превышать число коммнат.');
      roomNumber.setCustomValidity('число гостей не должно превышать число коммнат.');
      return false;
    }
    return true;
  };

  window.titleLengthValidate = function () {
    var titleInput = document.querySelector('#title');
    titleInput.setCustomValidity('');
    if (titleInput.value.length < 30) {
      titleInput.setCustomValidity('Заголовок должен быть больше 30-ти символов!');
      return false;
    }
    if (titleInput.value.length > 100) {
      titleInput.setCustomValidity('Заголовок должен быть меньше 100 символов!');
      return false;
    }
    return true;
  };

  window.priceLengthValidate = function () {
    var priceInput = document.querySelector('#price');
    priceInput.setCustomValidity('');
    if (priceInput.value > 1000000) {
      priceInput.setCustomValidity('Цена не может быть больше 1 000 000!');
      return false;
    }
    return true;
  };

  window.resetImg = function () {
    document.querySelector('.ad-form-header__preview img').remove();
    document.querySelector('.ad-form__photo').remove();
  };

  window.typeAppPlaceholder = function () {
    var typeHouse = document.querySelector('#type');
    var typePrice = document.querySelector('#price');

    if (typeHouse.value === 'bungalo') {
      typePrice.value = '0';
      return false;
    }
    if (typeHouse.value === 'flat') {
      typePrice.value = 1000;
      return false;
    }
    if (typeHouse.value === 'house') {
      typePrice.value = 5000;
      return false;
    }
    if (typeHouse.value === 'palace') {
      typePrice.value = 10000;
      return false;
    }

    return true;
  };

  window.typeAppValidte = function () {
    var typeHouse = document.querySelector('#type');
    var typePrice = document.querySelector('#price');
    typeHouse.setCustomValidity('');
    typePrice.setCustomValidity('');

    if (typeHouse.value === 'bungalo' && typePrice.value < 0) {
      typePrice.setCustomValidity('минимальная цена за ночь 0');
      return false;
    }
    if (typeHouse.value === 'flat' && typePrice.value < 1000) {
      typePrice.setCustomValidity('минимальная цена за ночь 1 000');
      return false;
    }
    if (typeHouse.value === 'house' && typePrice.value < 5000) {
      typePrice.setCustomValidity('минимальная цена за ночь 5 000');
      return false;
    }
    if (typeHouse.value === 'palace' && typePrice.value < 10000) {
      typePrice.setCustomValidity('минимальная цена за ночь 10 000');
      return false;
    }

    return true;
  };

  var timeMin = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeMin.addEventListener('input', function () {
    timeOut.value = timeMin.value;
  });

  timeOut.addEventListener('input', function () {
    timeMin.value = timeOut.value;
  });

})();
