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
        .run(init);

    init.$inject = ['$rootScope'];

    function init($rootScope) {
        var mode;
        if ($rootScope.mode === undefined) {
            mode = localStorage.getItem('ui-budget.mode');
            mode = JSON.parse(mode);
            $rootScope.mode = mode;
        }

        if ($rootScope.mode === null) {
            mode = 'OFF-LINE (LocalStorage)';
            localStorage.setItem('ui-budget.mode', JSON.stringify(mode));
            $rootScope.mode = mode;
        }

        $rootScope.mode = 'ON-LINE (Heroku)';

        $rootScope.myConfig = {
            webUrl: 'http://ui-warehouse.herokuapp.com/' //TODO Heroku MongoDB
            //webUrl: 'http://localhost:3000/' //TODO Local MongoDB
            //webUrl: 'http://localhost:3000/file/' //TODO Local JSON DB
        };
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
