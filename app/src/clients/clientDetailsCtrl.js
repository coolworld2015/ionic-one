(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientDetailsCtrl', ClientDetailsCtrl);

    ClientDetailsCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ClientsService','$ionicLoading'];

    function ClientDetailsCtrl($rootScope, $state, $stateParams, ClientsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            clientsSubmit: clientsSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            //console.log(vm);
        }

        function clientsSubmit() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var item = {
                id: vm.id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                sum: vm.sum,
                cv: vm.cv,
                description: vm.description
            };

            ClientsService.editItem(item)
                .then(function () {
                    $state.go('root.clients');
                })
                .catch(errorHandler);

            $ionicLoading.hide();
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }
    }

})();
