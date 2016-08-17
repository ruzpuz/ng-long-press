(function () {
    'use strict';

    function ngLongPressDirective($timeout) {
        return {
            restrict: 'A',
            scope: {
                callback: '=ngLongpressCallback'
            },
            link: function (scope, element, attrs) {
                var domElem = element[0],
                    length = !!attrs.ngLongpressLength ? attrs.ngLongpressLength : 500,
                    longPressTimer;


                if (typeof scope.callback !== 'function') {
                    console.error('Callback is not a function');
                    alert('Callback is not a function');
                    return;
                }
                function clickEventStopped() {
                    domElem.removeEventListener('mouseout', clickEventStopped);
                    domElem.removeEventListener('mouseup', clickEventStopped);
                    $timeout.cancel(longPressTimer);
                }
                function clickEventStarted() {
                    domElem.addEventListener('mouseout', clickEventStopped);
                    domElem.addEventListener('mouseup', clickEventStopped);
                    longPressTimer = $timeout(scope.callback, length);
                }
                domElem.addEventListener('mousedown', clickEventStarted);

            }
        };
    }
    ngLongPressDirective.$inject = ['$timeout'];

    angular
        .module('ngLongPress')
        .directive('ngLongPress', ngLongPressDirective);

}());