'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.syncChannel = syncChannel;

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(syncChannel);

function syncChannel(channel, options) {
  var successActionCreator, failureActionCreator, transform, data, transformedData;
  return _regenerator2.default.wrap(function syncChannel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          successActionCreator = options.successActionCreator, failureActionCreator = options.failureActionCreator, transform = options.transform;
          _context.prev = 1;

        case 2:
          if (!true) {
            _context.next = 11;
            break;
          }

          _context.next = 5;
          return (0, _effects.take)(channel);

        case 5:
          data = _context.sent;
          transformedData = transform ? transform(data) : data;
          _context.next = 9;
          return (0, _effects.put)(successActionCreator(transformedData));

        case 9:
          _context.next = 2;
          break;

        case 11:
          _context.next = 18;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context['catch'](1);

          if (!failureActionCreator) {
            _context.next = 18;
            break;
          }

          _context.next = 18;
          return (0, _effects.put)(failureActionCreator(_context.t0));

        case 18:
          _context.prev = 18;
          _context.next = 21;
          return (0, _effects.cancelled)();

        case 21:
          if (!_context.sent) {
            _context.next = 23;
            break;
          }

          channel.close();

        case 23:
          return _context.finish(18);

        case 24:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[1, 13, 18, 24]]);
}