(function () {
    'use strict';

    angular
        .module('app', ['ionic']);

    angular
        .module('app')
        .run(runIonic);

    runIonic.$inject = ['$ionicPlatform'];

    function runIonic($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }

    angular
        .module('app')
        .directive('hideTabs', function ($rootScope) {
            return {
                restrict: 'A',
                link: function ($scope, $el) {
                    console.log(111);
                    $rootScope.hideTabs = 'tabs-item-hide';
                    $scope.$on('$destroy', function () {
                        $rootScope.hideTabs = '';
                    });
                }
            };
        });
})();
