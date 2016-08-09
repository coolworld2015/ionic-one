(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesCtrl', PhonesCtrl);

    PhonesCtrl.$inject = ['$scope', '$rootScope', '$state', 'PhonesService', '$ionicLoading'];

    function PhonesCtrl($scope, $rootScope, $state, PhonesService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            clientDelete: clientDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            clientDetails: clientDetails,
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

        function clientDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                console.log(111);
                ClientsService.deleteItem(id)
                    .then(function () {
                        init();
                    })
                    .catch(errorHandler);
            } else {
//                UsersLocalStorage.deleteItem(vm.id);
//                $rootScope.loading = true;
//                $timeout(function () {
//                    $state.go('users');
//                }, 100);
            }
            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.clients = [];
            vm.clear = false;
            ClientsService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    vm.clients.sort(sort);
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function clientDetails(item) {
            $state.go('root.client-details', {item: item});
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }

    }
})();