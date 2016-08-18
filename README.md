# ng-long-press
Directive that handles long press event on any html element

##How to use it
- Install it 
    
      bower install ng-long-press

- Make sure that you have included dependency to module you want to use
     
       angular.module('yourModule', ['ngLongPress']);
  
- Use the ng-long-press directive on any HTML element that supports mouse events

<pre>
&lt;div ng-long-press-callback="longPressCallback" 
     ng-long-press-length="1500" 
     ng-long-press&gt; LONG PRESS - 1500ms &lt;/div&gt;
</pre>


**ng-long-press-callback** - mandatory. Type - function

**ng-long-press-length** - optional. Type - integer. Number of milliseconds after which the callback is called.
