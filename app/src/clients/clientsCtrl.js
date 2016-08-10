(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientsCtrl', ClientsCtrl);

    ClientsCtrl.$inject = ['$scope', '$rootScope', '$state', 'ClientsService',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function ClientsCtrl($scope, $rootScope, $state, ClientsService,
                         $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            addConfirm: addConfirm,
            showConfirm: showConfirm,
            clientDelete: clientDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            clientDetails: clientDetails
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.clients = [];
            vm.clear = false;

            ClientsService.getClients()
                .then(function (result) {
                    vm.clients = result.data;
                    $ionicLoading.hide();
                });
        }

        function addConfirm(client) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Add client',
                template: 'Are you sure you want to add new client?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        function showConfirm(client) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete client',
                template: 'Are you sure you want to delete ' + client.name + '?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    clientDelete(client.id);
                    console.log('You are sure');
                } else {
                    $ionicListDelegate.closeOptionButtons();
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