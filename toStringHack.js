(function() {
    /***
    This code is designed to take over the Function.prototype.toString 
    function so that when modifying the target function, the program 
    CANNOT detect changes via the toString function.

    Usage:
    target = disguisef(target, function(){...})

    Example:
    let's suppose you want to change the alert function to `()=>{return 0}`.

    ```
    alert = disguisef(alert, ()=>{return "0"})
    ```

    When running the alert function, it returns "0",  but `alert.toSting()` 
    returns 'function alert() { [native code] }' and `alert.toString.toString()`
    returns 'function toString() { [native code] }'. No changes can be detected 
    via toString().

    More example:

    ```javascript
    var f = () =>{return 123}
    f.toString() // '() =>{return 123}'

    f = disguisef(f,()=>{return 12345})

    f() // 12345
    f.toString() //'() =>{return 123}'
    f.toLocalString() // '() =>{return 123}'

    ```


    ***/
    var tmp;
    var toStringProxyFuction = function() {
        if (typeof(this) !== 'function') {
            console.log(this)
        } else if (proxyFunction.includes(this)) {
            return proxyString[proxyFunction.indexOf(this)]
        } else {
            this.____toString____ = realToString;
            tmp = this.____toString____();
            delete this.____toString____;
            return tmp;
        }
    }
    var proxyFunction = [];
    var proxyString = [];
    proxyFunction.push(toStringProxyFuction);
    proxyString.push(Function.prototype.toString.toString());

    var realToString = Function.prototype.toString;

    Function.prototype.toString = toStringProxyFuction;

    window.disguisef = function(targetFunc, realFunc) {
        proxyFunction.push(realFunc);
        proxyString.push(targetFunc.toString());
        return realFunc;
    }
})()