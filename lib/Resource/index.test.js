"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _functions = require("./functions");

var _mock = require("./mock");

// jest.mock('axios');
// axios.mockResolvedValue({ data: responseResults });
//   const title = await getFirstAlbumTitle();
//   expect(title.results[0].key1).toEqual('dkan');
describe('buildResources', function () {
  it('throws exception if ids is not an array', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildResources)('12345');
            }).toThrow('Parameter ids is not of type array');

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('throws exception if id is not an array of strings', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildResources)([[12345]]);
            }).toThrow('Array index 0 does not contain strings.');
            expect(function () {
              return (0, _functions.buildResources)([['12345', 5]]);
            }).toThrow('Array index 0 does not contain strings.');
            expect(function () {
              return (0, _functions.buildResources)([['12345', 't'], ['12345', true]]);
            }).toThrow('Array index 1 does not contain strings.');

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('returns resources if only 1 array item with length of 1', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            expect((0, _functions.buildResources)([['1234']])).toEqual([{
              "id": "1234",
              "alias": "t"
            }]);

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('returns resources if only 1 array item with alias', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expect((0, _functions.buildResources)([['12345', 's']])).toEqual([{
              "id": "12345",
              "alias": "s"
            }]);

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('returns multiple resources in an array', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            expect((0, _functions.buildResources)([['12345', 's'], ['67890', 'f']])).toEqual([{
              "id": "12345",
              "alias": "s"
            }, {
              "id": "67890",
              "alias": "f"
            }]);

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
describe('buildSort', function () {
  it('throws exception if isAsc is not of type boolean', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildSort)('12345', []);
            }).toThrow('Parameter isAsc must be of type boolean');

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('throws exception if sort is not of type array', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildSort)(true, '1234');
            }).toThrow('Parameter sort must be of type array');

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('returns an ascending sort object', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            expect((0, _functions.buildSort)(true, [['dkan']])).toEqual({
              "asc": [{
                "resource": "t",
                "property": "dkan"
              }]
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('returns a descending sort object', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            expect((0, _functions.buildSort)(false, [['react', 'f']])).toEqual({
              "desc": [{
                "resource": "f",
                "property": "react"
              }]
            });

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
});
describe('buildConditions', function () {
  it('throws exception if staticFilters is not of type boolean', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildConditions)('12345', []);
            }).toThrow('Parameter staticFilters must be of type array');

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('throws exception if dynamicFilters is not of type array', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildConditions)([], '1234');
            }).toThrow('Parameter dynamicFilters must be of type array');

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('throws exception if filters do not have proper keys', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            expect(function () {
              return (0, _functions.buildConditions)([{
                "foo": 123,
                "id": "bar"
              }], []);
            }).toThrow('Parameter staticFilters must be an object with keys of id and value');
            expect(function () {
              return (0, _functions.buildConditions)([], [{
                "foo": 123,
                "value": "bar"
              }]);
            }).toThrow('Parameter dynamicFilters must be an object with keys of id and value');

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('returns an array of only staticFilters', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            expect((0, _functions.buildConditions)([{
              "id": "react",
              "value": "javascript"
            }], [])).toEqual([{
              "resource": "t",
              "property": "react",
              "value": ["javascript"],
              "operator": "="
            }]);

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('returns an array of dynamicFilters', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            expect((0, _functions.buildConditions)([], [{
              "id": "dkan",
              "value": "drupal",
              "alias": "d"
            }])).toEqual([{
              "resource": "d",
              "property": "dkan",
              "value": ["drupal"],
              "operator": "="
            }]);

          case 1:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('returns an array of conditions', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            expect((0, _functions.buildConditions)([{
              "id": "react",
              "value": "javascript"
            }], [{
              "id": "dkan",
              "value": "drupal",
              "alias": "d"
            }, {
              "id": "php",
              "value": "unit",
              "operator": "math",
              "alias": "d"
            }])).toEqual([{
              "resource": "d",
              "property": "dkan",
              "value": ["drupal"],
              "operator": "="
            }, {
              "resource": "d",
              "property": "php",
              "value": ["unit"],
              "operator": "math"
            }, {
              "resource": "t",
              "property": "react",
              "value": ["javascript"],
              "operator": "="
            }]);

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
});