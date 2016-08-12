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

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                description: vm.description,
                cv: vm.cv,
                sum: 0
            };

            ClientsService.addItem(item)
                .then(function () {
                    $ionicLoading.hide();
                    $state.go('root.clients', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }

})();
