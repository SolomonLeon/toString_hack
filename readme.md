# Javascript toString() hack

This code is designed to take over the `Function.prototype.toString` function so that when modifying the target function, the program CANNOT discover that the target function has been modified.

## Usage



```javascript
target = disguisef(target, function(){...})
```

## Example
let's suppose you want to change the alert function to `()=>{return 0}`.

```javascript
alert = disguisef(alert, ()=>{return "0"})
```

When running the alert function, it returns "0",  but `alert.toSting()` returns `function alert() { [native code] }` and `alert.toString.toString()`returns `function toString() { [native code] }`. No changes can be detected via `toString` function.

More example:

```javascript
var f = () =>{return 123}
f.toString() // '() =>{return 123}'

f = disguisef(f,()=>{return 12345})

f() // 12345
f.toString() //'() =>{return 123}'
f.toLocalString() // '() =>{return 123}'

```

