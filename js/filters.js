'use strict';
(function () {
  window.filterType = function (cards, value) {
    var result = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (value === cards[i].offer.type) {
        result.push(cards[i]);
      }
    }
    return result;
  };
  window.filterPrice = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var result = [];

    if (value === 'middle') {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.price >= '10000' && cards[k].offer.price <= '50000') {
          result.push(cards[k]);
        }
      }
    }

    if (value === 'low') {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.price < '10000') {
          result.push(cards[i]);
        }
      }
    }

    if (value === 'high') {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.price > '50000') {
          result.push(cards[j]);
        }
      }
    }
    return result;
  };


  window.filterRooms = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var result = [];

    if (value === '1') {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.rooms >= '1' && cards[i].offer.rooms <= '1') {
          result.push(cards[i]);
        }
      }
    }

    if (value === '2') {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.rooms >= '2' && cards[k].offer.rooms <= '2') {
          result.push(cards[k]);
        }
      }
    }

    if (value === '3') {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.rooms >= '3' && cards[j].offer.rooms <= '3') {
          result.push(cards[j]);
        }
      }
    }
    return result;
  };


  window.filterGuests = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var result = [];

    if (value === '1') {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.guests >= '1' && cards[k].offer.guests <= '1') {
          result.push(cards[k]);
        }
      }
    }

    if (value === '2') {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.guests >= '2' && cards[i].offer.guests <= '2') {
          result.push(cards[i]);
        }
      }
    }

    if (value === '3') {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.guests >= '100' && cards[j].offer.guests <= '100') {
          result.push(cards[j]);
        }
      }
    }
    return result;
  };

  window.filterFeatures = function (cards, value) {
    if (value === false) {
      return cards;
    }
    var result = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (cards[i].offer.features.includes(value)) {
        result.push(cards[i]);
      }
    }
    return result;
  };

})();

