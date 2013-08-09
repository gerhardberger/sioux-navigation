# sioux Navigation

``` batch
npm install sioux-navigation
```

Navigation (similar to the [iOS one](http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UINavigationController_Class/Reference/Reference.html)) for sioux.

### Create
``` js
var Navigation = require('sioux-navigation');

// the first argument is in which the navigation will be inserted into
var nav = new Navigation(document.querySelector('.screen'), {
  isBarHidden: false
  , initWith: navElem
});
```

### The navigation object
The `stack` contains and at the creation the `initWith` property and `.push()` method take an object too, which has to contain:
* __title__: the title in the bar, _String_
* __contentFn__: a function that returns DOM what will be inserted into the `content` part, _Function_
* __complete__: this function will be executed when the content will be loaded, _Function_

### Properties
* __stack__: the stack of the windows in the navigation, the last elem of the stack is the one active on the screen
* __isBarHidden__: _Boolean_
* __bar__: the top bar element
* __content__: the content element
* __segue__: the [Segue](https://github.com/gerhardberger/sioux-segue) object (in the content element)

### Methods
* __.push(navElem)__: A new elem will be added to the `stack` and it will be displayed on screen.
* __.pop(callback)__: The last elem of the `stack` will be popped and then the previous elem will be displayed. The `callback` will be executed when the animation finished.
* __.hideBar(callback)__: Hides the top bar.
* __.showBar(callback)__: Shows it.

``` js
var navObj = {
  title: 'Test Title'
  , content: function () {
    var div = document.createElement('div');
    div.innerText = 'Foo';
    return div;
  }
  , complete: function (content) {
    console.log('Completed!');
  }
};

navigation.push(navObj);
```
