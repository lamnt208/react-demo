'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(addDocument),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(deleteDocument),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(getCollection),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(getDocument),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(setDocument),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(updateDocument),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(syncCollection),
    _marked8 = /*#__PURE__*/_regenerator2.default.mark(syncDocument);

function addDocument(collectionRef, data) {
  var collection;
  return _regenerator2.default.wrap(function addDocument$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          collection = this._getCollection(collectionRef);
          _context.next = 3;
          return (0, _effects.call)([collection, collection.add], data);

        case 3:
          return _context.abrupt('return', _context.sent);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function channel(pathOrRef) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'collection';

  var ref = type === 'collection' ? this._getCollection(pathOrRef) : this._getDocument(pathOrRef);

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = ref.onSnapshot(emit);

    // Returns unsubscribe function
    return unsubscribe;
  });

  return channel;
}

function deleteDocument(documentRef) {
  var doc;
  return _regenerator2.default.wrap(function deleteDocument$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          doc = this._getDocument(documentRef);
          _context2.next = 3;
          return (0, _effects.call)([doc, doc.delete]);

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function getCollection(collectionRef) {
  var collection;
  return _regenerator2.default.wrap(function getCollection$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          collection = this._getCollection(collectionRef);
          _context3.next = 3;
          return (0, _effects.call)([collection, collection.get]);

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function getDocument(documentRef) {
  var doc;
  return _regenerator2.default.wrap(function getDocument$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          doc = this._getDocument(documentRef);
          _context4.next = 3;
          return (0, _effects.call)([doc, doc.get]);

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function setDocument(documentRef, data, options) {
  var doc;
  return _regenerator2.default.wrap(function setDocument$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          doc = this._getDocument(documentRef);
          _context5.next = 3;
          return (0, _effects.call)([doc, doc.set], data, options);

        case 3:
          return _context5.abrupt('return', _context5.sent);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function updateDocument(documentRef) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var doc;
  return _regenerator2.default.wrap(function updateDocument$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          doc = this._getDocument(documentRef);
          _context6.next = 3;
          return _effects.call.apply(undefined, [[doc, doc.update]].concat(args));

        case 3:
          return _context6.abrupt('return', _context6.sent);

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function syncCollection(pathOrRef, options) {
  var channel;
  return _regenerator2.default.wrap(function syncCollection$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.call)(this.firestore.channel, pathOrRef, 'collection');

        case 2:
          channel = _context7.sent;
          _context7.next = 5;
          return (0, _effects.fork)(_utils.syncChannel, channel, options);

        case 5:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function syncDocument(pathOrRef, options) {
  var channel;
  return _regenerator2.default.wrap(function syncDocument$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.call)(this.firestore.channel, pathOrRef, 'document');

        case 2:
          channel = _context8.sent;
          _context8.next = 5;
          return (0, _effects.fork)(_utils.syncChannel, channel, options);

        case 5:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked8, this);
}

exports.default = {
  addDocument: addDocument,
  channel: channel,
  deleteDocument: deleteDocument,
  getCollection: getCollection,
  getDocument: getDocument,
  setDocument: setDocument,
  syncCollection: syncCollection,
  syncDocument: syncDocument,
  updateDocument: updateDocument
};