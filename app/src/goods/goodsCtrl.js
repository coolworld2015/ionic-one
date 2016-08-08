(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodsCtrl', GoodsCtrl);

    GoodsCtrl.$inject = ['$state', 'GoodsService'];

    function GoodsCtrl($state, GoodsService) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            goodDetails: goodDetails
        });

        init();

        function init() {
            GoodsService.getAll()
                .then(function (result) {
                    vm.goods = result.data;
                });
        }

        function goodDetails(item) {
            $state.go('tab.good-details', {item: item});
        }
    }

})();