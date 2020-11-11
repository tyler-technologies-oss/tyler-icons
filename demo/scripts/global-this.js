(function() {  
  var check = function (it) { return it && it.Math == Math && it; };
  window.globalThis = check(typeof globalThis == 'object' && globalThis) ||
                      check(typeof window == 'object' && window) ||
                      check(typeof self == 'object' && self) ||
                      check(typeof global == 'object' && global) ||
                      Function('return this')();
}());
