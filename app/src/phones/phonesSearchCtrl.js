(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesSearchCtrl', PhonesSearchCtrl);

    PhonesSearchCtrl.$inject = ['$state', '$ionicLoading'];

    function PhonesSearchCtrl($state, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            change: change,
            doSearch: doSearch
        });

        init();

        function init() {
        }

        function change() {
            vm.error = false;
            vm.minLengthError = false;
        }

        function doSearch() {
            if (vm.form.$invalid) {
                return;
            }

            if (vm.name.length < 3) {
                vm.minLengthError = true;
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            $state.go('root.phones-search-results', {name: vm.name, search: vm.search, finds: true});
        }
    }
})();