(function () {
    'use strict';

    function ngLongPressController($scope) {

        function longPressCallback() {
            alert('Long press happened');
        }

        $scope.longPressCallback = longPressCallback;

    }
    ngLongPressController.$inject = ['$scope'];

    angular.module('ngLongPress')
        .controller('ngLongPressController', ngLongPressController);

}());