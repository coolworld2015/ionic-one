(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesCtrl', PhonesCtrl);

    PhonesCtrl.$inject = ['$scope', '$rootScope', '$state', 'PhonesService', '$ionicLoading'];

    function PhonesCtrl($scope, $rootScope, $state, PhonesService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init

        });

        init();

        function init() {
            vm.phones = [];
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            vm.clear = false;
            PhonesService.getItems()
                .then(function (result) {
                    vm.phones = result.data;
                    //vm.clients.sort(sort);
                    $ionicLoading.hide();
                });
        }

    }
})();