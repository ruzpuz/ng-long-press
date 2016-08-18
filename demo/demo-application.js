(function () {
    'use strict';

    function demoController($scope) {

        function longPressCallback() {
            alert('Long press happened');
            console.log('Long press happened');
        }

        $scope.longPressCallback = longPressCallback;

    }
    demoController.$inject = ['$scope'];

    angular.module('demo', ['ngLongPress'])
        .controller('demoController', demoController);

}());