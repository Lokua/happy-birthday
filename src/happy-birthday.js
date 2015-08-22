;(() => { 'use strict';

  const logger = new Logger('happy-birthday', Logger.LOG);


  angular.module('app', []);

  const _unshift = [].unshift;
  const _splice = [].splice;

  $('main').addClass('opaque');

  class MainController {
    constructor($scope, $interval, $location) {

      this.$scope = $scope;

      this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'];

      const path = $location.path().slice(1);
      const who = path.charAt(0).toUpperCase() + path.slice(1) + '!';
      const tiding = 'Happy Birthday';

      logger.info('\n\n\t\n\n%cHAPPY BIRTHDAY %s!!!',
        'color:rebeccapurple;font-size:32px', who.toUpperCase());

      this.who = who.split('');
      this.tiding = [];
      for (let x in tiding) {
        let y = tiding[x];
        if (!y.trim()) y = '\u00A0';
        this.tiding.push(y);
      }

      this.show = false;

      $interval(() => this.rotate(), 555);

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


    getColor(index) {
      return this.colors[index % this.colors.length];
    }

    rotate(count=1) {
      let len = this.colors.length >>> 0;
      count = count >> 0;
      _unshift.apply(this.colors, _splice.call(this.colors, count % len, len));
    }

    getDate() {
      // const date = new Date();
    }
  }

  MainController.$inject = ['$scope', '$interval', '$location'];
  angular.module('app').controller('MainController', MainController);

}());
