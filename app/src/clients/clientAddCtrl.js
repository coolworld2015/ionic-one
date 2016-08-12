(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientAddCtrl', ClientAddCtrl);

    ClientAddCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ClientsService', '$ionicLoading'];

    function ClientAddCtrl($rootScope, $state, $stateParams, ClientsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSubmit: showSubmit,
            clientSubmit: clientSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function clientSubmit() {
            if (vm.form.$invalid) {
                return;
            }

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
                    $ionicLoading.hide();
                    $state.go('root.clients', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }
    }

})();
