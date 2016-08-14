(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesSearchResultsCtrl', MoviesSearchResultsCtrl);

    MoviesSearchResultsCtrl.$inject = ['$scope', '$rootScope', '$state', 'items',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function MoviesSearchResultsCtrl($scope, $rootScope, $state, items, 
		$ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            queryChanged: queryChanged,
            queryClear: queryClear,
            moviesDetails: moviesDetails,
            moviesSearch: moviesSearch
        });

        init();

        function init() {
			var arr = [];
			arr.push(items);
			if (items.Response == 'False') {
				vm.movies = [];
				vm.moviesFilter = [];
			} else {
				arr[0].plot = items.Plot;
				arr[0].name = items.Title;
				arr[0].year = items.Year;
				arr[0].pic = items.Poster;
				arr[0].genre = items.Genre;
				arr[0].country = items.Country;
				arr[0].actors = items.Actors;
				arr[0].runtime = items.Runtime;
				arr[0].type = items.Type;
				arr[0].imdbID = items.imdbID;
				arr[0].imdbRating = items.imdbRating;
			
				vm.movies = arr;
				vm.moviesFilter = arr;		
			}
            vm.clear = false;
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

        function moviesDetails(item) {
            $state.go('root.movies-details', {item: item});
        }


        function moviesSearch() {
            $state.go('root.movies-search');
        }
    }
})();