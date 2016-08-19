# ng-long-press
Directive that handles long press event on any html element

##How to use it
- Install it 
    
         bower install ng-long-press

- Make sure that you have included dependency to module you want to use
     
         angular.module('yourModule', ['ngLongPress']);
  
- Use the ng-long-press directive on any HTML element that supports mouse events

        <div ng-long-press-callback="longPressCallback" 
             ng-long-press-length="1500" 
             ng-long-press> LONG PRESS - 1500ms </div>


**ng-long-press-callback** - mandatory. Type - function

**ng-long-press-length** - optional. Type - integer. Number of milliseconds after which the callback is called.


## Disadvantages

While active this directive tries to prevent context menu from opening. 
That means that text inside directive might not be easily selectable 
on mobile browsers. It is a bad idea to put this directive on huge content.