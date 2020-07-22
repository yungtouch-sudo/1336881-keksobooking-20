'use strict';
(function () {
  var PRICE_LIMITS = {
    low: {max: '10000'},
    middle: {min: '10000', max: '50000'},
    high: {min: '50000'},
  };
  var GUESTS = {
    one: '1',
    two: '2',
    three: '3',
  };
  var ROOMS = {
    one: '1',
    two: '2',
    three: '3',
    many: '100',
  };

  window.filterType = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (value === cards[i].offer.type) {
        results.push(cards[i]);
      }
    }
    return results;
  };
  window.filterPrice = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === 'middle') {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.price >= PRICE_LIMITS.middle.min && cards[k].offer.price <= PRICE_LIMITS.middle.max) {
          results.push(cards[k]);
        }
      }
    }

    if (value === 'low') {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.price < PRICE_LIMITS.low.max) {
          results.push(cards[i]);
        }
      }
    }

    if (value === 'high') {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.price > PRICE_LIMITS.high.min) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };


  window.filterRooms = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === ROOMS.one) {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.rooms >= ROOMS.one && cards[i].offer.rooms <= ROOMS.one) {
          results.push(cards[i]);
        }
      }
    }

    if (value === ROOMS.two) {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.rooms >= ROOMS.two && cards[k].offer.rooms <= ROOMS.two) {
          results.push(cards[k]);
        }
      }
    }

    if (value === ROOMS.three) {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.rooms >= ROOMS.three && cards[j].offer.rooms <= ROOMS.three) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };


  window.filterGuests = function (cards, value) {
    if (value === 'any') {
      return cards;
    }
    var results = [];

    if (value === GUESTS.one) {
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].offer.guests >= GUESTS.one && cards[k].offer.guests <= GUESTS.one) {
          results.push(cards[k]);
        }
      }
    }

    if (value === GUESTS.two) {
      for (var i = 0; i < cards.length; i += 1) {
        if (cards[i].offer.guests >= GUESTS.two && cards[i].offer.guests <= GUESTS.two) {
          results.push(cards[i]);
        }
      }
    }

    if (value === GUESTS.three) {
      for (var j = 0; j < cards.length; j += 1) {
        if (cards[j].offer.guests >= GUESTS.many && cards[j].offer.guests <= GUESTS.many) {
          results.push(cards[j]);
        }
      }
    }
    return results;
  };

  window.filterFeatures = function (cards, value) {
    if (value === false) {
      return cards;
    }
    var results = [];
    for (var i = 0; i < cards.length; i += 1) {
      if (cards[i].offer.features.includes(value)) {
        results.push(cards[i]);
      }
    }
    return results;
  };

})();

