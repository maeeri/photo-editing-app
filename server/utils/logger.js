var info = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.log.apply(console, params);
};
var error = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    console.error.apply(console, params);
};
module.exports = {
    info: info,
    error: error,
}, {};
