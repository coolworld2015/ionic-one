(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesCtrl', MoviesCtrl);

    MoviesCtrl.$inject = ['$scope', '$rootScope', '$state', 'MoviesLocalStorage', '$ionicLoading'];

    function MoviesCtrl($scope, $rootScope, $state, MoviesLocalStorage, $ionicLoading) {
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

            vm.movies = [];
            vm.clear = false;
            vm.searchShowed = false;

            vm.movies = MoviesLocalStorage.getItems();
			vm.moviesFilter = vm.movies;
			$ionicLoading.hide();
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
            vm.movies = [];
            vm.clear = false;
			
			vm.movies = MoviesLocalStorage.getItems();
			$scope.$broadcast('scroll.refreshComplete');
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
            $state.go('root.movies-details', {item: item});
        }


        function itemsSearch() {
            $state.go('root.movies-search');
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }

    }
})();