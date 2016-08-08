(function () {
    'use strict';
    angular
        .module('app')
        .factory('ClientsService', ClientsService);

    ClientsService.$inject = ['$rootScope', '$http'];

    function ClientsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            getClients: getClients,
            deleteItem: deleteItem
        };

        function getClients() {
            var url = webUrl + 'api/clients/get';
            return $http.get(url)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/clients/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
    }
})();
