(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesDetailsCtrl', MoviesDetailsCtrl);

    MoviesDetailsCtrl.$inject = ['$stateParams'];

    function MoviesDetailsCtrl($stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
        }
    }

})();
