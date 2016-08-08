(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodDetailsCtrl', GoodDetailsCtrl);

    function GoodDetailsCtrl($state, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            console.log($stateParams.item);
        }
    }

})();
