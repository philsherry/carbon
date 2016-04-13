"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Warning = function Warning() {
  _classCallCheck(this, Warning);

  this.warning = function (value) {
    return value == "foo";
  };

  this.message = function () {
    return "foo fds fd ds ds fds";
  };
};

exports["default"] = Warning;
module.exports = exports["default"];