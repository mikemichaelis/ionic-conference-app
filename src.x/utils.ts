export const convertToAsyncWithPromise = function(fn) {
    return function() {
        var args = [].slice.call(arguments);

        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(fn.apply(this, args));
            }, 0)
        });
    }
  };