'use strict';

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
      var _this = this;

      _classCallCheck(this, MainController);

      this.$scope = $scope;

      this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

      var path = $location.path().slice(1);
      var who = path.charAt(0).toUpperCase() + path.slice(1) + '!';
      var tiding = 'Happy Birthday';

      logger.info('\n\n\t\n\n%cHAPPY BIRTHDAY %s!!!', 'color:rebeccapurple;font-size:32px', who.toUpperCase());

      this.who = who.split('');
      this.tiding = [];
      for (var x in tiding) {
        var y = tiding[x];
        if (!y.trim()) y = ' ';
        this.tiding.push(y);
      }

      this.show = false;

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
    }

    _createClass(MainController, [{
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
        // const date = new Date();
      }
    }]);

    return MainController;
  })();

  MainController.$inject = ['$scope', '$interval', '$location'];
  angular.module('app').controller('MainController', MainController);
})();
