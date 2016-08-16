﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesCtrl', MoviesCtrl);

    MoviesCtrl.$inject = ['$scope', '$rootScope', '$state', 'MoviesLocalStorage',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function MoviesCtrl($scope, $rootScope, $state, MoviesLocalStorage, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSearch: showSearch,
            showConfirm: showConfirm,
            movieDelete: movieDelete,
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
            $rootScope.raisedError = false;

            vm.movies = MoviesLocalStorage.getItems();
            vm.moviesFilter = vm.movies;
            $ionicLoading.hide();

            if (vm.movies.length == 0) {
                $state.go('root.movies-search');
            }
        }

        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function showConfirm(movie) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete client',
                template: 'Are you sure you want to delete ' + movie.name + '?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    movieDelete(movie.id);
                } else {
                    $ionicListDelegate.closeOptionButtons();
                    console.log('You are not sure');
                }
            });
        }

        function movieDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            MoviesLocalStorage.deleteItem(id);
            $ionicLoading.hide();
            $ionicListDelegate.closeOptionButtons();
        }

        function doRefresh() {
            vm.movies = [];
            vm.clear = false;

            vm.movies = MoviesLocalStorage.getItems();
            vm.moviesFilter = vm.movies;
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