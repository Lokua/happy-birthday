'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

;(function () {
  'use strict';

  var logger = new Logger('happy-birthday', Logger.LOG);

  angular.module('app', []);

  var _unshift = [].unshift;
  var _splice = [].splice;

  $('main').addClass('opaque');

  var MainController = (function () {
    function MainController($scope, $interval, $location) {
      _classCallCheck(this, MainController);

      var _this = this;
      _this.$scope = $scope;
      _this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

      var path = $location.path().slice(1);
      var who = path.charAt(0).toUpperCase() + path.slice(1);
      var tiding = 'Happy Birthday';

      _this.name = who;
      _this.nope = 'Hi, ' + _this.name + '. Do I know you?';
      _this.notToday = 'Ha! Nice try, ' + _this.name + '. You\'ll just have to wait until next year!';

      var _this$validate = _this.validate(path);

      var _this$validate2 = _slicedToArray(_this$validate, 2);

      _this.registered = _this$validate2[0];
      _this.valid = _this$validate2[1];

      if (_this.valid) {
        (function () {

          logger.info('\n\n\t\n\n%cHAPPY BIRTHDAY %s!!!', 'color:rebeccapurple;font-size:32px', who.toUpperCase());

          _this.name += '!';
          _this.name = _this.name.split('');

          _this.tiding = [];
          for (var x in tiding) {
            var y = tiding[x];
            /* \u00A0 === &nbsp*/
            if (!y.trim()) y = ' ';
            _this.tiding.push(y);
          }

          $interval(function () {
            return _this.rotate();
          }, 555);

          var nth = false;
          $interval(function () {

            $('.letter').each(function (i, el) {
              if (i % 2 === 0) {
                move(el).scale(nth ? 1.66 : 1).end();
              } else {
                move(el).scale(nth ? 1.33 : 1).end();
              }
            });

            nth = !nth;
          }, 223);
        })();
      }

      _this.show = true;
    }

    _createClass(MainController, [{
      key: 'validate',
      value: function validate(path) {
        var registered = false;
        var valid = false;

        if (/larry|kate|bush|bashamba|iris/i.test(path)) {
          registered = true;
          if (this.getDate() === '8/22') {
            valid = true;
          }
        }
        return [registered, valid];
      }
    }, {
      key: 'getColor',
      value: function getColor(index) {
        return this.colors[index % this.colors.length];
      }
    }, {
      key: 'rotate',
      value: function rotate() {
        var count = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

        var len = this.colors.length >>> 0;
        count = count >> 0;
        _unshift.apply(this.colors, _splice.call(this.colors, count % len, len));
      }
    }, {
      key: 'getDate',
      value: function getDate() {
        var date = new Date();
        /* js months are zero indexed */
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return m + '/' + d;
      }
    }]);

    return MainController;
  })();

  MainController.$inject = ['$scope', '$interval', '$location'];
  angular.module('app').controller('MainController', MainController);
})();
