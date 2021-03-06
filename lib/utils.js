'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  clone: clone,
  get: get,
  set: set,
  mapValues: mapValues,
  makePathArray: makePathArray,
  pickBy: pickBy,
  isObject: isObject,
  isArray: isArray
};


function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;

  if (isStringValidNumber(keys[0]) && !isArray(obj)) {
    obj = [];
  }
  if (!isStringValidNumber(keys[0]) && !isObject(obj)) {
    obj = {};
  }

  var cursor = obj;

  while ((keyPart = keys.shift()) && keys.length) {
    if (isStringValidNumber(keys[0]) && !isArray(cursor[keyPart])) {
      cursor[keyPart] = [];
    }
    if (!isStringValidNumber(keys[0]) && !isObject(cursor[keyPart])) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function mapValues(obj, cb) {
  var newObj = {};
  for (var key in obj) {
    newObj[key] = cb(obj[key], key);
  }
  return newObj;
}

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function pickBy(obj, cb) {
  var newObj = {};
  for (var key in obj) {
    if (cb(obj[key], key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function isArray(a) {
  return Array.isArray(a);
}

function isObject(a) {
  return !Array.isArray(a) && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null;
}

function isStringValidNumber(str) {
  return !isNaN(str);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJjbG9uZSIsImdldCIsInNldCIsIm1hcFZhbHVlcyIsIm1ha2VQYXRoQXJyYXkiLCJwaWNrQnkiLCJpc09iamVjdCIsImlzQXJyYXkiLCJhIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsImUiLCJvYmoiLCJwYXRoIiwiZGVmIiwicGF0aE9iaiIsInZhbCIsInJlZHVjZSIsImN1cnJlbnQiLCJwYXRoUGFydCIsImtleXMiLCJrZXlQYXJ0IiwiaXNTdHJpbmdWYWxpZE51bWJlciIsImN1cnNvciIsInNoaWZ0IiwibGVuZ3RoIiwiY2IiLCJuZXdPYmoiLCJmbGF0dGVuRGVlcCIsImpvaW4iLCJyZXBsYWNlIiwic3BsaXQiLCJhcnIiLCJuZXdBcnIiLCJwdXNoIiwiaSIsIkFycmF5Iiwic3RyIiwiaXNOYU4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUFlO0FBQ2JBLGNBRGE7QUFFYkMsVUFGYTtBQUdiQyxVQUhhO0FBSWJDLHNCQUphO0FBS2JDLDhCQUxhO0FBTWJDLGdCQU5hO0FBT2JDLG9CQVBhO0FBUWJDO0FBUmEsQzs7O0FBV2YsU0FBU1AsS0FBVCxDQUFnQlEsQ0FBaEIsRUFBbUI7QUFDakIsTUFBSTtBQUNGLFdBQU9DLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFlSCxDQUFmLEVBQWtCLFVBQUNJLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUNsRCxVQUFJLE9BQU9BLEtBQVAsS0FBaUIsVUFBckIsRUFBaUM7QUFDL0IsZUFBT0EsTUFBTUMsUUFBTixFQUFQO0FBQ0Q7QUFDRCxhQUFPRCxLQUFQO0FBQ0QsS0FMaUIsQ0FBWCxDQUFQO0FBTUQsR0FQRCxDQU9FLE9BQU9FLENBQVAsRUFBVTtBQUNWLFdBQU9QLENBQVA7QUFDRDtBQUNGOztBQUVELFNBQVNQLEdBQVQsQ0FBY2UsR0FBZCxFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThC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akJDLFdBQU9DLElBQVAsQ0FBWUYsR0FBWjtBQUNELEdBRkQsTUFFTztBQUNMLFNBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxJQUFJUCxNQUF4QixFQUFnQ1UsR0FBaEMsRUFBcUM7QUFDbkNQLGtCQUFZSSxJQUFJRyxDQUFKLENBQVosRUFBb0JGLE1BQXBCO0FBQ0Q7QUFDRjtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFRCxTQUFTOUIsT0FBVCxDQUFrQkMsQ0FBbEIsRUFBcUI7QUFDbkIsU0FBT2dDLE1BQU1qQyxPQUFOLENBQWNDLENBQWQsQ0FBUDtBQUNEOztBQUVELFNBQVNGLFFBQVQsQ0FBbUJFLENBQW5CLEVBQXNCO0FBQ3BCLFNBQU8sQ0FBQ2dDLE1BQU1qQyxPQUFOLENBQWNDLENBQWQsQ0FBRCxJQUFxQixRQUFPQSxDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBbEMsSUFBOENBLE1BQU0sSUFBM0Q7QUFDRDs7QUFFRCxTQUFTa0IsbUJBQVQsQ0FBOEJlLEdBQTlCLEVBQW1DO0FBQ2pDLFNBQU8sQ0FBQ0MsTUFBTUQsR0FBTixDQUFSO0FBQ0QiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNsb25lLFxuICBnZXQsXG4gIHNldCxcbiAgbWFwVmFsdWVzLFxuICBtYWtlUGF0aEFycmF5LFxuICBwaWNrQnksXG4gIGlzT2JqZWN0LFxuICBpc0FycmF5XG59XG5cbmZ1bmN0aW9uIGNsb25lIChhKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0pKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGFcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXQgKG9iaiwgcGF0aCwgZGVmKSB7XG4gIGlmICghcGF0aCkge1xuICAgIHJldHVybiBvYmpcbiAgfVxuICBjb25zdCBwYXRoT2JqID0gbWFrZVBhdGhBcnJheShwYXRoKVxuICBsZXQgdmFsXG4gIHRyeSB7XG4gICAgdmFsID0gcGF0aE9iai5yZWR1Y2UoKGN1cnJlbnQsIHBhdGhQYXJ0KSA9PiBjdXJyZW50W3BhdGhQYXJ0XSwgb2JqKVxuICB9IGNhdGNoIChlKSB7fVxuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgPyB2YWwgOiBkZWZcbn1cblxuZnVuY3Rpb24gc2V0IChvYmogPSB7fSwgcGF0aCwgdmFsdWUpIHtcbiAgY29uc3Qga2V5cyA9IG1ha2VQYXRoQXJyYXkocGF0aClcbiAgbGV0IGtleVBhcnRcblxuICBpZiAoaXNTdHJpbmdWYWxpZE51bWJlcihrZXlzWzBdKSAmJiAhaXNBcnJheShvYmopKSB7XG4gICAgb2JqID0gW11cbiAgfVxuICBpZiAoIWlzU3RyaW5nVmFsaWROdW1iZXIoa2V5c1swXSkgJiYgIWlzT2JqZWN0KG9iaikpIHtcbiAgICBvYmogPSB7fVxuICB9XG5cbiAgbGV0IGN1cnNvciA9IG9ialxuXG4gIHdoaWxlICgoa2V5UGFydCA9IGtleXMuc2hpZnQoKSkgJiYga2V5cy5sZW5ndGgpIHtcbiAgICBpZiAoaXNTdHJpbmdWYWxpZE51bWJlcihrZXlzWzBdKSAmJiAhaXNBcnJheShjdXJzb3Jba2V5UGFydF0pKSB7XG4gICAgICBjdXJzb3Jba2V5UGFydF0gPSBbXVxuICAgIH1cbiAgICBpZiAoIWlzU3RyaW5nVmFsaWROdW1iZXIoa2V5c1swXSkgJiYgIWlzT2JqZWN0KGN1cnNvcltrZXlQYXJ0XSkpIHtcbiAgICAgIGN1cnNvcltrZXlQYXJ0XSA9IHt9XG4gICAgfVxuICAgIGN1cnNvciA9IGN1cnNvcltrZXlQYXJ0XVxuICB9XG4gIGN1cnNvcltrZXlQYXJ0XSA9IHZhbHVlXG4gIHJldHVybiBvYmpcbn1cblxuZnVuY3Rpb24gbWFwVmFsdWVzIChvYmosIGNiKSB7XG4gIGNvbnN0IG5ld09iaiA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBuZXdPYmpba2V5XSA9IGNiKG9ialtrZXldLCBrZXkpXG4gIH1cbiAgcmV0dXJuIG5ld09ialxufVxuXG5mdW5jdGlvbiBtYWtlUGF0aEFycmF5IChvYmopIHtcbiAgcmV0dXJuIGZsYXR0ZW5EZWVwKG9iailcbiAgICAgIC5qb2luKCcuJylcbiAgICAgIC5yZXBsYWNlKCdbJywgJy4nKVxuICAgICAgLnJlcGxhY2UoJ10nLCAnJylcbiAgICAgIC5zcGxpdCgnLicpXG59XG5cbmZ1bmN0aW9uIHBpY2tCeSAob2JqLCBjYikge1xuICBjb25zdCBuZXdPYmogPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGNiKG9ialtrZXldLCBrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldXG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmpcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRlZXAgKGFyciwgbmV3QXJyID0gW10pIHtcbiAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICBuZXdBcnIucHVzaChhcnIpXG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZsYXR0ZW5EZWVwKGFycltpXSwgbmV3QXJyKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3QXJyXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSlcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKGEpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KGEpICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhICE9PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nVmFsaWROdW1iZXIgKHN0cikge1xuICByZXR1cm4gIWlzTmFOKHN0cilcbn1cbiJdfQ==