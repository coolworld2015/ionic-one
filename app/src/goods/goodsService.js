(function () {
    'use strict';
    angular
        .module('app')
        .factory('GoodsService', GoodsService);

    GoodsService.$inject = ['$http'];

    function GoodsService($http) {
        return {
            getAll: getAll
        };

        function getAll() {
            var url = 'http://ui-warehouse.herokuapp.com/api/goods/get';
            return $http.get(url)
                .then(function (result) {
                    return result;
                });
        }
    }
})();
