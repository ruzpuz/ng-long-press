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
                    longPressTimer,
                    clickedElementHref;


                if (typeof scope.callback !== 'function') {
                    console.error('Callback is not a function');
                    alert('Callback is not a function');
                    return;
                }


                function returnHref() {
                    if (clickedElementHref) {
                        domElem.setAttribute('href', clickedElementHref);
                    }
                }
                function removeHref() {
                    if (domElem) {
                        clickedElementHref = domElem.href;
                        domElem.removeAttribute('href');
                    }
                }
                function longPressHappened() {
                    if (domElem.tagName === 'A') {
                        removeHref();
                    }
                    $timeout(scope.callback);
                }
                function clickEventStopped() {
                    domElem.removeEventListener('mouseout', clickEventStopped);
                    domElem.removeEventListener('mouseup', clickEventStopped);
                    $timeout(returnHref);
                    $timeout.cancel(longPressTimer);
                    return false;
                }
                function clickEventStarted() {
                    domElem.addEventListener('mouseout', clickEventStopped);
                    domElem.addEventListener('mouseup', clickEventStopped);
                    longPressTimer = $timeout(longPressHappened, length);
                    return false;
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