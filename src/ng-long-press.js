(function () {
    'use strict';

    function ngLongPressDirective($timeout) {
        return {
            restrict: 'A',
            scope: {
                callback: '=ngLongPressCallback'
            },
            link: function (scope, element, attrs) {
                var domElem = element[0],
                    length = !!attrs.ngLongPressLength ? attrs.ngLongPressLength : 500,
                    longPressTimer,
                    clickedElementHref,
                    clickedElementOrigin;

                function isInt(value) {
                    var x;
                    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
                }

                if (typeof scope.callback !== 'function') {
                    console.error('Callback is not a function');
                    alert('Callback is not a function');
                    return;
                } else if (!isInt(length)) {
                    console.error('Length is not an integer');
                    alert('Length is not an integer');
                    return;
                }

                function returnHref() {
                    if (clickedElementOrigin) {
                        clickedElementOrigin.setAttribute('href', clickedElementHref);
                    }
                    clickedElementHref = null;
                    clickedElementOrigin = null;
                }
                function removeHref() {
                    if (clickedElementOrigin) {
                        clickedElementHref = clickedElementOrigin.href;
                        clickedElementOrigin.removeAttribute('href');
                    }
                }
                function longPressHappened() {
                    if (clickedElementOrigin.tagName === 'A') {
                        removeHref();
                    }
                    angular.element(document.body).removeClass('ng-long-press');
                    $timeout(scope.callback);
                }
                function clickEventStopped() {

                    domElem.removeEventListener('mouseout', clickEventStopped);
                    domElem.removeEventListener('mouseup', clickEventStopped);
                    domElem.removeEventListener('touchend', clickEventStopped);
                    domElem.removeEventListener('touchcancel', clickEventStopped);
                    domElem.removeEventListener('touchmove', clickEventStopped);

                    $timeout(returnHref);
                    $timeout.cancel(longPressTimer);

                    return false;
                }
                function clickEventStarted(event) {
                    angular.element(document.body).addClass('ng-long-press');

                    event.cancel=true;
                    event.returnValue=false;
                    event.cancelBubble=true;
                    if (event.stopPropagation) event.stopPropagation();
                    if (event.preventDefault) event.preventDefault();

                    clickedElementOrigin = event.target;

                    domElem.addEventListener('mouseout', clickEventStopped);
                    domElem.addEventListener('mouseup', clickEventStopped);
                    domElem.addEventListener('touchend', clickEventStopped);
                    domElem.addEventListener('touchcancel', clickEventStopped);
                    domElem.addEventListener('touchmove', clickEventStopped);

                    longPressTimer = $timeout(longPressHappened, length);

                    return false;
                }function createCssClass() {
                    var style = document.createElement('style');

                    style.type = 'text/css';
                    style.id = 'ng-long-press-style';
                    style.innerHTML = '.ng-long-press {-webkit-touch-callout: none !important; user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; -webkit-user-select: none !important;}';

                    if(!document.getElementById('ng-long-press-style')) {
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }

                }

                createCssClass();
                domElem.addEventListener('mousedown', clickEventStarted);
                domElem.addEventListener('touchstart', clickEventStarted);

            }
        };
    }
    ngLongPressDirective.$inject = ['$timeout'];

    angular
        .module('ngLongPress', [])
        .directive('ngLongPress', ngLongPressDirective);

}());