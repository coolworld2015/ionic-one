﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditCtrl', AuditCtrl);

    AuditCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuditService', '$ionicLoading'];

    function AuditCtrl($scope, $rootScope, $state, AuditService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSearch: showSearch,
            phoneDelete: phoneDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            phoneDetails: phoneDetails,
            phonesSearch: phonesSearch
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.phones = [];
            vm.phonesFilter = [];
            vm.clear = false;
            vm.searchShowed = false;

            AuditService.getAudit()
                .then(function (result) {
                    vm.phones = result.data;
                    $ionicLoading.hide();
                });
        }

        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function phoneDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            PhonesService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);
            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.phones = [];
            vm.clear = false;
            PhonesService.getItems()
                .then(function (result) {
                    vm.phones = result.data;
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

        function phoneDetails(item) {
            $state.go('root.phone-details', {item: item});
        }


        function phonesSearch() {
            $state.go('root.phones-search');
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }

    }
})();