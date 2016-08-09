(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientsCtrl', ClientsCtrl);

    ClientsCtrl.$inject = ['$scope', '$rootScope', '$state', 'ClientsService', '$ionicLoading', '$ionicPopup'];

    function ClientsCtrl($scope, $rootScope, $state, ClientsService, $ionicLoading, $ionicPopup) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showConfirm: showConfirm,
            clientDelete: clientDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            clientDetails: clientDetails
        });

        init();

        function init() {
            vm.clients = [];
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            vm.clear = false;
            ClientsService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    $ionicLoading.hide();
                });
        }

        function showConfirm(client) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Deleting',
                template: 'Are you sure you want to delete ' + client.name + ' ?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    clientDelete(client.id);
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        function clientDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            console.log(id);
            ClientsService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);

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