'use strict';
(function () {
  var MIN_PRICE = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  window.adress = function () {
    var adressField = document.querySelector('#address');
    adressField.value = (window.mainPin.offsetLeft + window.OFFSET_TO_CENTER_PIN) + ', ' + (window.mainPin.offsetTop);
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

  window.roomCheck = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    capacity.setCustomValidity('');
    roomNumber.setCustomValidity('');
    if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('100 комнат не для гостей');
      return false;
    }
    if (capacity.value === '0' && roomNumber.value !== '100') {
      roomNumber.setCustomValidity('Не для гостей может быть от 100 комнат');
      return false;
    }
    if (capacity.value > roomNumber.value) {
      capacity.setCustomValidity('число гостей не должно превышать число комнат.');
      roomNumber.setCustomValidity('число гостей не должно превышать число комнат.');
      return false;
    }
    return true;
  };

  window.titleLengthCheck = function () {
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

  window.priceLengthCheck = function () {
    var priceInput = document.querySelector('#price');
    priceInput.setCustomValidity('');
    if (priceInput.value > 1000000) {
      priceInput.setCustomValidity('Цена не может быть больше 1 000 000!');
      return false;
    }
    return true;
  };

  window.resetImg = function () {
    var avatar = document.querySelector('.ad-form-header__preview img');
    var photos = document.querySelectorAll('.ad-form__photo img');
    if (avatar) {
      avatar.remove();
    }
    photos.forEach(function (img) {
      img.remove();
    });
  };

  window.setPriceLimit = function () {
    var typeHouse = document.querySelector('#type');
    var typePrice = document.querySelector('#price');

    typePrice.setAttribute('placeholder', MIN_PRICE[typeHouse.value]);
    typePrice.setAttribute('min', MIN_PRICE[typeHouse.value]);

    return true;
  };

  window.typeCheck = function () {
    var typeHouse = document.querySelector('#type');
    var typePrice = document.querySelector('#price');
    typeHouse.setCustomValidity('');
    typePrice.setCustomValidity('');

    if (Number(typePrice.value) < Number(MIN_PRICE[typeHouse.value])) {
      typePrice.setCustomValidity('минимальная цена за ночь ' + MIN_PRICE[typeHouse.value]);
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
