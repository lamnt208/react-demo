'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(applyActionCode),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(confirmPasswordReset),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(createUserWithEmailAndPassword),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(linkWithPopup),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(linkWithRedirect),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(sendEmailVerification),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(sendPasswordResetEmail),
    _marked8 = /*#__PURE__*/_regenerator2.default.mark(signInAndRetrieveDataWithCredential),
    _marked9 = /*#__PURE__*/_regenerator2.default.mark(signInAnonymously),
    _marked10 = /*#__PURE__*/_regenerator2.default.mark(signInWithCredential),
    _marked11 = /*#__PURE__*/_regenerator2.default.mark(signInWithCustomToken),
    _marked12 = /*#__PURE__*/_regenerator2.default.mark(signInWithEmailAndPassword),
    _marked13 = /*#__PURE__*/_regenerator2.default.mark(signInWithPhoneNumber),
    _marked14 = /*#__PURE__*/_regenerator2.default.mark(signInWithPopup),
    _marked15 = /*#__PURE__*/_regenerator2.default.mark(signInWithRedirect),
    _marked16 = /*#__PURE__*/_regenerator2.default.mark(signOut),
    _marked17 = /*#__PURE__*/_regenerator2.default.mark(unlink),
    _marked18 = /*#__PURE__*/_regenerator2.default.mark(updatePassword);

function applyActionCode(code) {
  var auth;
  return _regenerator2.default.wrap(function applyActionCode$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          auth = this.app.auth();
          _context.next = 3;
          return (0, _effects.call)([auth, auth.applyActionCode], code);

        case 3:
          return _context.abrupt('return', _context.sent);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function channel() {
  if (this._authChannel) return this._authChannel;

  var auth = this.app.auth();
  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = auth.onAuthStateChanged(function (user) {
      return emit({ user: user });
    }, function (error) {
      return emit({ error: error });
    });

    return unsubscribe;
  });

  this._authChannel = channel;
  return channel;
}

function confirmPasswordReset(code, newPassword) {
  var auth;
  return _regenerator2.default.wrap(function confirmPasswordReset$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          auth = this.app.auth();
          _context2.next = 3;
          return (0, _effects.call)([auth, auth.confirmPasswordReset], code, newPassword);

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function createUserWithEmailAndPassword(email, password) {
  var auth;
  return _regenerator2.default.wrap(function createUserWithEmailAndPassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          auth = this.app.auth();
          _context3.next = 3;
          return (0, _effects.call)([auth, auth.createUserWithEmailAndPassword], email, password);

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function linkWithPopup(authProvider) {
  var auth;
  return _regenerator2.default.wrap(function linkWithPopup$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          auth = this.app.auth();
          _context4.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.linkWithPopup], authProvider);

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function linkWithRedirect(authProvider) {
  var auth;
  return _regenerator2.default.wrap(function linkWithRedirect$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          auth = this.app.auth();
          _context5.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.linkWithRedirect], authProvider);

        case 3:
          return _context5.abrupt('return', _context5.sent);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function sendEmailVerification(actionCodeSettings) {
  var auth;
  return _regenerator2.default.wrap(function sendEmailVerification$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          auth = this.app.auth();
          _context6.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.sendEmailVerification], actionCodeSettings);

        case 3:
          return _context6.abrupt('return', _context6.sent);

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function sendPasswordResetEmail(email, actionCodeSettings) {
  var auth;
  return _regenerator2.default.wrap(function sendPasswordResetEmail$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          auth = this.app.auth();
          _context7.next = 3;
          return (0, _effects.call)([auth, auth.sendPasswordResetEmail], email, actionCodeSettings);

        case 3:
          return _context7.abrupt('return', _context7.sent);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function signInAndRetrieveDataWithCredential(credential) {
  var auth;
  return _regenerator2.default.wrap(function signInAndRetrieveDataWithCredential$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          auth = this.app.auth();
          _context8.next = 3;
          return (0, _effects.call)([auth, auth.signInAndRetrieveDataWithCredential], credential);

        case 3:
          return _context8.abrupt('return', _context8.sent);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked8, this);
}

function signInAnonymously() {
  var auth;
  return _regenerator2.default.wrap(function signInAnonymously$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          auth = this.app.auth();
          _context9.next = 3;
          return (0, _effects.call)([auth, auth.signInAnonymously]);

        case 3:
          return _context9.abrupt('return', _context9.sent);

        case 4:
        case 'end':
          return _context9.stop();
      }
    }
  }, _marked9, this);
}

function signInWithCredential(credential) {
  var auth;
  return _regenerator2.default.wrap(function signInWithCredential$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          auth = this.app.auth();
          _context10.next = 3;
          return (0, _effects.call)([auth, auth.signInWithCredential], credential);

        case 3:
          return _context10.abrupt('return', _context10.sent);

        case 4:
        case 'end':
          return _context10.stop();
      }
    }
  }, _marked10, this);
}

function signInWithCustomToken(token) {
  var auth;
  return _regenerator2.default.wrap(function signInWithCustomToken$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          auth = this.app.auth();
          _context11.next = 3;
          return (0, _effects.call)([auth, auth.signInWithCustomToken], token);

        case 3:
          return _context11.abrupt('return', _context11.sent);

        case 4:
        case 'end':
          return _context11.stop();
      }
    }
  }, _marked11, this);
}

function signInWithEmailAndPassword(email, password) {
  var auth;
  return _regenerator2.default.wrap(function signInWithEmailAndPassword$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          auth = this.app.auth();
          _context12.next = 3;
          return (0, _effects.call)([auth, auth.signInWithEmailAndPassword], email, password);

        case 3:
          return _context12.abrupt('return', _context12.sent);

        case 4:
        case 'end':
          return _context12.stop();
      }
    }
  }, _marked12, this);
}

function signInWithPhoneNumber(phoneNumber, applicationVerifier) {
  var auth;
  return _regenerator2.default.wrap(function signInWithPhoneNumber$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          auth = this.app.auth();
          _context13.next = 3;
          return (0, _effects.call)([auth, auth.signInWithPhoneNumber], phoneNumber, applicationVerifier);

        case 3:
          return _context13.abrupt('return', _context13.sent);

        case 4:
        case 'end':
          return _context13.stop();
      }
    }
  }, _marked13, this);
}

function signInWithPopup(authProvider) {
  var auth, _ref, credential;

  return _regenerator2.default.wrap(function signInWithPopup$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          auth = this.app.auth();
          _context14.next = 3;
          return (0, _effects.call)([auth, auth.signInWithPopup], authProvider);

        case 3:
          _ref = _context14.sent;
          credential = _ref.credential;
          return _context14.abrupt('return', credential);

        case 6:
        case 'end':
          return _context14.stop();
      }
    }
  }, _marked14, this);
}

function signInWithRedirect(authProvider) {
  var auth;
  return _regenerator2.default.wrap(function signInWithRedirect$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          auth = this.app.auth();
          _context15.next = 3;
          return (0, _effects.call)([auth, auth.signInWithRedirect], authProvider);

        case 3:
        case 'end':
          return _context15.stop();
      }
    }
  }, _marked15, this);
}

function signOut() {
  var auth;
  return _regenerator2.default.wrap(function signOut$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          auth = this.app.auth();
          _context16.next = 3;
          return (0, _effects.call)([auth, auth.signOut]);

        case 3:
        case 'end':
          return _context16.stop();
      }
    }
  }, _marked16, this);
}

function unlink(provider) {
  var auth;
  return _regenerator2.default.wrap(function unlink$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          auth = this.app.auth();
          _context17.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.unlink], provider);

        case 3:
          return _context17.abrupt('return', _context17.sent);

        case 4:
        case 'end':
          return _context17.stop();
      }
    }
  }, _marked17, this);
}

function updatePassword(password) {
  var auth;
  return _regenerator2.default.wrap(function updatePassword$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          auth = this.app.auth();
          _context18.next = 3;
          return (0, _effects.call)([auth.currentUser, auth.currentUser.updatePassword], password);

        case 3:
          return _context18.abrupt('return', _context18.sent);

        case 4:
        case 'end':
          return _context18.stop();
      }
    }
  }, _marked18, this);
}

exports.default = {
  applyActionCode: applyActionCode,
  channel: channel,
  confirmPasswordReset: confirmPasswordReset,
  createUserWithEmailAndPassword: createUserWithEmailAndPassword,
  linkWithPopup: linkWithPopup,
  linkWithRedirect: linkWithRedirect,
  sendEmailVerification: sendEmailVerification,
  sendPasswordResetEmail: sendPasswordResetEmail,
  signInAndRetrieveDataWithCredential: signInAndRetrieveDataWithCredential,
  signInAnonymously: signInAnonymously,
  signInWithCredential: signInWithCredential,
  signInWithCustomToken: signInWithCustomToken,
  signInWithEmailAndPassword: signInWithEmailAndPassword,
  signInWithPhoneNumber: signInWithPhoneNumber,
  signInWithPopup: signInWithPopup,
  signInWithRedirect: signInWithRedirect,
  signOut: signOut,
  unlink: unlink,
  updatePassword: updatePassword
};