;(() => { 'use strict';

  const logger = new Logger('happy-birthday', Logger.LOG);

  angular.module('app', []);

  const _unshift = [].unshift;
  const _splice = [].splice;

  $('main').addClass('opaque');

  class MainController {
    constructor($scope, $interval, $location) {
      let _this = this;
      _this.$scope = $scope;
      _this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

      const path = $location.path().slice(1);
      const who = path.charAt(0).toUpperCase() + path.slice(1);
      const tiding = 'Happy Birthday';

      _this.name = who;
      _this.nope = 'Hi, ' + _this.name + '. Do I know you?';
      _this.notToday = 'Ha! Nice try, ' + _this.name +
        '. You\'ll just have to wait until next year!';

      [_this.registered, _this.valid] = _this.validate(path);

      if (_this.valid) {

        logger.info('\n\n\t\n\n%cHAPPY BIRTHDAY %s!!!',
          'color:rebeccapurple;font-size:32px', who.toUpperCase());

        _this.name += '!';
        _this.name = _this.name.split('');

        _this.tiding = [];
        for (let x in tiding) {
          let y = tiding[x];
          /* \u00A0 === &nbsp*/
          if (!y.trim()) y = '\u00A0';
          _this.tiding.push(y);
        }


        $interval(() => _this.rotate(), 555);

        let nth = false;
        $interval(() => {

          $('.letter').each((i, el) => {
            if (i % 2 === 0) {
              move(el).scale(nth ? 1.66 : 1).end();
            } else {
              move(el).scale(nth ? 1.33 : 1).end();
            }
          });

          nth = !nth;

        }, 223);
      }

      _this.show = true;
    }

    validate(path) {
      let [registered, valid] = [false, false];
      if (/larry|kate|bush|bashamba|iris/i.test(path)) {
        registered = true;
        if (this.getDate() === '8/22') {
          valid = true;
        }
      }
      return [registered, valid];
    }

    getColor(index) {
      return this.colors[index % this.colors.length];
    }

    rotate(count=1) {
      let len = this.colors.length >>> 0;
      count = count >> 0;
      _unshift.apply(this.colors, _splice.call(this.colors, count % len, len));
    }

    getDate() {
      const date = new Date();
      /* js months are zero indexed */
      const m = date.getMonth()+1;
      const d = date.getDate();
      return m + '/' + d;
    }
  }

  MainController.$inject = ['$scope', '$interval', '$location'];
  angular.module('app').controller('MainController', MainController);

}());
