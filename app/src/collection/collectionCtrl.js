(function () {
    'use strict';

    angular
        .module('app')
        .controller('CollectionCtrl', CollectionCtrl);

    CollectionCtrl.$inject = ['$scope', '$rootScope', '$state', 'CollectionService', '$ionicLoading'];

    function CollectionCtrl($scope, $rootScope, $state, CollectionService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSearch: showSearch,
            phoneDelete: phoneDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            itemDetails: itemDetails,
            itemsSearch: itemsSearch
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.items = [];
            vm.itemsFilter = [];
            vm.clear = false;
            vm.searchShowed = false;

            CollectionService.getItems()
                .then(function (result) {
                    vm.items = result.data;
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
            CollectionService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);
            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.items = [];
            vm.clear = false;
            CollectionService.getItems()
                .then(function (result) {
                    vm.items = result.data;
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

        function itemDetails(item) {
            $state.go('root.collection-details', {item: item});
        }


        function itemsSearch() {
            $state.go('root.collection-search');
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }

    }
})();