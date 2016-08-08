(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientDetailsCtrl', ClientDetailsCtrl);

    ClientDetailsCtrl.$inject = ['$stateParams'];

    function ClientDetailsCtrl($stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            //console.log(vm);
        }
    }

})();
