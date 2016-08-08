(function () {
    'use strict';
    angular
        .module('app')
        .factory('ClientsService', ClientsService);

    ClientsService.$inject = ['$http'];

    function ClientsService($http) {
        return {
            getAll: getAll
        };

        function getAll() {
            var url = 'http://ui-warehouse.herokuapp.com/api/clients/get';
            return $http.get(url)
                .then(function (result) {
                    return result;
                });
        }
    }
})();
