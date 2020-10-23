"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstAlbumTitle = getFirstAlbumTitle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

function getFirstAlbumTitle() {
  return _getFirstAlbumTitle.apply(this, arguments);
}

function _getFirstAlbumTitle() {
  _getFirstAlbumTitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _axios["default"])({
              method: 'post',
              url: "http://payments.localtest.me/api/1/datastore/query",
              data: {
                "resources": [{
                  "id": "59e3f29c-3277-5030-97e7-bcfc9a89c58f",
                  "alias": "t"
                }],
                "sort": {
                  "asc": [{
                    "resource": "t",
                    "property": "record_number"
                  }]
                },
                "keys": true
              }
            }).then(function (response) {
              var data = response.data;
              return data;
            })["catch"](function (error) {
              return console.log(error);
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFirstAlbumTitle.apply(this, arguments);
}