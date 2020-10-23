"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIdPattern = checkIdPattern;
exports.buildResources = buildResources;
exports.buildSort = buildSort;
exports.buildConditions = buildConditions;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function checkIdPattern(id, index) {
  if (index === 0 && id.length === 1) {
    if (typeof id[0] !== "string") {
      throw "Array index ".concat(index, " does not contain strings.");
    }

    return true;
  }

  if (id.length !== 2) {
    throw "Array index ".concat(index, " has incorrect length.");
  }

  if (typeof id[0] !== "string" || typeof id[1] !== "string") {
    throw "Array index ".concat(index, " does not contain strings.");
  }

  return true;
}

function buildResources(ids) {
  var returnedResources = [];

  if (!Array.isArray(ids)) {
    throw 'Parameter ids is not of type array';
  }

  ids.forEach(function (id, index) {
    checkIdPattern(id, index);
    returnedResources.push({
      "id": id[0],
      "alias": id[1] ? id[1] : "t"
    });
  });
  return returnedResources;
}

function buildSort(isAsc, sort) {
  var returnedSortArray = [];
  var sortKey = isAsc ? "asc" : "desc";

  if (typeof isAsc !== "boolean") {
    throw 'Parameter isAsc must be of type boolean';
  }

  if (!Array.isArray(sort)) {
    throw 'Parameter sort must be of type array';
  }

  sort.forEach(function (item, index) {
    checkIdPattern(item, index);
    returnedSortArray.push({
      "resource": item[1] ? item[1] : "t",
      "property": item[0]
    });
  });
  return (0, _defineProperty2["default"])({}, sortKey, returnedSortArray);
}

function buildConditions(staticFilters, dynamicFilters) {
  var returnedConditions = [];

  if (!Array.isArray(staticFilters)) {
    throw 'Parameter staticFilters must be of type array';
  }

  if (!Array.isArray(dynamicFilters)) {
    throw 'Parameter dynamicFilters must be of type array';
  }

  if (dynamicFilters.length) {
    dynamicFilters.forEach(function (f) {
      if (!f.id || !f.value) {
        throw 'Parameter dynamicFilters must be an object with keys of id and value';
      }

      returnedConditions.push({
        "resource": f.alias ? f.alias : "t",
        "property": f.id,
        "value": [f.value],
        "operator": f.operator ? f.operator : "="
      });
    });
  }

  if (staticFilters.length) {
    staticFilters.forEach(function (f) {
      if (!f.id || !f.value) {
        throw 'Parameter staticFilters must be an object with keys of id and value';
      }

      returnedConditions.push({
        "resource": f.alias ? f.alias : "t",
        "property": f.id,
        "value": [f.value],
        "operator": f.operator ? f.operator : "="
      });
    });
  }

  return returnedConditions;
}