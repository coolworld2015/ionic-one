(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesCtrl', PhonesCtrl);

    PhonesCtrl.$inject = ['$scope', '$rootScope', '$state', 'PhonesService', '$ionicLoading'];

    function PhonesCtrl($scope, $rootScope, $state, PhonesService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            phoneDelete: phoneDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            phoneDetails: phoneDetails
        });

        init();

        function init() {
            vm.phones = [];
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            vm.clear = false;
            PhonesService.getItems()
                .then(function (result) {
                    vm.phones = result.data;
                    $ionicLoading.hide();
                });
        }

        function phoneDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                console.log(111);
                ClientsService.deleteItem(id)
                    .then(function () {
                        init();
                    })
                    .catch(errorHandler);
            } else {
//                UsersLocalStorage.deleteItem(vm.id);
//                $rootScope.loading = true;
//                $timeout(function () {
//                    $state.go('users');
//                }, 100);
            }
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

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
            $ionicLoading.hide();
        }

    }
})();