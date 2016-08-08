(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientsCtrl', ClientsCtrl);

    ClientsCtrl.$inject = ['$scope', '$rootScope', '$state', 'ClientsService', '$ionicLoading'];

    function ClientsCtrl($scope, $rootScope, $state, ClientsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            clientDelete: clientDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            clientDetails: clientDetails,
            _sort: sort
        });

        init();

        function init1() {
            vm.clear = false;
            vm.clients = [
                {name: 'test1'},
                {name: 'test2'},
                {name: 'test3'}
            ];
        }

        function init() {
            vm.clients = [];
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            vm.clear = false;
            ClientsService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    vm.clients.sort(sort);
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

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }

})();