(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientsCtrl', ClientsCtrl);

    ClientsCtrl.$inject = ['$scope', '$state', 'ClientsService', '$ionicLoading'];

    function ClientsCtrl($scope, $state, ClientsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
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
            ClientsService.getAll()
                .then(function (result) {
                    vm.clients = result.data;
                    vm.clients.sort(sort);
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();
                });
        }

        function doRefresh() {
            vm.clients = [];
            vm.clear = false;
            ClientsService.getAll()
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