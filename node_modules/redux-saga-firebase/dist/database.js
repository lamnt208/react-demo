'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(read),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(create),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(update),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(patch),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(_delete),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(sync);

function read(pathOrRef) {
  var ref, result;
  return _regenerator2.default.wrap(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context.next = 3;
          return (0, _effects.call)([ref, ref.once], 'value');

        case 3:
          result = _context.sent;
          return _context.abrupt('return', result.val());

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function create(pathOrRef, data) {
  var ref, result;
  return _regenerator2.default.wrap(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context2.next = 3;
          return (0, _effects.call)([ref, ref.push], data);

        case 3:
          result = _context2.sent;
          return _context2.abrupt('return', result.key);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function update(pathOrRef, data) {
  var ref;
  return _regenerator2.default.wrap(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context3.next = 3;
          return (0, _effects.call)([ref, ref.set], data);

        case 3:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function patch(pathOrRef, data) {
  var ref;
  return _regenerator2.default.wrap(function patch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context4.next = 3;
          return (0, _effects.call)([ref, ref.update], data);

        case 3:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function _delete(pathOrRef) {
  var ref;
  return _regenerator2.default.wrap(function _delete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ref = this._getRef(pathOrRef, 'database');
          _context5.next = 3;
          return (0, _effects.call)([ref, ref.remove]);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function channel(pathOrRef) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

  var ref = this._getRef(pathOrRef, 'database');

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var callback = ref.on(event, function (dataSnapshot) {
      return emit({
        snapshot: dataSnapshot,
        value: dataSnapshot.val()
      });
    });

    // Returns unsubscribe function
    return function () {
      return ref.off(event, callback);
    };
  });

  return channel;
}

var defaultTransform = function defaultTransform(data) {
  return data.value;
};
function sync(pathOrRef, options, event) {
  var channel;
  return _regenerator2.default.wrap(function sync$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.call)(this.database.channel, pathOrRef, event);

        case 2:
          channel = _context6.sent;
          _context6.next = 5;
          return (0, _effects.fork)(_utils.syncChannel, channel, (0, _extends3.default)({
            transform: defaultTransform
          }, options));

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

exports.default = {
  read: read,
  create: create,
  update: update,
  patch: patch,
  delete: _delete,
  channel: channel,
  sync: sync
};