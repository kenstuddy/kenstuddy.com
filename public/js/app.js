webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(3);
var isBuffer = __webpack_require__(16);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(18);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(5);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(19);
var buildURL = __webpack_require__(21);
var parseHeaders = __webpack_require__(22);
var isURLSameOrigin = __webpack_require__(23);
var createError = __webpack_require__(6);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(24);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(25);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(20);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_v_img__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vee_validate__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_resource__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Slider_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Slider_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Contact_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Contact_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Contact_vue__);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(13);

window.Vue = __webpack_require__(9);







Vue.use(__WEBPACK_IMPORTED_MODULE_0_v_img__["a" /* default */]);
Vue.use(__WEBPACK_IMPORTED_MODULE_1_vee_validate__["a" /* default */]);
Vue.use(__WEBPACK_IMPORTED_MODULE_2_vue_resource__["a" /* default */]);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

var app = new Vue({
    el: "#app",
    components: {
        "slider": __WEBPACK_IMPORTED_MODULE_3__components_Slider_vue___default.a,
        "contact": __WEBPACK_IMPORTED_MODULE_4__components_Contact_vue___default.a
    },
    mounted: function mounted() {}
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


//window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  //window.$ = window.jQuery = require('jquery');

  //require('bootstrap-sass');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(14);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key',
//     cluster: 'mt1',
//     encrypted: true
// });

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(3);
var Axios = __webpack_require__(17);
var defaults = __webpack_require__(1);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8);
axios.CancelToken = __webpack_require__(31);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(32);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(1);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(26);
var dispatchRequest = __webpack_require__(27);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(6);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(28);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(1);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(30);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(8);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),n=" *[data-v-5928e1c7] { -webkit-box-sizing: border-box; box-sizing: border-box; } .fullscreen-v-img[data-v-5928e1c7] { z-index: 9999; height: 100%; width: 100%; position: fixed; top: 0; left: 0; overflow: hidden; background-color: rgba(0, 0, 0, 0.7); -ms-touch-action: none; touch-action: none; } .content-v-img img[data-v-5928e1c7] { width: auto; height: auto; max-width: 100%; max-height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .header-v-img[data-v-5928e1c7], .footer-v-img[data-v-5928e1c7] { position: absolute; width: 100%; background-color: rgba(0, 0, 0, 0.3); height: 50px; z-index: 9999; display: flex; align-items: center; } .header-v-img[data-v-5928e1c7] { justify-content: space-between; } .footer-v-img[data-v-5928e1c7] { bottom: 0; justify-content: center; height: 70px; /* scrolling thumbnails on mobile */ overflow-x: auto; } .footer-v-img img[data-v-5928e1c7] { width: 60px; height: 60px; cursor: pointer; -webkit-transition: transform 0.2s ease-out; transition: transform 0.2s ease-out; object-fit: cover; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .footer-v-img img.is-selected[data-v-5928e1c7] { transform: scale(1.1); } .footer-v-img img[data-v-5928e1c7]:not(:last-child) { margin-right: 7px; } .title-v-img[data-v-5928e1c7] { font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; color: white; text-align: center; max-height: 100%; overflow: auto; } .count-v-img[data-v-5928e1c7], .buttons-v-img[data-v-5928e1c7] { width: 80px; font-family: 'Avenir', Helvetica, Arial, sans-serif; } .count-v-img[data-v-5928e1c7] { font-size: 15px; color: white; margin-left: 10px; } .buttons-v-img[data-v-5928e1c7] { margin-right: 10px; text-align: right; } .buttons-v-img span path[data-v-5928e1c7] { fill: #e5e6eb; -webkit-transition: fill 0.4s ease-in-out; transition: fill 0.4s ease-in-out; } .buttons-v-img span[data-v-5928e1c7] { cursor: pointer; color: #e5e6eb; font-size: 30px; -webkit-transition: color 0.4s ease-in-out; transition: color 0.4s ease-in-out; text-decoration: none; text-align: center; } .buttons-v-img span[data-v-5928e1c7]:not(:last-child) { margin-right: 8px; } .buttons-v-img span svg[data-v-5928e1c7] { height: 20px; width: 15px; } .buttons-v-img span:hover svg path[data-v-5928e1c7] { fill: white; } .buttons-v-img span[data-v-5928e1c7]:hover { color: white; } .prev-v-img svg[data-v-5928e1c7], .next-v-img svg[data-v-5928e1c7] { margin: 5px auto; } .prev-v-img[data-v-5928e1c7], .next-v-img[data-v-5928e1c7] { color: white; width: 35px; height: 35px; position: absolute; top: 50%; margin-top: -12.5px; font-size: 15px; font-family: 'Avenir', Helvetica, Arial, sans-serif; text-align: center; background-color: rgba(0, 0, 0, 0.3); z-index: 1000; opacity: 0.3; -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; cursor: pointer; } .prev-v-img[data-v-5928e1c7]:hover, .next-v-img[data-v-5928e1c7]:hover { opacity: 1; } .prev-v-img[data-v-5928e1c7] { left: 10px; } .next-v-img[data-v-5928e1c7] { right: 10px; } .v-img-fade-enter[data-v-5928e1c7], .v-img-fade-leave-to[data-v-5928e1c7] { opacity: 0; } .v-img-fade-enter-active[data-v-5928e1c7], .v-img-fade-leave-active[data-v-5928e1c7] { -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),e.appendChild(t)}}();var ImgScreen={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{appear:"",name:"v-img-fade"}},[e.closed?e._e():n("div",{staticClass:"fullscreen-v-img",on:{click:function(t){if(t.target!==t.currentTarget)return null;e.close(t)}}},[n("div",{staticClass:"header-v-img"},[n("span",{staticClass:"count-v-img"},[e.images.length>1?n("span",[e._v(e._s(e.currentImageIndex+1)+"/"+e._s(e.images.length)+" ")]):e._e()]),n("span",{staticClass:"title-v-img"},[e._v(e._s(e.titles[e.currentImageIndex]))]),n("div",{staticClass:"buttons-v-img"},[e.sourceButtons[e.currentImageIndex]?n("span",[n("a",{attrs:{href:e.images[e.currentImageIndex],target:"_blank"}},[n("svg",{staticStyle:{"enable-background":"new 0 0 475.078 475.077"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",width:"512px",height:"512px",viewBox:"0 0 475.078 475.077","xml:space":"preserve"}},[n("path",{attrs:{d:"M467.083,318.627c-5.324-5.328-11.8-7.994-19.41-7.994H315.195l-38.828,38.827c-11.04,10.657-23.982,15.988-38.828,15.988    c-14.843,0-27.789-5.324-38.828-15.988l-38.543-38.827H27.408c-7.612,0-14.083,2.669-19.414,7.994    C2.664,323.955,0,330.427,0,338.044v91.358c0,7.614,2.664,14.085,7.994,19.414c5.33,5.328,11.801,7.99,19.414,7.99h420.266    c7.61,0,14.086-2.662,19.41-7.99c5.332-5.329,7.994-11.8,7.994-19.414v-91.358C475.078,330.427,472.416,323.955,467.083,318.627z     M360.025,414.841c-3.621,3.617-7.905,5.424-12.854,5.424s-9.227-1.807-12.847-5.424c-3.614-3.617-5.421-7.898-5.421-12.844    c0-4.948,1.807-9.236,5.421-12.847c3.62-3.62,7.898-5.431,12.847-5.431s9.232,1.811,12.854,5.431    c3.613,3.61,5.421,7.898,5.421,12.847C365.446,406.942,363.638,411.224,360.025,414.841z M433.109,414.841    c-3.614,3.617-7.898,5.424-12.848,5.424c-4.948,0-9.229-1.807-12.847-5.424c-3.613-3.617-5.42-7.898-5.42-12.844    c0-4.948,1.807-9.236,5.42-12.847c3.617-3.62,7.898-5.431,12.847-5.431c4.949,0,9.233,1.811,12.848,5.431    c3.617,3.61,5.427,7.898,5.427,12.847C438.536,406.942,436.729,411.224,433.109,414.841z",fill:"#FFFFFF"}}),n("path",{attrs:{d:"M224.692,323.479c3.428,3.613,7.71,5.421,12.847,5.421c5.141,0,9.418-1.808,12.847-5.421l127.907-127.908    c5.899-5.519,7.234-12.182,3.997-19.986c-3.23-7.421-8.847-11.132-16.844-11.136h-73.091V36.543c0-4.948-1.811-9.231-5.421-12.847    c-3.62-3.617-7.901-5.426-12.847-5.426h-73.096c-4.946,0-9.229,1.809-12.847,5.426c-3.615,3.616-5.424,7.898-5.424,12.847V164.45    h-73.089c-7.998,0-13.61,3.715-16.846,11.136c-3.234,7.801-1.903,14.467,3.999,19.986L224.692,323.479z",fill:"#FFFFFF"}})])])]):e._e(),n("span",{on:{click:e.close}},[e._v("×")])])]),n("transition",{attrs:{appear:"",name:"v-img-fade"}},[e.visibleUI&&1!==e.images.length?n("span",{staticClass:"prev-v-img",on:{click:e.prev}},[n("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z",fill:"#fff"}})])]):e._e()]),n("transition",{attrs:{appear:"",name:"v-img-fade"}},[e.visibleUI&&1!==e.images.length?n("span",{staticClass:"next-v-img",on:{click:e.next}},[n("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z",fill:"#fff"}})])]):e._e()]),e.thumbnails&&e.images.length>1?n("div",{staticClass:"footer-v-img"},e._l(e.images,function(t,i){return n("img",{key:i,class:{"is-selected":e.currentImageIndex==i},attrs:{src:t},on:{click:function(t){e.select(i)}}})})):e._e(),n("div",{staticClass:"content-v-img"},[n("img",{attrs:{src:e.images[e.currentImageIndex]},on:{click:e.next}})])],1)])},staticRenderFns:[],_scopeId:"data-v-5928e1c7",data:function(){return{images:[],titles:[],sourceButtons:[],visibleUI:!0,currentImageIndex:0,closed:!0,uiTimeout:null,handlers:{},thumbnails:!1}},watch:{closed:function(e){e&&this.handlers.closed&&this.handlers.closed(),!e&&this.handlers.opened&&this.handlers.opened()}},methods:{fireChangeEvent:function(){this.handlers.changed&&this.handlers.changed(this.currentImageIndex)},close:function(){this.closed||(document.querySelector("body").classList.remove("body-fs-v-img"),this.images=[],this.currentImageIndex=0,this.closed=!0)},next:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex+1<this.images.length?this.currentImageIndex++:this.currentImageIndex=0,this.fireChangeEvent())},select:function(e){this.currentImageIndex=e},prev:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex>0?this.currentImageIndex--:this.currentImageIndex=this.images.length-1,this.fireChangeEvent())},showUI:function(){var e=this;this.closed||(clearTimeout(this.uiTimeout),this.visibleUI=!0,this.uiTimeout=setTimeout(function(){e.visibleUI=!1},3500))}},created:function(){var e=this;window.addEventListener("keyup",function(t){27!==t.keyCode&&81!==t.keyCode||e.close(),39!==t.keyCode&&76!==t.keyCode||e.next(),37!==t.keyCode&&72!==t.keyCode||e.prev()}),window.addEventListener("scroll",function(){e.close()}),window.addEventListener("mousemove",function(){e.showUI()})}},babelHelpers={},asyncGenerator=function(){function e(e){this.value=e}function t(t){function n(a,s){try{var o=t[a](s),r=o.value;r instanceof e?Promise.resolve(r.value).then(function(e){n("next",e)},function(e){n("throw",e)}):i(o.done?"return":"normal",o.value)}catch(e){i("throw",e)}}function i(e,t){switch(e){case"return":a.resolve({value:t,done:!0});break;case"throw":a.reject(t);break;default:a.resolve({value:t,done:!1})}(a=a.next)?n(a.key,a.arg):s=null}var a,s;this._invoke=function(e,t){return new Promise(function(i,o){var r={key:e,arg:t,resolve:i,reject:o,next:null};s?s=s.next=r:(a=s=r,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)},{wrap:function(e){return function(){return new t(e.apply(this,arguments))}},await:function(t){return new e(t)}}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},addPluginAttributes=function(e,t,n){var i="pointer",a=t.arg||null,s=void 0,o=void 0,r=e.src,c=void 0,l=void 0,u={};return n.altAsTitle&&(c=e.alt),s=n.openOn,o=n.sourceButton,l=n.thumbnails,void 0!==t.value&&(i=t.value.cursor||i,a=t.value.group||a,s=t.value.openOn||s,r=t.value.src||r,c=t.value.title||c,u.opened=t.value.opened,u.closed=t.value.closed,u.changed=t.value.changed,void 0!==t.value.sourceButton&&(o=t.value.sourceButton),void 0!==t.value.thumbnails&&(l=t.value.thumbnails)),e.setAttribute("data-vue-img-src",r),a&&e.setAttribute("data-vue-img-group",a),c&&e.setAttribute("data-vue-img-title",c),o&&e.setAttribute("data-vue-img-source-button",o),l&&e.setAttribute("data-vue-img-thumbnails",l),r||console.error("v-img element missing src parameter."),e.style.cursor=i,{cursor:i,src:r,group:a,title:c,events:u,sourceButton:o,openOn:s,thumbnails:l}},install=function(e,t){var n=e.extend(ImgScreen);t=_extends({altAsTitle:!1,sourceButton:!1,thumbnails:!1,openOn:"click"},t),e.directive("img",{update:function(e,n,i,a){var s=void 0,o=void 0;a.data.attrs&&i.data.attrs&&(o=a.data.attrs.src!==i.data.attrs.src,t.altAsTitle&&(s=a.data.attrs.alt!==i.data.attrs.alt));var r=n.oldValue!==n.value;(o||s||r)&&addPluginAttributes(e,n,t)},bind:function(i,a){var s=addPluginAttributes(i,a,t),o=window.vueImg;if(!o){var r=document.createElement("div");r.setAttribute("id","imageScreen"),document.querySelector("body").appendChild(r),o=window.vueImg=(new n).$mount("#imageScreen")}i.addEventListener(s.openOn,function(){var t=void 0;t=i.dataset.vueImgGroup?[].concat(toConsumableArray(document.querySelectorAll('img[data-vue-img-group="'+i.dataset.vueImgGroup+'"]'))):[i],e.set(o,"images",t.map(function(e){return e.dataset.vueImgSrc})),e.set(o,"titles",t.map(function(e){return e.dataset.vueImgTitle})),e.set(o,"sourceButtons",t.map(function(e){return"true"===e.dataset.vueImgSourceButton})),e.set(o,"thumbnails","true"===i.dataset.vueImgThumbnails),e.set(o,"currentImageIndex",t.indexOf(i)),e.set(o,"handlers",s.events),e.set(o,"closed",!1)})}})};"undefined"!=typeof window&&window.Vue&&window.Vue.use(install);/* harmony default export */ __webpack_exports__["a"] = (install);
//# sourceMappingURL=v-img.mjs.map


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export install */
/* unused harmony export use */
/* unused harmony export directive */
/* unused harmony export mixin */
/* unused harmony export mapFields */
/* unused harmony export Validator */
/* unused harmony export ErrorBag */
/* unused harmony export Rules */
/* unused harmony export ErrorComponent */
/* unused harmony export version */
/**
  * vee-validate v2.0.9
  * (c) 2018 Abdelrahman Awad
  * @license MIT
  */
var supportsPassive = true;
var detectPassiveSupport = function () {
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {
        supportsPassive = false;
    }
    return supportsPassive;
};
var addEventListener = function (el, eventName, cb) {
    el.addEventListener(eventName, cb, supportsPassive ? {
        passive: true
    } : false);
};
var isTextInput = function (el) { return ['text','number','password','search','email','tel',
    'url','textarea'].indexOf(el.type) !== -1; };
var isCheckboxOrRadioInput = function (el) { return ['radio','checkbox'].indexOf(el.type) !== -1; };
var getDataAttribute = function (el, name) { return el.getAttribute(("data-vv-" + name)); };
var isNullOrUndefined = function (value) { return value === null || value === undefined; };
var createFlags = function () { return ({
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: null,
    invalid: null,
    validated: false,
    pending: false,
    required: false,
    changed: false
}); };
var isEqual = function (lhs, rhs) {
    if (lhs instanceof RegExp && rhs instanceof RegExp) {
        return isEqual(lhs.source, rhs.source) && isEqual(lhs.flags, rhs.flags);
    }
    if (Array.isArray(lhs) && Array.isArray(rhs)) {
        if (lhs.length !== rhs.length) 
            { return false; }
        for (var i = 0;i < lhs.length; i++) {
            if (!isEqual(lhs[i], rhs[i])) {
                return false;
            }
        }
        return true;
    }
    if (isObject(lhs) && isObject(rhs)) {
        return Object.keys(lhs).every(function (key) { return isEqual(lhs[key], rhs[key]); }) && Object.keys(rhs).every(function (key) { return isEqual(lhs[key], rhs[key]); });
    }
    return lhs === rhs;
};
var getScope = function (el) {
    var scope = getDataAttribute(el, 'scope');
    if (isNullOrUndefined(scope)) {
        var form = getForm(el);
        if (form) {
            scope = getDataAttribute(form, 'scope');
        }
    }
    return !isNullOrUndefined(scope) ? scope : null;
};
var getForm = function (el) {
    if (isNullOrUndefined(el)) 
        { return null; }
    if (el.tagName === "FORM") 
        { return el; }
    if (!isNullOrUndefined(el.form)) 
        { return el.form; }
    return !isNullOrUndefined(el.parentNode) ? getForm(el.parentNode) : null;
};
var getPath = function (path, target, def) {
    if ( def === void 0 ) def = undefined;

    if (!path || !target) 
        { return def; }
    var value = target;
    path.split('.').every(function (prop) {
        if (!Object.prototype.hasOwnProperty.call(value, prop) && value[prop] === undefined) {
            value = def;
            return false;
        }
        value = value[prop];
        return true;
    });
    return value;
};
var hasPath = function (path, target) {
    var obj = target;
    return path.split('.').every(function (prop) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
        obj = obj[prop];
        return true;
    });
};
var parseRule = function (rule) {
    var params = [];
    var name = rule.split(':')[0];
    if (~rule.indexOf(':')) {
        params = rule.split(':').slice(1).join(':').split(',');
    }
    return {
        name: name,
        params: params
    };
};
var debounce = function (fn, wait, immediate, token) {
    if ( wait === void 0 ) wait = 0;
    if ( immediate === void 0 ) immediate = false;
    if ( token === void 0 ) token = {
    cancelled: false
};

    if (wait === 0) {
        return fn;
    }
    var timeout;
    return function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var later = function () {
            timeout = null;
            if (!immediate && !token.cancelled) 
                { fn.apply(void 0, args); }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) 
            { fn.apply(void 0, args); }
    };
};
var normalizeRules = function (rules) {
    if (!rules) {
        return {};
    }
    if (isObject(rules)) {
        return Object.keys(rules).reduce(function (prev, curr) {
            var params = [];
            if (rules[curr] === true) {
                params = [];
            } else if (Array.isArray(rules[curr])) {
                params = rules[curr];
            } else {
                params = [rules[curr]];
            }
            if (rules[curr] !== false) {
                prev[curr] = params;
            }
            return prev;
        }, {});
    }
    if (typeof rules !== 'string') {
        warn('rules must be either a string or an object.');
        return {};
    }
    return rules.split('|').reduce(function (prev, rule) {
        var parsedRule = parseRule(rule);
        if (!parsedRule.name) {
            return prev;
        }
        prev[parsedRule.name] = parsedRule.params;
        return prev;
    }, {});
};
var warn = function (message) {
    console.warn(("[vee-validate] " + message));
};
var createError = function (message) { return new Error(("[vee-validate] " + message)); };
var isObject = function (obj) { return obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj); };
var isCallable = function (func) { return typeof func === 'function'; };
var hasClass = function (el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    return !(!el.className.match(new RegExp(("(\\s|^)" + className + "(\\s|$)"))));
};
var addClass = function (el, className) {
    if (el.classList) {
        el.classList.add(className);
        return;
    }
    if (!hasClass(el, className)) {
        el.className += " " + className;
    }
};
var removeClass = function (el, className) {
    if (el.classList) {
        el.classList.remove(className);
        return;
    }
    if (hasClass(el, className)) {
        var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
        el.className = el.className.replace(reg, ' ');
    }
};
var toggleClass = function (el, className, status) {
    if (!el || !className) 
        { return; }
    if (Array.isArray(className)) {
        className.forEach(function (item) { return toggleClass(el, item, status); });
        return;
    }
    if (status) {
        return addClass(el, className);
    }
    removeClass(el, className);
};
var toArray = function (arrayLike) {
    if (isCallable(Array.from)) {
        return Array.from(arrayLike);
    }
    var array = [];
    var length = arrayLike.length;
    for (var i = 0;i < length; i++) {
        array.push(arrayLike[i]);
    }
    return array;
};
var assign = function (target) {
    var others = [], len = arguments.length - 1;
    while ( len-- > 0 ) others[ len ] = arguments[ len + 1 ];

    if (isCallable(Object.assign)) {
        return Object.assign.apply(Object, [ target ].concat( others ));
    }
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    others.forEach(function (arg) {
        if (arg != null) {
            Object.keys(arg).forEach(function (key) {
                to[key] = arg[key];
            });
        }
    });
    return to;
};
var id = 0;
var idTemplate = '{id}';
var uniqId = function () {
    if (id >= 9999) {
        id = 0;
        idTemplate = idTemplate.replace('{id}', '_{id}');
    }
    id++;
    var newId = idTemplate.replace('{id}', String(id));
    return newId;
};
var find = function (arrayLike, predicate) {
    var array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
    for (var i = 0;i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return undefined;
};
var isBuiltInComponent = function (vnode) {
    if (!vnode) {
        return false;
    }
    var tag = vnode.componentOptions.tag;
    return /keep-alive|transition|transition-group/.test(tag);
};
var makeEventsArray = function (events) { return typeof events === 'string' && events.length ? events.split('|') : []; };
var makeDelayObject = function (events, delay, delayConfig) {
    if (typeof delay === 'number') {
        return events.reduce(function (prev, e) {
            prev[e] = delay;
            return prev;
        }, {});
    }
    return events.reduce(function (prev, e) {
        if (typeof delay === 'object' && e in delay) {
            prev[e] = delay[e];
            return prev;
        }
        if (typeof delayConfig === 'number') {
            prev[e] = delayConfig;
            return prev;
        }
        prev[e] = delayConfig && delayConfig[e] || 0;
        return prev;
    }, {});
};
var deepParseInt = function (input) {
    if (typeof input === 'number') 
        { return input; }
    if (typeof input === 'string') 
        { return parseInt(input); }
    var map = {};
    for (var element in input) {
        map[element] = parseInt(input[element]);
    }
    return map;
};
var merge = function (target, source) {
    if (!(isObject(target) && isObject(source))) {
        return target;
    }
    Object.keys(source).forEach(function (key) {
        var obj, obj$1;

        if (isObject(source[key])) {
            if (!target[key]) {
                assign(target, ( obj = {}, obj[key] = {}, obj ));
            }
            merge(target[key], source[key]);
            return;
        }
        assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
    });
    return target;
};

var ErrorBag = function ErrorBag() {
    this.items = [];
};
ErrorBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
        var this$1 = this;

    var index = 0;
    return {
        next: function () { return ({
            value: this$1.items[index++],
            done: index > this$1.items.length
        }); }
    };
};
ErrorBag.prototype.add = function add (error) {
        var ref;

    if (arguments.length > 1) {
        error = {
            field: arguments[0],
            msg: arguments[1],
            rule: arguments[2],
            scope: !isNullOrUndefined(arguments[3]) ? arguments[3] : null,
            regenerate: null
        };
    }
    (ref = this.items).push.apply(ref, this._normalizeError(error));
};
ErrorBag.prototype._normalizeError = function _normalizeError (error) {
    if (Array.isArray(error)) {
        return error.map(function (e) {
            e.scope = !isNullOrUndefined(e.scope) ? e.scope : null;
            return e;
        });
    }
    error.scope = !isNullOrUndefined(error.scope) ? error.scope : null;
    return [error];
};
ErrorBag.prototype.regenerate = function regenerate () {
    this.items.forEach(function (i) {
        i.msg = isCallable(i.regenerate) ? i.regenerate() : i.msg;
    });
};
ErrorBag.prototype.update = function update (id, error) {
    var item = find(this.items, function (i) { return i.id === id; });
    if (!item) {
        return;
    }
    var idx = this.items.indexOf(item);
    this.items.splice(idx, 1);
    item.scope = error.scope;
    this.items.push(item);
};
ErrorBag.prototype.all = function all (scope) {
    if (isNullOrUndefined(scope)) {
        return this.items.map(function (e) { return e.msg; });
    }
    return this.items.filter(function (e) { return e.scope === scope; }).map(function (e) { return e.msg; });
};
ErrorBag.prototype.any = function any (scope) {
    if (isNullOrUndefined(scope)) {
        return !(!this.items.length);
    }
    return !(!this.items.filter(function (e) { return e.scope === scope; }).length);
};
ErrorBag.prototype.clear = function clear (scope) {
        var this$1 = this;

    if (isNullOrUndefined(scope)) {
        scope = null;
    }
    for (var i = 0;i < this.items.length; ++i) {
        if (this$1.items[i].scope === scope) {
            this$1.items.splice(i, 1);
            --i;
        }
    }
};
ErrorBag.prototype.collect = function collect (field, scope, map) {
        if ( map === void 0 ) map = true;

    if (!field) {
        var collection = {};
        this.items.forEach(function (e) {
            if (!collection[e.field]) {
                collection[e.field] = [];
            }
            collection[e.field].push(map ? e.msg : e);
        });
        return collection;
    }
    field = !isNullOrUndefined(field) ? String(field) : field;
    if (isNullOrUndefined(scope)) {
        return this.items.filter(function (e) { return e.field === field; }).map(function (e) { return map ? e.msg : e; });
    }
    return this.items.filter(function (e) { return e.field === field && e.scope === scope; }).map(function (e) { return map ? e.msg : e; });
};
ErrorBag.prototype.count = function count () {
    return this.items.length;
};
ErrorBag.prototype.firstById = function firstById (id) {
    var error = find(this.items, function (i) { return i.id === id; });
    return error ? error.msg : null;
};
ErrorBag.prototype.first = function first (field, scope) {
        var this$1 = this;
        if ( scope === void 0 ) scope = null;

    if (isNullOrUndefined(field)) {
        return null;
    }
    field = String(field);
    var selector = this._selector(field);
    var scoped = this._scope(field);
    if (scoped) {
        var result = this.first(scoped.name, scoped.scope);
        if (result) {
            return result;
        }
    }
    if (selector) {
        return this.firstByRule(selector.name, selector.rule, scope);
    }
    for (var i = 0;i < this.items.length; ++i) {
        if (this$1.items[i].field === field && this$1.items[i].scope === scope) {
            return this$1.items[i].msg;
        }
    }
    return null;
};
ErrorBag.prototype.firstRule = function firstRule (field, scope) {
    var errors = this.collect(field, scope, false);
    return errors.length && errors[0].rule || null;
};
ErrorBag.prototype.has = function has (field, scope) {
        if ( scope === void 0 ) scope = null;

    return !(!this.first(field, scope));
};
ErrorBag.prototype.firstByRule = function firstByRule (name, rule, scope) {
        if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule === rule; })[0];
    return error && error.msg || null;
};
ErrorBag.prototype.firstNot = function firstNot (name, rule, scope) {
        if ( rule === void 0 ) rule = 'required';
        if ( scope === void 0 ) scope = null;

    var error = this.collect(name, scope, false).filter(function (e) { return e.rule !== rule; })[0];
    return error && error.msg || null;
};
ErrorBag.prototype.removeById = function removeById (id) {
        var this$1 = this;

    if (Array.isArray(id)) {
        this.items = this.items.filter(function (i) { return id.indexOf(i.id) === -1; });
        return;
    }
    for (var i = 0;i < this.items.length; ++i) {
        if (this$1.items[i].id === id) {
            this$1.items.splice(i, 1);
            --i;
        }
    }
};
ErrorBag.prototype.remove = function remove (field, scope) {
        var this$1 = this;

    field = !isNullOrUndefined(field) ? String(field) : field;
    var removeCondition = function (e) {
        if (!isNullOrUndefined(scope)) {
            return e.field === field && e.scope === scope;
        }
        return e.field === field && e.scope === null;
    };
    for (var i = 0;i < this.items.length; ++i) {
        if (removeCondition(this$1.items[i])) {
            this$1.items.splice(i, 1);
            --i;
        }
    }
};
ErrorBag.prototype._selector = function _selector (field) {
    if (field.indexOf(':') > -1) {
        var ref = field.split(':');
            var name = ref[0];
            var rule = ref[1];
        return {
            name: name,
            rule: rule
        };
    }
    return null;
};
ErrorBag.prototype._scope = function _scope (field) {
    if (field.indexOf('.') > -1) {
        var ref = field.split('.');
            var scope = ref[0];
            var name = ref.slice(1);
        return {
            name: name.join('.'),
            scope: scope
        };
    }
    return null;
};

var LOCALE = 'en';
var Dictionary = function Dictionary(dictionary) {
    if ( dictionary === void 0 ) dictionary = {};

    this.container = {};
    this.merge(dictionary);
};

var prototypeAccessors = { locale: { configurable: true } };
prototypeAccessors.locale.get = function () {
    return LOCALE;
};
prototypeAccessors.locale.set = function (value) {
    LOCALE = value || 'en';
};
Dictionary.prototype.hasLocale = function hasLocale (locale) {
    return !(!this.container[locale]);
};
Dictionary.prototype.setDateFormat = function setDateFormat (locale, format) {
    if (!this.container[locale]) {
        this.container[locale] = {};
    }
    this.container[locale].dateFormat = format;
};
Dictionary.prototype.getDateFormat = function getDateFormat (locale) {
    if (!this.container[locale] || !this.container[locale].dateFormat) {
        return null;
    }
    return this.container[locale].dateFormat;
};
Dictionary.prototype.getMessage = function getMessage (locale, key, data) {
    var message = null;
    if (!this.hasMessage(locale, key)) {
        message = this._getDefaultMessage(locale);
    } else {
        message = this.container[locale].messages[key];
    }
    return isCallable(message) ? message.apply(void 0, data) : message;
};
Dictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key, data) {
    if (!this.hasLocale(locale)) {
        return this.getMessage(locale, key, data);
    }
    var dict = this.container[locale].custom && this.container[locale].custom[field];
    if (!dict || !dict[key]) {
        return this.getMessage(locale, key, data);
    }
    var message = dict[key];
    return isCallable(message) ? message.apply(void 0, data) : message;
};
Dictionary.prototype._getDefaultMessage = function _getDefaultMessage (locale) {
    if (this.hasMessage(locale, '_default')) {
        return this.container[locale].messages._default;
    }
    return this.container.en.messages._default;
};
Dictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
        if ( fallback === void 0 ) fallback = '';

    if (!this.hasAttribute(locale, key)) {
        return fallback;
    }
    return this.container[locale].attributes[key];
};
Dictionary.prototype.hasMessage = function hasMessage (locale, key) {
    return !(!(this.hasLocale(locale) && this.container[locale].messages && this.container[locale].messages[key]));
};
Dictionary.prototype.hasAttribute = function hasAttribute (locale, key) {
    return !(!(this.hasLocale(locale) && this.container[locale].attributes && this.container[locale].attributes[key]));
};
Dictionary.prototype.merge = function merge$1 (dictionary) {
    merge(this.container, dictionary);
};
Dictionary.prototype.setMessage = function setMessage (locale, key, message) {
    if (!this.hasLocale(locale)) {
        this.container[locale] = {
            messages: {},
            attributes: {}
        };
    }
    this.container[locale].messages[key] = message;
};
Dictionary.prototype.setAttribute = function setAttribute (locale, key, attribute) {
    if (!this.hasLocale(locale)) {
        this.container[locale] = {
            messages: {},
            attributes: {}
        };
    }
    this.container[locale].attributes[key] = attribute;
};

Object.defineProperties( Dictionary.prototype, prototypeAccessors );

var normalizeValue = function (value) {
    if (isObject(value)) {
        return Object.keys(value).reduce(function (prev, key) {
            prev[key] = normalizeValue(value[key]);
            return prev;
        }, {});
    }
    if (isCallable(value)) {
        return value('{0}', ['{1}','{2}','{3}']);
    }
    return value;
};
var normalizeFormat = function (locale) {
    var messages = normalizeValue(locale.messages);
    var custom = normalizeValue(locale.custom);
    return {
        messages: messages,
        custom: custom,
        attributes: locale.attributes,
        dateFormat: locale.dateFormat
    };
};
var I18nDictionary = function I18nDictionary(i18n, rootKey) {
    this.i18n = i18n;
    this.rootKey = rootKey;
};

var prototypeAccessors$1 = { locale: { configurable: true } };
prototypeAccessors$1.locale.get = function () {
    return this.i18n.locale;
};
prototypeAccessors$1.locale.set = function (value) {
    warn('Cannot set locale from the validator when using vue-i18n, use i18n.locale setter instead');
};
I18nDictionary.prototype.getDateFormat = function getDateFormat (locale) {
    return this.i18n.getDateTimeFormat(locale || this.locale);
};
I18nDictionary.prototype.setDateFormat = function setDateFormat (locale, value) {
    this.i18n.setDateTimeFormat(locale || this.locale, value);
};
I18nDictionary.prototype.getMessage = function getMessage (locale, key, data) {
    var path = (this.rootKey) + ".messages." + key;
    if (!this.i18n.te(path)) {
        return this.i18n.t(((this.rootKey) + ".messages._default"), locale, data);
    }
    return this.i18n.t(path, locale, data);
};
I18nDictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
        if ( fallback === void 0 ) fallback = '';

    var path = (this.rootKey) + ".attributes." + key;
    if (!this.i18n.te(path)) {
        return fallback;
    }
    return this.i18n.t(path, locale);
};
I18nDictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key, data) {
    var path = (this.rootKey) + ".custom." + field + "." + key;
    if (this.i18n.te(path)) {
        return this.i18n.t(path);
    }
    return this.getMessage(locale, key, data);
};
I18nDictionary.prototype.merge = function merge$1 (dictionary) {
        var this$1 = this;

    Object.keys(dictionary).forEach(function (localeKey) {
            var obj;

        var clone = merge({}, getPath((localeKey + "." + (this$1.rootKey)), this$1.i18n.messages, {}));
        var locale = merge(clone, normalizeFormat(dictionary[localeKey]));
        this$1.i18n.mergeLocaleMessage(localeKey, ( obj = {}, obj[this$1.rootKey] = locale, obj ));
        if (locale.dateFormat) {
            this$1.i18n.setDateTimeFormat(localeKey, locale.dateFormat);
        }
    });
};
I18nDictionary.prototype.setMessage = function setMessage (locale, key, value) {
        var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
            messages: ( obj = {}, obj[key] = value, obj )
        }, obj$1 ));
};
I18nDictionary.prototype.setAttribute = function setAttribute (locale, key, value) {
        var obj, obj$1;

    this.merge(( obj$1 = {}, obj$1[locale] = {
            attributes: ( obj = {}, obj[key] = value, obj )
        }, obj$1 ));
};

Object.defineProperties( I18nDictionary.prototype, prototypeAccessors$1 );

var defaultConfig = {
    locale: 'en',
    delay: 0,
    errorBagName: 'errors',
    dictionary: null,
    strict: true,
    fieldsBagName: 'fields',
    classes: false,
    classNames: null,
    events: 'input|blur',
    inject: true,
    fastExit: true,
    aria: true,
    validity: false,
    i18n: null,
    i18nRootKey: 'validation'
};
var currentConfig = assign({}, defaultConfig);
var dependencies = {
    dictionary: new Dictionary({
        en: {
            messages: {},
            attributes: {},
            custom: {}
        }
    })
};
var Config = function Config () {};

var staticAccessors = { default: { configurable: true },current: { configurable: true } };

staticAccessors.default.get = function () {
    return defaultConfig;
};
staticAccessors.current.get = function () {
    return currentConfig;
};
Config.dependency = function dependency (key) {
    return dependencies[key];
};
Config.merge = function merge$$1 (config) {
    currentConfig = assign({}, currentConfig, config);
    if (currentConfig.i18n) {
        Config.register('dictionary', new I18nDictionary(currentConfig.i18n, currentConfig.i18nRootKey));
    }
};
Config.register = function register (key, value) {
    dependencies[key] = value;
};
Config.resolve = function resolve (context) {
    var selfConfig = getPath('$options.$_veeValidate', context, {});
    return assign({}, Config.current, selfConfig);
};

Object.defineProperties( Config, staticAccessors );

var Generator = function Generator () {};

Generator.generate = function generate (el, binding, vnode) {
    var model = Generator.resolveModel(binding, vnode);
    var options = Config.resolve(vnode.context);
    return {
        name: Generator.resolveName(el, vnode),
        el: el,
        listen: !binding.modifiers.disable,
        scope: Generator.resolveScope(el, binding, vnode),
        vm: Generator.makeVM(vnode.context),
        expression: binding.value,
        component: vnode.componentInstance,
        classes: options.classes,
        classNames: options.classNames,
        getter: Generator.resolveGetter(el, vnode, model),
        events: Generator.resolveEvents(el, vnode) || options.events,
        model: model,
        delay: Generator.resolveDelay(el, vnode, options),
        rules: Generator.resolveRules(el, binding),
        initial: !(!binding.modifiers.initial),
        validity: options.validity,
        aria: options.aria,
        initialValue: Generator.resolveInitialValue(vnode)
    };
};
Generator.getCtorConfig = function getCtorConfig (vnode) {
    if (!vnode.componentInstance) 
        { return null; }
    var config = getPath('componentInstance.$options.$_veeValidate', vnode);
    return config;
};
Generator.resolveRules = function resolveRules (el, binding) {
    if (!binding.value && (!binding || !binding.expression)) {
        return getDataAttribute(el, 'rules');
    }
    if (binding.value && ~['string','object'].indexOf(typeof binding.value.rules)) {
        return binding.value.rules;
    }
    return binding.value;
};
Generator.resolveInitialValue = function resolveInitialValue (vnode) {
    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });
    return model && model.value;
};
Generator.makeVM = function makeVM (vm) {
    return {
        get $el() {
            return vm.$el;
        },
        get $refs() {
            return vm.$refs;
        },
        $watch: vm.$watch ? vm.$watch.bind(vm) : function () {},
        $validator: vm.$validator ? {
            errors: vm.$validator.errors,
            validate: vm.$validator.validate.bind(vm.$validator),
            update: vm.$validator.update.bind(vm.$validator)
        } : null
    };
};
Generator.resolveDelay = function resolveDelay (el, vnode, options) {
    var delay = getDataAttribute(el, 'delay');
    var globalDelay = options && 'delay' in options ? options.delay : 0;
    if (!delay && vnode.componentInstance && vnode.componentInstance.$attrs) {
        delay = vnode.componentInstance.$attrs['data-vv-delay'];
    }
    if (!isObject(globalDelay)) {
        return deepParseInt(delay || globalDelay);
    }
    if (!isNullOrUndefined(delay)) {
        globalDelay.input = delay;
    }
    return deepParseInt(globalDelay);
};
Generator.resolveEvents = function resolveEvents (el, vnode) {
    var events = getDataAttribute(el, 'validate-on');
    if (!events && vnode.componentInstance && vnode.componentInstance.$attrs) {
        events = vnode.componentInstance.$attrs['data-vv-validate-on'];
    }
    if (!events && vnode.componentInstance) {
        var config = Generator.getCtorConfig(vnode);
        events = config && config.events;
    }
    return events;
};
Generator.resolveScope = function resolveScope (el, binding, vnode) {
        if ( vnode === void 0 ) vnode = {};

    var scope = null;
    if (vnode.componentInstance && isNullOrUndefined(scope)) {
        scope = vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-scope'];
    }
    return !isNullOrUndefined(scope) ? scope : getScope(el);
};
Generator.resolveModel = function resolveModel (binding, vnode) {
    if (binding.arg) {
        return {
            expression: binding.arg
        };
    }
    var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });
    if (!model) {
        return null;
    }
    var watchable = !/[^\w.$]/.test(model.expression) && hasPath(model.expression, vnode.context);
    var lazy = !(!(model.modifiers && model.modifiers.lazy));
    if (!watchable) {
        return {
            expression: null,
            lazy: lazy
        };
    }
    return {
        expression: model.expression,
        lazy: lazy
    };
};
Generator.resolveName = function resolveName (el, vnode) {
    var name = getDataAttribute(el, 'name');
    if (!name && !vnode.componentInstance) {
        return el.name;
    }
    if (!name && vnode.componentInstance && vnode.componentInstance.$attrs) {
        name = vnode.componentInstance.$attrs['data-vv-name'] || vnode.componentInstance.$attrs['name'];
    }
    if (!name && vnode.componentInstance) {
        var config = Generator.getCtorConfig(vnode);
        if (config && isCallable(config.name)) {
            var boundGetter = config.name.bind(vnode.componentInstance);
            return boundGetter();
        }
        return vnode.componentInstance.name;
    }
    return name;
};
Generator.resolveGetter = function resolveGetter (el, vnode, model) {
    if (model && model.expression) {
        return function () { return getPath(model.expression, vnode.context); };
    }
    if (vnode.componentInstance) {
        var path = getDataAttribute(el, 'value-path') || vnode.componentInstance.$attrs && vnode.componentInstance.$attrs['data-vv-value-path'];
        if (path) {
            return function () { return getPath(path, vnode.componentInstance); };
        }
        var config = Generator.getCtorConfig(vnode);
        if (config && isCallable(config.value)) {
            var boundGetter = config.value.bind(vnode.componentInstance);
            return function () { return boundGetter(); };
        }
        return function () { return vnode.componentInstance.value; };
    }
    switch (el.type) {
        case 'checkbox':
            return function () {
                var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));
                els = toArray(els).filter(function (el) { return el.checked; });
                if (!els.length) 
                    { return undefined; }
                return els.map(function (checkbox) { return checkbox.value; });
            };
        case 'radio':
            return function () {
                var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));
                var elm = find(els, function (el) { return el.checked; });
                return elm && elm.value;
            };
        case 'file':
            return function (context) { return toArray(el.files); };
        case 'select-multiple':
            return function () { return toArray(el.options).filter(function (opt) { return opt.selected; }).map(function (opt) { return opt.value; }); };
        default:
            return function () { return el && el.value; };
    }
};

var DEFAULT_OPTIONS = {
    targetOf: null,
    initial: false,
    scope: null,
    listen: true,
    name: null,
    rules: {},
    vm: null,
    classes: false,
    validity: true,
    aria: true,
    events: 'input|blur',
    delay: 0,
    classNames: {
        touched: 'touched',
        untouched: 'untouched',
        valid: 'valid',
        invalid: 'invalid',
        pristine: 'pristine',
        dirty: 'dirty'
    }
};
var Field = function Field(options) {
    if ( options === void 0 ) options = {};

    this.id = uniqId();
    this.el = options.el;
    this.updated = false;
    this.dependencies = [];
    this.watchers = [];
    this.events = [];
    this.delay = 0;
    this.rules = {};
    this._cacheId(options);
    this.classNames = assign({}, DEFAULT_OPTIONS.classNames);
    options = assign({}, DEFAULT_OPTIONS, options);
    this._delay = !isNullOrUndefined(options.delay) ? options.delay : 0;
    this.validity = options.validity;
    this.aria = options.aria;
    this.flags = createFlags();
    this.vm = options.vm;
    this.component = options.component;
    this.ctorConfig = this.component ? getPath('$options.$_veeValidate', this.component) : undefined;
    this.update(options);
    this.initialValue = this.value;
    this.updated = false;
};

var prototypeAccessors$2 = { validator: { configurable: true },isRequired: { configurable: true },isDisabled: { configurable: true },alias: { configurable: true },value: { configurable: true },rejectsFalse: { configurable: true } };
prototypeAccessors$2.validator.get = function () {
    if (!this.vm || !this.vm.$validator) {
        warn('No validator instance detected.');
        return {
            validate: function () {}
        };
    }
    return this.vm.$validator;
};
prototypeAccessors$2.isRequired.get = function () {
    return !(!this.rules.required);
};
prototypeAccessors$2.isDisabled.get = function () {
    return !(!(this.component && this.component.disabled)) || !(!(this.el && this.el.disabled));
};
prototypeAccessors$2.alias.get = function () {
    if (this._alias) {
        return this._alias;
    }
    var alias = null;
    if (this.el) {
        alias = getDataAttribute(this.el, 'as');
    }
    if (!alias && this.component) {
        return this.component.$attrs && this.component.$attrs['data-vv-as'];
    }
    return alias;
};
prototypeAccessors$2.value.get = function () {
    if (!isCallable(this.getter)) {
        return undefined;
    }
    return this.getter();
};
prototypeAccessors$2.rejectsFalse.get = function () {
    if (this.component && this.ctorConfig) {
        return !(!this.ctorConfig.rejectsFalse);
    }
    if (!this.el) {
        return false;
    }
    return this.el.type === 'checkbox';
};
Field.prototype.matches = function matches (options) {
    if (!options) {
        return true;
    }
    if (options.id) {
        return this.id === options.id;
    }
    if (options.name === undefined && options.scope === undefined) {
        return true;
    }
    if (options.scope === undefined) {
        return this.name === options.name;
    }
    if (options.name === undefined) {
        return this.scope === options.scope;
    }
    return options.name === this.name && options.scope === this.scope;
};
Field.prototype._cacheId = function _cacheId (options) {
    if (this.el && !options.targetOf) {
        this.el._veeValidateId = this.id;
    }
};
Field.prototype.update = function update (options) {
    this.targetOf = options.targetOf || null;
    this.initial = options.initial || this.initial || false;
    if (!isNullOrUndefined(options.scope) && options.scope !== this.scope && isCallable(this.validator.update)) {
        this.validator.update(this.id, {
            scope: options.scope
        });
    }
    this.scope = !isNullOrUndefined(options.scope) ? options.scope : !isNullOrUndefined(this.scope) ? this.scope : null;
    this.name = (!isNullOrUndefined(options.name) ? String(options.name) : options.name) || this.name || null;
    this.rules = options.rules !== undefined ? normalizeRules(options.rules) : this.rules;
    this.model = options.model || this.model;
    this.listen = options.listen !== undefined ? options.listen : this.listen;
    this.classes = (options.classes || this.classes || false) && !this.component;
    this.classNames = isObject(options.classNames) ? merge(this.classNames, options.classNames) : this.classNames;
    this.getter = isCallable(options.getter) ? options.getter : this.getter;
    this._alias = options.alias || this._alias;
    this.events = options.events ? makeEventsArray(options.events) : this.events;
    this.delay = makeDelayObject(this.events, options.delay || this.delay, this._delay);
    this.updateDependencies();
    this.addActionListeners();
    if (!this.name && !this.targetOf) {
        warn('A field is missing a "name" or "data-vv-name" attribute');
    }
    if (options.rules !== undefined) {
        this.flags.required = this.isRequired;
    }
    if (this.flags.validated && options.rules !== undefined && this.updated) {
        this.validator.validate(("#" + (this.id)));
    }
    this.updated = true;
    this.addValueListeners();
    if (!this.el) {
        return;
    }
    this.updateClasses();
    this.updateAriaAttrs();
};
Field.prototype.reset = function reset () {
        var this$1 = this;

    if (this._cancellationToken) {
        this._cancellationToken.cancelled = true;
        delete this._cancellationToken;
    }
    var defaults = createFlags();
    Object.keys(this.flags).filter(function (flag) { return flag !== 'required'; }).forEach(function (flag) {
        this$1.flags[flag] = defaults[flag];
    });
    this.addActionListeners();
    this.updateClasses();
    this.updateAriaAttrs();
    this.updateCustomValidity();
};
Field.prototype.setFlags = function setFlags (flags) {
        var this$1 = this;

    var negated = {
        pristine: 'dirty',
        dirty: 'pristine',
        valid: 'invalid',
        invalid: 'valid',
        touched: 'untouched',
        untouched: 'touched'
    };
    Object.keys(flags).forEach(function (flag) {
        this$1.flags[flag] = flags[flag];
        if (negated[flag] && flags[negated[flag]] === undefined) {
            this$1.flags[negated[flag]] = !flags[flag];
        }
    });
    if (flags.untouched !== undefined || flags.touched !== undefined || flags.dirty !== undefined || flags.pristine !== undefined) {
        this.addActionListeners();
    }
    this.updateClasses();
    this.updateAriaAttrs();
    this.updateCustomValidity();
};
Field.prototype.updateDependencies = function updateDependencies () {
        var this$1 = this;

    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];
    var fields = Object.keys(this.rules).reduce(function (prev, r) {
        if (Validator.isTargetRule(r)) {
            var selector = this$1.rules[r][0];
            if (r === 'confirmed' && !selector) {
                selector = (this$1.name) + "_confirmation";
            }
            prev.push({
                selector: selector,
                name: r
            });
        }
        return prev;
    }, []);
    if (!fields.length || !this.vm || !this.vm.$el) 
        { return; }
    fields.forEach(function (ref) {
            var selector = ref.selector;
            var name = ref.name;

        var el = null;
        if (selector[0] === '$') {
            var ref$1 = this$1.vm.$refs[selector.slice(1)];
            el = Array.isArray(ref$1) ? ref$1[0] : ref$1;
        } else {
            try {
                el = this$1.vm.$el.querySelector(selector);
            } catch (err) {
                el = null;
            }
        }
        if (!el) {
            try {
                el = this$1.vm.$el.querySelector(("input[name=\"" + selector + "\"]"));
            } catch (err) {
                el = null;
            }
        }
        if (!el) {
            return;
        }
        var options = {
            vm: this$1.vm,
            classes: this$1.classes,
            classNames: this$1.classNames,
            delay: this$1.delay,
            scope: this$1.scope,
            events: this$1.events.join('|'),
            initial: this$1.initial,
            targetOf: this$1.id
        };
        if (isCallable(el.$watch)) {
            options.component = el;
            options.el = el.$el;
            options.getter = Generator.resolveGetter(el.$el, {
                child: el
            });
        } else {
            options.el = el;
            options.getter = Generator.resolveGetter(el, {});
        }
        this$1.dependencies.push({
            name: name,
            field: new Field(options)
        });
    });
};
Field.prototype.unwatch = function unwatch (tag) {
        if ( tag === void 0 ) tag = null;

    if (!tag) {
        this.watchers.forEach(function (w) { return w.unwatch(); });
        this.watchers = [];
        return;
    }
    this.watchers.filter(function (w) { return tag.test(w.tag); }).forEach(function (w) { return w.unwatch(); });
    this.watchers = this.watchers.filter(function (w) { return !tag.test(w.tag); });
};
Field.prototype.updateClasses = function updateClasses () {
        var this$1 = this;

    if (!this.classes || this.isDisabled) 
        { return; }
    var applyClasses = function (el) {
        toggleClass(el, this$1.classNames.dirty, this$1.flags.dirty);
        toggleClass(el, this$1.classNames.pristine, this$1.flags.pristine);
        toggleClass(el, this$1.classNames.touched, this$1.flags.touched);
        toggleClass(el, this$1.classNames.untouched, this$1.flags.untouched);
        if (!isNullOrUndefined(this$1.flags.valid) && this$1.flags.validated) {
            toggleClass(el, this$1.classNames.valid, this$1.flags.valid);
        }
        if (!isNullOrUndefined(this$1.flags.invalid) && this$1.flags.validated) {
            toggleClass(el, this$1.classNames.invalid, this$1.flags.invalid);
        }
    };
    if (!isCheckboxOrRadioInput(this.el)) {
        applyClasses(this.el);
        return;
    }
    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyClasses);
};
Field.prototype.addActionListeners = function addActionListeners () {
        var this$1 = this;

    this.unwatch(/class/);
    if (!this.el) 
        { return; }
    var onBlur = function () {
        this$1.flags.touched = true;
        this$1.flags.untouched = false;
        if (this$1.classes) {
            toggleClass(this$1.el, this$1.classNames.touched, true);
            toggleClass(this$1.el, this$1.classNames.untouched, false);
        }
        this$1.unwatch(/^class_blur$/);
    };
    var inputEvent = isTextInput(this.el) ? 'input' : 'change';
    var onInput = function () {
        this$1.flags.dirty = true;
        this$1.flags.pristine = false;
        if (this$1.classes) {
            toggleClass(this$1.el, this$1.classNames.pristine, false);
            toggleClass(this$1.el, this$1.classNames.dirty, true);
        }
        this$1.unwatch(/^class_input$/);
    };
    if (this.component && isCallable(this.component.$once)) {
        this.component.$once('input', onInput);
        this.component.$once('blur', onBlur);
        this.watchers.push({
            tag: 'class_input',
            unwatch: function () {
                this$1.component.$off('input', onInput);
            }
        });
        this.watchers.push({
            tag: 'class_blur',
            unwatch: function () {
                this$1.component.$off('blur', onBlur);
            }
        });
        return;
    }
    if (!this.el) 
        { return; }
    addEventListener(this.el, inputEvent, onInput);
    var blurEvent = isCheckboxOrRadioInput(this.el) ? 'change' : 'blur';
    addEventListener(this.el, blurEvent, onBlur);
    this.watchers.push({
        tag: 'class_input',
        unwatch: function () {
            this$1.el.removeEventListener(inputEvent, onInput);
        }
    });
    this.watchers.push({
        tag: 'class_blur',
        unwatch: function () {
            this$1.el.removeEventListener(blurEvent, onBlur);
        }
    });
};
Field.prototype.checkValueChanged = function checkValueChanged () {
    if (this.initialValue === null && this.value === '' && isTextInput(this.el)) {
        return false;
    }
    return this.value !== this.initialValue;
};
Field.prototype.addValueListeners = function addValueListeners () {
        var this$1 = this;

    this.unwatch(/^input_.+/);
    if (!this.listen || !this.el) 
        { return; }
    var token = {
        cancelled: false
    };
    var fn = this.targetOf ? function () {
        this$1.flags.changed = this$1.checkValueChanged();
        this$1.validator.validate(("#" + (this$1.targetOf)));
    } : function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

        if (args.length === 0 || isCallable(Event) && args[0] instanceof Event || args[0] && args[0].srcElement) {
            args[0] = this$1.value;
        }
        this$1.flags.changed = this$1.checkValueChanged();
        this$1.validator.validate(("#" + (this$1.id)), args[0]);
    };
    var inputEvent = this.component || isTextInput(this.el) ? 'input' : 'change';
    inputEvent = this.model && this.model.lazy ? 'change' : inputEvent;
    var events = !this.events.length || this.component || isTextInput(this.el) ? this.events : ['change'];
    if (this.model && this.model.expression && events.indexOf(inputEvent) !== -1) {
        var debouncedFn = debounce(fn, this.delay[inputEvent], false, token);
        var unwatch = this.vm.$watch(this.model.expression, function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

            this$1.flags.pending = true;
            this$1._cancellationToken = token;
            debouncedFn.apply(void 0, args);
        });
        this.watchers.push({
            tag: 'input_model',
            unwatch: unwatch
        });
        events = events.filter(function (e) { return e !== inputEvent; });
    }
    events.forEach(function (e) {
        var debouncedFn = debounce(fn, this$1.delay[e], false, token);
        var validate = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

            this$1.flags.pending = true;
            this$1._cancellationToken = token;
            debouncedFn.apply(void 0, args);
        };
        this$1._addComponentEventListener(e, validate);
        this$1._addHTMLEventListener(e, validate);
    });
};
Field.prototype._addComponentEventListener = function _addComponentEventListener (evt, validate) {
        var this$1 = this;

    if (!this.component) 
        { return; }
    this.component.$on(evt, validate);
    this.watchers.push({
        tag: 'input_vue',
        unwatch: function () {
            this$1.component.$off(evt, validate);
        }
    });
};
Field.prototype._addHTMLEventListener = function _addHTMLEventListener (evt, validate) {
        var this$1 = this;

    if (!this.el || this.component) 
        { return; }
    var addListener = function (el) {
        addEventListener(el, evt, validate);
        this$1.watchers.push({
            tag: 'input_native',
            unwatch: function () {
                el.removeEventListener(evt, validate);
            }
        });
    };
    addListener(this.el);
    if (!isCheckboxOrRadioInput(this.el)) {
        return;
    }
    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(function (el) {
        if (el._veeValidateId && el !== this$1.el) {
            return;
        }
        addListener(el);
    });
};
Field.prototype.updateAriaAttrs = function updateAriaAttrs () {
        var this$1 = this;

    if (!this.aria || !this.el || !isCallable(this.el.setAttribute)) 
        { return; }
    var applyAriaAttrs = function (el) {
        el.setAttribute('aria-required', this$1.isRequired ? 'true' : 'false');
        el.setAttribute('aria-invalid', this$1.flags.invalid ? 'true' : 'false');
    };
    if (!isCheckboxOrRadioInput(this.el)) {
        applyAriaAttrs(this.el);
        return;
    }
    var els = document.querySelectorAll(("input[name=\"" + (this.el.name) + "\"]"));
    toArray(els).forEach(applyAriaAttrs);
};
Field.prototype.updateCustomValidity = function updateCustomValidity () {
    if (!this.validity || !this.el || !isCallable(this.el.setCustomValidity) || !this.validator.errors) 
        { return; }
    this.el.setCustomValidity(this.flags.valid ? '' : this.validator.errors.firstById(this.id) || '');
};
Field.prototype.destroy = function destroy () {
    this.unwatch();
    this.dependencies.forEach(function (d) { return d.field.destroy(); });
    this.dependencies = [];
};

Object.defineProperties( Field.prototype, prototypeAccessors$2 );

var FieldBag = function FieldBag() {
    this.items = [];
};

var prototypeAccessors$3 = { length: { configurable: true } };
FieldBag.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
        var this$1 = this;

    var index = 0;
    return {
        next: function () { return ({
            value: this$1.items[index++],
            done: index > this$1.items.length
        }); }
    };
};
prototypeAccessors$3.length.get = function () {
    return this.items.length;
};
FieldBag.prototype.find = function find$1 (matcher) {
    return find(this.items, function (item) { return item.matches(matcher); });
};
FieldBag.prototype.filter = function filter (matcher) {
    if (Array.isArray(matcher)) {
        return this.items.filter(function (item) { return matcher.some(function (m) { return item.matches(m); }); });
    }
    return this.items.filter(function (item) { return item.matches(matcher); });
};
FieldBag.prototype.map = function map (mapper) {
    return this.items.map(mapper);
};
FieldBag.prototype.remove = function remove (matcher) {
    var item = null;
    if (matcher instanceof Field) {
        item = matcher;
    } else {
        item = this.find(matcher);
    }
    if (!item) 
        { return null; }
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    return item;
};
FieldBag.prototype.push = function push (item) {
    if (!(item instanceof Field)) {
        throw createError('FieldBag only accepts instances of Field that has an id defined.');
    }
    if (!item.id) {
        throw createError('Field id must be defined.');
    }
    if (this.find({
        id: item.id
    })) {
        throw createError(("Field with id " + (item.id) + " is already added."));
    }
    this.items.push(item);
};

Object.defineProperties( FieldBag.prototype, prototypeAccessors$3 );

var RULES = {};
var STRICT_MODE = true;
var TARGET_RULES = ['confirmed','after','before'];
var Validator = function Validator(validations, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {
    fastExit: true
};

    this.strict = STRICT_MODE;
    this.errors = new ErrorBag();
    this.fields = new FieldBag();
    this.flags = {};
    this._createFields(validations);
    this.paused = false;
    this.fastExit = options.fastExit || false;
    this.ownerId = options.vm && options.vm._uid;
    this._localeListener = (function () {
        this$1.errors.regenerate();
    });
    if (this._vm) {
        this._vm.$on('localeChanged', this._localeListener);
    }
};

var prototypeAccessors$4 = { dictionary: { configurable: true },_vm: { configurable: true },locale: { configurable: true },rules: { configurable: true } };
var staticAccessors$1 = { dictionary: { configurable: true },locale: { configurable: true },rules: { configurable: true } };
prototypeAccessors$4.dictionary.get = function () {
    return Config.dependency('dictionary');
};
prototypeAccessors$4._vm.get = function () {
    return Config.dependency('vm');
};
staticAccessors$1.dictionary.get = function () {
    return Config.dependency('dictionary');
};
prototypeAccessors$4.locale.get = function () {
    return this.dictionary.locale;
};
prototypeAccessors$4.locale.set = function (value) {
    Validator.locale = value;
};
staticAccessors$1.locale.get = function () {
    return Validator.dictionary.locale;
};
staticAccessors$1.locale.set = function (value) {
    var hasChanged = value !== Validator.dictionary.locale;
    Validator.dictionary.locale = value;
    if (hasChanged && Config.dependency('vm')) {
        Config.dependency('vm').$emit('localeChanged');
    }
};
prototypeAccessors$4.rules.get = function () {
    return RULES;
};
staticAccessors$1.rules.get = function () {
    return RULES;
};
Validator.create = function create (validations, options) {
    return new Validator(validations, options);
};
Validator.extend = function extend (name, validator, options) {
        if ( options === void 0 ) options = {};

    Validator._guardExtend(name, validator);
    Validator._merge(name, validator);
    if (options && options.hasTarget) {
        TARGET_RULES.push(name);
    }
};
Validator.remove = function remove (name) {
    delete RULES[name];
    var idx = TARGET_RULES.indexOf(name);
    if (idx === -1) 
        { return; }
    TARGET_RULES.splice(idx, 1);
};
Validator.isTargetRule = function isTargetRule (name) {
    return TARGET_RULES.indexOf(name) !== -1;
};
Validator.setStrictMode = function setStrictMode (strictMode) {
        if ( strictMode === void 0 ) strictMode = true;

    STRICT_MODE = strictMode;
};
Validator.prototype.localize = function localize (lang, dictionary) {
    Validator.localize(lang, dictionary);
};
Validator.localize = function localize (lang, dictionary) {
        var obj;

    if (isObject(lang)) {
        Validator.dictionary.merge(lang);
        return;
    }
    if (dictionary) {
        var locale = lang || dictionary.name;
        dictionary = assign({}, dictionary);
        Validator.dictionary.merge(( obj = {}, obj[locale] = dictionary, obj ));
    }
    if (lang) {
        Validator.locale = lang;
    }
};
Validator.prototype.attach = function attach (field) {
    if (arguments.length > 1) {
        warn('This signature of the attach method has been deprecated, please consult the docs.');
        field = assign({}, {
            name: arguments[0],
            rules: arguments[1]
        }, arguments[2] || {
            vm: {
                $validator: this
            }
        });
    }
    var value = field.initialValue;
    if (!(field instanceof Field)) {
        field = new Field(field);
    }
    this.fields.push(field);
    if (field.initial) {
        this.validate(("#" + (field.id)), value || field.value);
    } else {
        this._validate(field, value || field.value, true).then(function (result) {
            field.flags.valid = result.valid;
            field.flags.invalid = !result.valid;
        });
    }
    this._addFlag(field, field.scope);
    return field;
};
Validator.prototype.flag = function flag (name, flags) {
    var field = this._resolveField(name);
    if (!field || !flags) {
        return;
    }
    field.setFlags(flags);
};
Validator.prototype.detach = function detach (name, scope) {
    var field = name instanceof Field ? name : this._resolveField(name, scope);
    if (!field) 
        { return; }
    field.destroy();
    this.errors.remove(field.name, field.scope, field.id);
    this.fields.remove(field);
    var flags = this.flags;
    if (!isNullOrUndefined(field.scope) && flags[("$" + (field.scope))]) {
        delete flags[("$" + (field.scope))][field.name];
    } else if (isNullOrUndefined(field.scope)) {
        delete flags[field.name];
    }
    this.flags = assign({}, flags);
};
Validator.prototype.extend = function extend (name, validator, options) {
        if ( options === void 0 ) options = {};

    Validator.extend(name, validator, options);
};
Validator.prototype.reset = function reset (matcher) {
    return new Promise((function ($return, $error) {
        return this._vm.$nextTick().then((function ($await_1) {
            try {
                return this._vm.$nextTick().then((function ($await_2) {
                        var this$1 = this;

                    try {
                        this.fields.filter(matcher).forEach(function (field) {
                            field.reset();
                            this$1.errors.remove(field.name, field.scope, field.id);
                        });
                        return $return();
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }).bind(this), $error);
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
};
Validator.prototype.update = function update (id, ref) {
        var scope = ref.scope;

    var field = this._resolveField(("#" + id));
    if (!field) 
        { return; }
    this.errors.update(id, {
        scope: scope
    });
    if (!isNullOrUndefined(field.scope) && this.flags[("$" + (field.scope))]) {
        delete this.flags[("$" + (field.scope))][field.name];
    } else if (isNullOrUndefined(field.scope)) {
        delete this.flags[field.name];
    }
    this._addFlag(field, scope);
};
Validator.prototype.remove = function remove (name) {
    Validator.remove(name);
};
Validator.prototype.validate = function validate (name, value, scope, silent) {
        if ( scope === void 0 ) scope = null;
        if ( silent === void 0 ) silent = false;

    var $args = arguments;
    return new Promise((function ($return, $error) {
        var matched, field, result;
        if (this.paused) 
            { return $return(Promise.resolve(true)); }
        if ($args.length === 0) {
            return $return(this.validateScopes());
        }
        if ($args.length === 1 && $args[0] === '*') {
            return $return(this.validateAll());
        }
        if ($args.length === 1 && typeof $args[0] === 'string' && /^(.+)\.\*$/.test($args[0])) {
            matched = $args[0].match(/^(.+)\.\*$/)[1];
            return $return(this.validateAll(matched));
        }
        field = this._resolveField(name, scope);
        if (!field) {
            return $return(this._handleFieldNotFound(name, scope));
        }
        if (!silent) 
            { field.flags.pending = true; }
        if ($args.length === 1) {
            value = field.value;
        }
        return this._validate(field, value).then((function ($await_3) {
            try {
                result = $await_3;
                if (!silent) {
                    this._handleValidationResults([result]);
                }
                return $return(result.valid);
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
};
Validator.prototype.pause = function pause () {
    this.paused = true;
    return this;
};
Validator.prototype.resume = function resume () {
    this.paused = false;
    return this;
};
Validator.prototype.validateAll = function validateAll (values, scope, silent) {
        if ( scope === void 0 ) scope = null;
        if ( silent === void 0 ) silent = false;

    return new Promise((function ($return, $error) {
            var this$1 = this;

        var results;
        var matcher, providedValues;
        if (this.paused) 
            { return $return(true); }
        matcher = null;
        providedValues = false;
        if (typeof values === 'string') {
            matcher = {
                scope: values
            };
        } else if (isObject(values)) {
            matcher = Object.keys(values).map(function (key) { return ({
                name: key,
                scope: scope
            }); });
            providedValues = true;
        } else if (Array.isArray(values)) {
            matcher = values.map(function (key) { return ({
                name: key,
                scope: scope
            }); });
        } else {
            matcher = {
                scope: scope
            };
        }
        return Promise.all(this.fields.filter(matcher).map(function (field) { return this$1._validate(field, providedValues ? values[field.name] : field.value); })).then((function ($await_4) {
            try {
                results = $await_4;
                if (!silent) {
                    this._handleValidationResults(results);
                }
                return $return(results.every(function (t) { return t.valid; }));
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
};
Validator.prototype.validateScopes = function validateScopes (silent) {
        if ( silent === void 0 ) silent = false;

    return new Promise((function ($return, $error) {
            var this$1 = this;

        var results;
        if (this.paused) 
            { return $return(true); }
        return Promise.all(this.fields.map(function (field) { return this$1._validate(field, field.value); })).then((function ($await_5) {
            try {
                results = $await_5;
                if (!silent) {
                    this._handleValidationResults(results);
                }
                return $return(results.every(function (t) { return t.valid; }));
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
};
Validator.prototype.destroy = function destroy () {
    this._vm.$off('localeChanged', this._localeListener);
};
Validator.prototype._createFields = function _createFields (validations) {
        var this$1 = this;

    if (!validations) 
        { return; }
    Object.keys(validations).forEach(function (field) {
        var options = assign({}, {
            name: field,
            rules: validations[field]
        });
        this$1.attach(options);
    });
};
Validator.prototype._getDateFormat = function _getDateFormat (validations) {
    var format = null;
    if (validations.date_format && Array.isArray(validations.date_format)) {
        format = validations.date_format[0];
    }
    return format || this.dictionary.getDateFormat(this.locale);
};
Validator.prototype._isADateRule = function _isADateRule (rule) {
    return !(!(~['after','before','date_between','date_format'].indexOf(rule)));
};
Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, targetName) {
        if ( data === void 0 ) data = {};
        if ( targetName === void 0 ) targetName = null;

    var name = this._getFieldDisplayName(field);
    var params = this._getLocalizedParams(rule, targetName);
    return this.dictionary.getFieldMessage(this.locale, field.name, rule.name, [name,
        params,data]);
};
Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, targetName) {
        if ( targetName === void 0 ) targetName = null;

    if (~TARGET_RULES.indexOf(rule.name) && rule.params && rule.params[0]) {
        var localizedName = targetName || this.dictionary.getAttribute(this.locale, rule.params[0], rule.params[0]);
        return [localizedName].concat(rule.params.slice(1));
    }
    return rule.params;
};
Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field) {
    return field.alias || this.dictionary.getAttribute(this.locale, field.name, field.name);
};
Validator.prototype._addFlag = function _addFlag (field, scope) {
        var obj, obj$1, obj$2;

        if ( scope === void 0 ) scope = null;
    if (isNullOrUndefined(scope)) {
        this.flags = assign({}, this.flags, ( obj = {}, obj[("" + (field.name))] = field.flags, obj ));
        return;
    }
    var scopeObj = assign({}, this.flags[("$" + scope)] || {}, ( obj$1 = {}, obj$1[("" + (field.name))] = field.flags, obj$1 ));
    this.flags = assign({}, this.flags, ( obj$2 = {}, obj$2[("$" + scope)] = scopeObj, obj$2 ));
};
Validator.prototype._test = function _test (field, value, rule) {
        var this$1 = this;

    var validator = RULES[rule.name];
    var params = Array.isArray(rule.params) ? toArray(rule.params) : [];
    var targetName = null;
    if (!validator || typeof validator !== 'function') {
        throw createError(("No such validator '" + (rule.name) + "' exists."));
    }
    if (TARGET_RULES.indexOf(rule.name) !== -1) {
        var target = find(field.dependencies, function (d) { return d.name === rule.name; });
        if (target) {
            targetName = target.field.alias;
            params = [target.field.value].concat(params.slice(1));
        }
    } else if (rule.name === 'required' && field.rejectsFalse) {
        params = params.length ? params : [true];
    }
    if (this._isADateRule(rule.name)) {
        var dateFormat = this._getDateFormat(field.rules);
        if (rule.name !== 'date_format') {
            params.push(dateFormat);
        }
    }
    var result = validator(value, params);
    if (isCallable(result.then)) {
        return result.then(function (values) {
            var allValid = true;
            var data = {};
            if (Array.isArray(values)) {
                allValid = values.every(function (t) { return isObject(t) ? t.valid : t; });
            } else {
                allValid = isObject(values) ? values.valid : values;
                data = values.data;
            }
            return {
                valid: allValid,
                errors: allValid ? [] : [this$1._createFieldError(field, rule, data, targetName)]
            };
        });
    }
    if (!isObject(result)) {
        result = {
            valid: result,
            data: {}
        };
    }
    return {
        valid: result.valid,
        errors: result.valid ? [] : [this._createFieldError(field, rule, result.data, targetName)]
    };
};
Validator._merge = function _merge (name, validator) {
    if (isCallable(validator)) {
        RULES[name] = validator;
        return;
    }
    RULES[name] = validator.validate;
    if (validator.getMessage) {
        Validator.dictionary.setMessage(this.locale, name, validator.getMessage);
    }
};
Validator._guardExtend = function _guardExtend (name, validator) {
    if (isCallable(validator)) {
        return;
    }
    if (!isCallable(validator.validate)) {
        throw createError(("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method."));
    }
};
Validator.prototype._createFieldError = function _createFieldError (field, rule, data, targetName) {
        var this$1 = this;

    return {
        id: field.id,
        field: field.name,
        msg: this._formatErrorMessage(field, rule, data, targetName),
        rule: rule.name,
        scope: field.scope,
        regenerate: function () { return this$1._formatErrorMessage(field, rule, data, targetName); }
    };
};
Validator.prototype._resolveField = function _resolveField (name, scope) {
    if (!isNullOrUndefined(scope)) {
        return this.fields.find({
            name: name,
            scope: scope
        });
    }
    if (name[0] === '#') {
        return this.fields.find({
            id: name.slice(1)
        });
    }
    if (name.indexOf('.') > -1) {
        var ref = name.split('.');
            var fieldScope = ref[0];
            var fieldName = ref.slice(1);
        var field = this.fields.find({
            name: fieldName.join('.'),
            scope: fieldScope
        });
        if (field) {
            return field;
        }
    }
    return this.fields.find({
        name: name,
        scope: null
    });
};
Validator.prototype._handleFieldNotFound = function _handleFieldNotFound (name, scope) {
    if (!this.strict) 
        { return true; }
    var fullName = isNullOrUndefined(scope) ? name : ("" + (!isNullOrUndefined(scope) ? scope + '.' : '') + name);
    throw createError(("Validating a non-existent field: \"" + fullName + "\". Use \"attach()\" first."));
};
Validator.prototype._handleValidationResults = function _handleValidationResults (results) {
    var matchers = results.map(function (result) { return ({
        id: result.id
    }); });
    this.errors.removeById(matchers.map(function (m) { return m.id; }));
    var allErrors = results.reduce(function (prev, curr) {
        prev.push.apply(prev, curr.errors);
        return prev;
    }, []);
    this.errors.add(allErrors);
    this.fields.filter(matchers).forEach(function (field) {
        var result = find(results, function (r) { return r.id === field.id; });
        field.setFlags({
            pending: false,
            valid: result.valid,
            validated: true
        });
    });
};
Validator.prototype._validate = function _validate (field, value) {
    return new Promise((function ($return, $error) {
            var this$1 = this;

        var promises, errors;
        var isExitEarly;
        if (field.isDisabled || !field.isRequired && (isNullOrUndefined(value) || value === '')) {
            return $return({
                valid: true,
                id: field.id,
                errors: []
            });
        }
        promises = [];
        errors = [];
        isExitEarly = false;
        Object.keys(field.rules).some(function (rule) {
            var result = this$1._test(field, value, {
                name: rule,
                params: field.rules[rule]
            });
            if (isCallable(result.then)) {
                promises.push(result);
            } else if (this$1.fastExit && !result.valid) {
                errors.push.apply(errors, result.errors);
                isExitEarly = true;
            } else {
                promises.push(new Promise(function (resolve) { return resolve(result); }));
            }
            return isExitEarly;
        });
        if (isExitEarly) {
            return $return({
                valid: false,
                errors: errors,
                id: field.id
            });
        }
        return Promise.all(promises).then((function ($await_6) {
            try {
                return $return($await_6.reduce(function (prev, v) {
                        var ref;

                    if (!v.valid) {
                        (ref = prev.errors).push.apply(ref, v.errors);
                    }
                    prev.valid = prev.valid && v.valid;
                    return prev;
                }, {
                    valid: true,
                    errors: errors,
                    id: field.id
                }));
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }).bind(this), $error);
    }).bind(this));
};

Object.defineProperties( Validator.prototype, prototypeAccessors$4 );
Object.defineProperties( Validator, staticAccessors$1 );

var requestsValidator = function (injections) {
    if (isObject(injections) && injections.$validator) {
        return true;
    }
    return false;
};
var createValidator = function (vm, options) { return new Validator(null, {
    vm: vm,
    fastExit: options.fastExit
}); };
var mixin = {
    provide: function provide() {
        if (this.$validator && !isBuiltInComponent(this.$vnode)) {
            return {
                $validator: this.$validator
            };
        }
        return {};
    },
    beforeCreate: function beforeCreate() {
        if (isBuiltInComponent(this.$vnode)) {
            return;
        }
        if (!this.$parent) {
            Config.merge(this.$options.$_veeValidate || {});
        }
        var options = Config.resolve(this);
        var Vue = this.$options._base;
        if (this.$options.$validates) {
            warn('The ctor $validates option has been deprecated please set the $_veeValidate.validator option to "new" instead');
            this.$validator = createValidator(this, options);
        }
        if (!this.$parent || this.$options.$_veeValidate && /new/.test(this.$options.$_veeValidate.validator)) {
            this.$validator = createValidator(this, options);
        }
        var requested = requestsValidator(this.$options.inject);
        if (!this.$validator && options.inject && !requested) {
            this.$validator = createValidator(this, options);
        }
        if (!requested && !this.$validator) {
            return;
        }
        if (!requested && this.$validator) {
            Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors);
            Vue.util.defineReactive(this.$validator, 'flags', this.$validator.flags);
        }
        if (!this.$options.computed) {
            this.$options.computed = {};
        }
        this.$options.computed[options.errorBagName || 'errors'] = function errorBagGetter() {
            return this.$validator.errors;
        };
        this.$options.computed[options.fieldsBagName || 'fields'] = function fieldBagGetter() {
            return this.$validator.flags;
        };
    },
    beforeDestroy: function beforeDestroy() {
        if (isBuiltInComponent(this.$vnode)) 
            { return; }
        if (this.$validator && this.$validator.ownerId === this._uid) {
            this.$validator.pause();
            this.$validator.destroy();
        }
    }
}

function findField(el, context) {
    if (!context || !context.$validator) {
        return null;
    }
    return context.$validator.fields.find({
        id: el._veeValidateId
    });
}
var directive = {
    bind: function bind(el, binding, vnode) {
        var validator = vnode.context.$validator;
        if (!validator) {
            warn("No validator instance is present on vm, did you forget to inject '$validator'?");
            return;
        }
        var fieldOptions = Generator.generate(el, binding, vnode);
        validator.attach(fieldOptions);
    },
    inserted: function inserted(el, binding, vnode) {
        var field = findField(el, vnode.context);
        var scope = Generator.resolveScope(el, binding, vnode);
        if (!field || scope === field.scope) 
            { return; }
        field.update({
            scope: scope
        });
        field.updated = false;
    },
    update: function update(el, binding, vnode) {
        var field = findField(el, vnode.context);
        if (!field || field.updated && isEqual(binding.value, binding.oldValue)) 
            { return; }
        var scope = Generator.resolveScope(el, binding, vnode);
        var rules = Generator.resolveRules(el, binding);
        field.update({
            scope: scope,
            rules: rules
        });
    },
    unbind: function unbind(el, binding, ref) {
        var context = ref.context;

        var field = findField(el, context);
        if (!field) 
            { return; }
        context.$validator.detach(field);
    }
}

var Vue;
function install(_Vue, options) {
    if ( options === void 0 ) options = {};

    if (Vue && _Vue === Vue) {
        if (true) {
            warn('already installed, Vue.use(VeeValidate) should only be called once.');
        }
        return;
    }
    detectPassiveSupport();
    Vue = _Vue;
    var localVue = new Vue();
    Config.register('vm', localVue);
    Config.merge(options);
    var ref = Config.current;
    var dictionary = ref.dictionary;
    var i18n = ref.i18n;
    if (dictionary) {
        Validator.localize(dictionary);
    }
    if (i18n && i18n._vm && isCallable(i18n._vm.$watch)) {
        i18n._vm.$watch('locale', function () {
            localVue.$emit('localeChanged');
        });
    }
    if (!i18n && options.locale) {
        Validator.localize(options.locale);
    }
    Validator.setStrictMode(Config.current.strict);
    Vue.mixin(mixin);
    Vue.directive('validate', directive);
}

var formatFileSize = function (size) {
    var units = ['Byte','KB','MB','GB','TB','PB','EB','ZB','YB'];
    var threshold = 1024;
    size = Number(size) * threshold;
    var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
    return (((size / Math.pow(threshold, i)).toFixed(2) * 1) + " " + (units[i]));
};
var isDefinedGlobally = function () { return typeof VeeValidate !== 'undefined'; };

var obj;
var messages = {
    _default: function (field) { return ("The " + field + " value is not valid."); },
    after: function (field, ref) {
        var target = ref[0];
        var inclusion = ref[1];

        return ("The " + field + " must be after " + (inclusion ? 'or equal to ' : '') + target + ".");
},
    alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
    alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
    alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
    alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
    before: function (field, ref) {
        var target = ref[0];
        var inclusion = ref[1];

        return ("The " + field + " must be before " + (inclusion ? 'or equal to ' : '') + target + ".");
},
    between: function (field, ref) {
        var min = ref[0];
        var max = ref[1];

        return ("The " + field + " field must be between " + min + " and " + max + ".");
},
    confirmed: function (field) { return ("The " + field + " confirmation does not match."); },
    credit_card: function (field) { return ("The " + field + " field is invalid."); },
    date_between: function (field, ref) {
        var min = ref[0];
        var max = ref[1];

        return ("The " + field + " must be between " + min + " and " + max + ".");
},
    date_format: function (field, ref) {
        var format = ref[0];

        return ("The " + field + " must be in the format " + format + ".");
},
    decimal: function (field, ref) {
        if ( ref === void 0 ) ref = [];
        var decimals = ref[0]; if ( decimals === void 0 ) decimals = '*';

        return ("The " + field + " field must be numeric and may contain " + (!decimals || decimals === '*' ? '' : decimals) + " decimal points.");
},
    digits: function (field, ref) {
        var length = ref[0];

        return ("The " + field + " field must be numeric and exactly contain " + length + " digits.");
},
    dimensions: function (field, ref) {
        var width = ref[0];
        var height = ref[1];

        return ("The " + field + " field must be " + width + " pixels by " + height + " pixels.");
},
    email: function (field) { return ("The " + field + " field must be a valid email."); },
    ext: function (field) { return ("The " + field + " field must be a valid file."); },
    image: function (field) { return ("The " + field + " field must be an image."); },
    in: function (field) { return ("The " + field + " field must be a valid value."); },
    integer: function (field) { return ("The " + field + " field must be an integer."); },
    ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
    length: function (field, ref) {
        var length = ref[0];
        var max = ref[1];

        if (max) {
            return ("The " + field + " length must be between " + length + " and " + max + ".");
        }
        return ("The " + field + " length must be " + length + ".");
    },
    max: function (field, ref) {
        var length = ref[0];

        return ("The " + field + " field may not be greater than " + length + " characters.");
},
    max_value: function (field, ref) {
        var max = ref[0];

        return ("The " + field + " field must be " + max + " or less.");
},
    mimes: function (field) { return ("The " + field + " field must have a valid file type."); },
    min: function (field, ref) {
        var length = ref[0];

        return ("The " + field + " field must be at least " + length + " characters.");
},
    min_value: function (field, ref) {
        var min = ref[0];

        return ("The " + field + " field must be " + min + " or more.");
},
    not_in: function (field) { return ("The " + field + " field must be a valid value."); },
    numeric: function (field) { return ("The " + field + " field may only contain numeric characters."); },
    regex: function (field) { return ("The " + field + " field format is invalid."); },
    required: function (field) { return ("The " + field + " field is required."); },
    size: function (field, ref) {
        var size = ref[0];

        return ("The " + field + " size must be less than " + (formatFileSize(size)) + ".");
},
    url: function (field) { return ("The " + field + " field is not a valid URL."); }
};
var locale = {
    name: 'en',
    messages: messages,
    attributes: {}
};
if (isDefinedGlobally()) {
    VeeValidate.Validator.localize(( obj = {}, obj[locale.name] = locale, obj ));
}

function use(plugin, options) {
    if ( options === void 0 ) options = {};

    if (!isCallable(plugin)) {
        return warn('The plugin must be a callable function');
    }
    plugin({
        Validator: Validator,
        ErrorBag: ErrorBag,
        Rules: Validator.rules
    }, options);
}

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
    dateTimeDelimeter: /[T ]/,
    plainTime: /:/,
    YY: /^(\d{2})$/,
    YYY: [/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],
    YYYY: /^(\d{4})/,
    YYYYY: [/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,
    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-])(\d{2})$/,
    timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function toDate(argument, dirtyOptions) {
    if (arguments.length < 1) {
        throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }
    if (argument === null) {
        return new Date(NaN);
    }
    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits === undefined ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
        throw new RangeError('additionalDigits must be 0, 1 or 2');
    }
    if (argument instanceof Date) {
        return new Date(argument.getTime());
    } else if (typeof argument !== 'string') {
        return new Date(argument);
    }
    var dateStrings = splitDateString(argument);
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;
    var date = parseDate(restDateString, year);
    if (date) {
        var timestamp = date.getTime();
        var time = 0;
        var offset;
        if (dateStrings.time) {
            time = parseTime(dateStrings.time);
        }
        if (dateStrings.timezone) {
            offset = parseTimezone(dateStrings.timezone);
        } else {
            offset = new Date(timestamp + time).getTimezoneOffset();
            offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
        }
        return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE);
    } else {
        return new Date(argument);
    }
}

function splitDateString(dateString) {
    var dateStrings = {};
    var array = dateString.split(patterns.dateTimeDelimeter);
    var timeString;
    if (patterns.plainTime.test(array[0])) {
        dateStrings.date = null;
        timeString = array[0];
    } else {
        dateStrings.date = array[0];
        timeString = array[1];
    }
    if (timeString) {
        var token = patterns.timezone.exec(timeString);
        if (token) {
            dateStrings.time = timeString.replace(token[1], '');
            dateStrings.timezone = token[1];
        } else {
            dateStrings.time = timeString;
        }
    }
    return dateStrings;
}

function parseYear(dateString, additionalDigits) {
    var patternYYY = patterns.YYY[additionalDigits];
    var patternYYYYY = patterns.YYYYY[additionalDigits];
    var token;
    token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
    if (token) {
        var yearString = token[1];
        return {
            year: parseInt(yearString, 10),
            restDateString: dateString.slice(yearString.length)
        };
    }
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
    if (token) {
        var centuryString = token[1];
        return {
            year: parseInt(centuryString, 10) * 100,
            restDateString: dateString.slice(centuryString.length)
        };
    }
    return {
        year: null
    };
}

function parseDate(dateString, year) {
    if (year === null) {
        return null;
    }
    var token;
    var date;
    var month;
    var week;
    if (dateString.length === 0) {
        date = new Date(0);
        date.setUTCFullYear(year);
        return date;
    }
    token = patterns.MM.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        date.setUTCFullYear(year, month);
        return date;
    }
    token = patterns.DDD.exec(dateString);
    if (token) {
        date = new Date(0);
        var dayOfYear = parseInt(token[1], 10);
        date.setUTCFullYear(year, 0, dayOfYear);
        return date;
    }
    token = patterns.MMDD.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        var day = parseInt(token[2], 10);
        date.setUTCFullYear(year, month, day);
        return date;
    }
    token = patterns.Www.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        return dayOfISOYear(year, week);
    }
    token = patterns.WwwD.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        var dayOfWeek = parseInt(token[2], 10) - 1;
        return dayOfISOYear(year, week, dayOfWeek);
    }
    return null;
}

function parseTime(timeString) {
    var token;
    var hours;
    var minutes;
    token = patterns.HH.exec(timeString);
    if (token) {
        hours = parseFloat(token[1].replace(',', '.'));
        return hours % 24 * MILLISECONDS_IN_HOUR;
    }
    token = patterns.HHMM.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseFloat(token[2].replace(',', '.'));
        return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    }
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseInt(token[2], 10);
        var seconds = parseFloat(token[3].replace(',', '.'));
        return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
    }
    return null;
}

function parseTimezone(timezoneString) {
    var token;
    var absoluteOffset;
    token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
        return 0;
    }
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
        absoluteOffset = parseInt(token[2], 10) * 60;
        return token[1] === '+' ? -absoluteOffset : absoluteOffset;
    }
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
        absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
        return token[1] === '+' ? -absoluteOffset : absoluteOffset;
    }
    return 0;
}

function dayOfISOYear(isoYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date = new Date(0);
    date.setUTCFullYear(isoYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}

function addMilliseconds(dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var timestamp = toDate(dirtyDate, dirtyOptions).getTime();
    var amount = Number(dirtyAmount);
    return new Date(timestamp + amount);
}

function cloneObject(dirtyObject) {
    dirtyObject = dirtyObject || {};
    var object = {};
    for (var property in dirtyObject) {
        if (dirtyObject.hasOwnProperty(property)) {
            object[property] = dirtyObject[property];
        }
    }
    return object;
}

var MILLISECONDS_IN_MINUTE$2 = 60000;
function addMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var amount = Number(dirtyAmount);
    return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE$2, dirtyOptions);
}

function isValid(dirtyDate, dirtyOptions) {
    if (arguments.length < 1) {
        throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }
    var date = toDate(dirtyDate, dirtyOptions);
    return !isNaN(date);
}

var formatDistanceLocale = {
    lessThanXSeconds: {
        one: 'less than a second',
        other: 'less than {{count}} seconds'
    },
    xSeconds: {
        one: '1 second',
        other: '{{count}} seconds'
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
        one: 'less than a minute',
        other: 'less than {{count}} minutes'
    },
    xMinutes: {
        one: '1 minute',
        other: '{{count}} minutes'
    },
    aboutXHours: {
        one: 'about 1 hour',
        other: 'about {{count}} hours'
    },
    xHours: {
        one: '1 hour',
        other: '{{count}} hours'
    },
    xDays: {
        one: '1 day',
        other: '{{count}} days'
    },
    aboutXMonths: {
        one: 'about 1 month',
        other: 'about {{count}} months'
    },
    xMonths: {
        one: '1 month',
        other: '{{count}} months'
    },
    aboutXYears: {
        one: 'about 1 year',
        other: 'about {{count}} years'
    },
    xYears: {
        one: '1 year',
        other: '{{count}} years'
    },
    overXYears: {
        one: 'over 1 year',
        other: 'over {{count}} years'
    },
    almostXYears: {
        one: 'almost 1 year',
        other: 'almost {{count}} years'
    }
};
function formatDistance(token, count, options) {
    options = options || {};
    var result;
    if (typeof formatDistanceLocale[token] === 'string') {
        result = formatDistanceLocale[token];
    } else if (count === 1) {
        result = formatDistanceLocale[token].one;
    } else {
        result = formatDistanceLocale[token].other.replace('{{count}}', count);
    }
    if (options.addSuffix) {
        if (options.comparison > 0) {
            return 'in ' + result;
        } else {
            return result + ' ago';
        }
    }
    return result;
}

var tokensToBeShortedPattern = /MMMM|MM|DD|dddd/g;
function buildShortLongFormat(format) {
    return format.replace(tokensToBeShortedPattern, function (token) {
        return token.slice(1);
    });
}

function buildFormatLongFn(obj) {
    var formatLongLocale = {
        LTS: obj.LTS,
        LT: obj.LT,
        L: obj.L,
        LL: obj.LL,
        LLL: obj.LLL,
        LLLL: obj.LLLL,
        l: obj.l || buildShortLongFormat(obj.L),
        ll: obj.ll || buildShortLongFormat(obj.LL),
        lll: obj.lll || buildShortLongFormat(obj.LLL),
        llll: obj.llll || buildShortLongFormat(obj.LLLL)
    };
    return function (token) {
        return formatLongLocale[token];
    };
}

var formatLong = buildFormatLongFn({
    LT: 'h:mm aa',
    LTS: 'h:mm:ss aa',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D YYYY',
    LLL: 'MMMM D YYYY h:mm aa',
    LLLL: 'dddd, MMMM D YYYY h:mm aa'
});

var formatRelativeLocale = {
    lastWeek: '[last] dddd [at] LT',
    yesterday: '[yesterday at] LT',
    today: '[today at] LT',
    tomorrow: '[tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    other: 'L'
};
function formatRelative(token, date, baseDate, options) {
    return formatRelativeLocale[token];
}

function buildLocalizeFn(values, defaultType, indexCallback) {
    return function (dirtyIndex, dirtyOptions) {
        var options = dirtyOptions || {};
        var type = options.type ? String(options.type) : defaultType;
        var valuesArray = values[type] || values[defaultType];
        var index = indexCallback ? indexCallback(Number(dirtyIndex)) : Number(dirtyIndex);
        return valuesArray[index];
    };
}

function buildLocalizeArrayFn(values, defaultType) {
    return function (dirtyOptions) {
        var options = dirtyOptions || {};
        var type = options.type ? String(options.type) : defaultType;
        return values[type] || values[defaultType];
    };
}

var weekdayValues = {
    narrow: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    short: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    long: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
};
var monthValues = {
    short: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    long: ['January','February','March','April','May','June','July','August','September',
        'October','November','December']
};
var timeOfDayValues = {
    uppercase: ['AM','PM'],
    lowercase: ['am','pm'],
    long: ['a.m.','p.m.']
};
function ordinalNumber(dirtyNumber, dirtyOptions) {
    var number = Number(dirtyNumber);
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
            case 1:
                return number + 'st';
            case 2:
                return number + 'nd';
            case 3:
                return number + 'rd';
        }
    }
    return number + 'th';
}

var localize = {
    ordinalNumber: ordinalNumber,
    weekday: buildLocalizeFn(weekdayValues, 'long'),
    weekdays: buildLocalizeArrayFn(weekdayValues, 'long'),
    month: buildLocalizeFn(monthValues, 'long'),
    months: buildLocalizeArrayFn(monthValues, 'long'),
    timeOfDay: buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
        return hours / 12 >= 1 ? 1 : 0;
    }),
    timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'long')
};

function buildMatchFn(patterns, defaultType) {
    return function (dirtyString, dirtyOptions) {
        var options = dirtyOptions || {};
        var type = options.type ? String(options.type) : defaultType;
        var pattern = patterns[type] || patterns[defaultType];
        var string = String(dirtyString);
        return string.match(pattern);
    };
}

function buildParseFn(patterns, defaultType) {
    return function (matchResult, dirtyOptions) {
        var options = dirtyOptions || {};
        var type = options.type ? String(options.type) : defaultType;
        var patternsArray = patterns[type] || patterns[defaultType];
        var string = matchResult[1];
        return patternsArray.findIndex(function (pattern) {
            return pattern.test(string);
        });
    };
}

function buildMatchPatternFn(pattern) {
    return function (dirtyString) {
        var string = String(dirtyString);
        return string.match(pattern);
    };
}

function parseDecimal(matchResult) {
    return parseInt(matchResult[1], 10);
}

var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;
var matchWeekdaysPatterns = {
    narrow: /^(su|mo|tu|we|th|fr|sa)/i,
    short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseWeekdayPatterns = {
    any: [/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]
};
var matchMonthsPatterns = {
    short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
    any: [/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,
        /^n/i,/^d/i]
};
var matchTimesOfDayPatterns = {
    short: /^(am|pm)/i,
    long: /^([ap]\.?\s?m\.?)/i
};
var parseTimeOfDayPatterns = {
    any: [/^a/i,/^p/i]
};
var match = {
    ordinalNumbers: buildMatchPatternFn(matchOrdinalNumbersPattern),
    ordinalNumber: parseDecimal,
    weekdays: buildMatchFn(matchWeekdaysPatterns, 'long'),
    weekday: buildParseFn(parseWeekdayPatterns, 'any'),
    months: buildMatchFn(matchMonthsPatterns, 'long'),
    month: buildParseFn(parseMonthPatterns, 'any'),
    timesOfDay: buildMatchFn(matchTimesOfDayPatterns, 'long'),
    timeOfDay: buildParseFn(parseTimeOfDayPatterns, 'any')
};

var locale$1 = {
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
    }
};

var MILLISECONDS_IN_DAY$1 = 86400000;
function getUTCDayOfYear(dirtyDate, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY$1) + 1;
}

function startOfUTCISOWeek(dirtyDate, dirtyOptions) {
    var weekStartsOn = 1;
    var date = toDate(dirtyDate, dirtyOptions);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

function getUTCISOWeekYear(dirtyDate, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear, dirtyOptions);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear, dirtyOptions);
    if (date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
        return year;
    } else {
        return year - 1;
    }
}

function startOfUTCISOWeekYear(dirtyDate, dirtyOptions) {
    var year = getUTCISOWeekYear(dirtyDate, dirtyOptions);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary, dirtyOptions);
    return date;
}

var MILLISECONDS_IN_WEEK$2 = 604800000;
function getUTCISOWeek(dirtyDate, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var diff = startOfUTCISOWeek(date, dirtyOptions).getTime() - startOfUTCISOWeekYear(date, dirtyOptions).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1;
}

var formatters = {
    'M': function (date) {
        return date.getUTCMonth() + 1;
    },
    'Mo': function (date, options) {
        var month = date.getUTCMonth() + 1;
        return options.locale.localize.ordinalNumber(month, {
            unit: 'month'
        });
    },
    'MM': function (date) {
        return addLeadingZeros(date.getUTCMonth() + 1, 2);
    },
    'MMM': function (date, options) {
        return options.locale.localize.month(date.getUTCMonth(), {
            type: 'short'
        });
    },
    'MMMM': function (date, options) {
        return options.locale.localize.month(date.getUTCMonth(), {
            type: 'long'
        });
    },
    'Q': function (date) {
        return Math.ceil((date.getUTCMonth() + 1) / 3);
    },
    'Qo': function (date, options) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        return options.locale.localize.ordinalNumber(quarter, {
            unit: 'quarter'
        });
    },
    'D': function (date) {
        return date.getUTCDate();
    },
    'Do': function (date, options) {
        return options.locale.localize.ordinalNumber(date.getUTCDate(), {
            unit: 'dayOfMonth'
        });
    },
    'DD': function (date) {
        return addLeadingZeros(date.getUTCDate(), 2);
    },
    'DDD': function (date) {
        return getUTCDayOfYear(date);
    },
    'DDDo': function (date, options) {
        return options.locale.localize.ordinalNumber(getUTCDayOfYear(date), {
            unit: 'dayOfYear'
        });
    },
    'DDDD': function (date) {
        return addLeadingZeros(getUTCDayOfYear(date), 3);
    },
    'dd': function (date, options) {
        return options.locale.localize.weekday(date.getUTCDay(), {
            type: 'narrow'
        });
    },
    'ddd': function (date, options) {
        return options.locale.localize.weekday(date.getUTCDay(), {
            type: 'short'
        });
    },
    'dddd': function (date, options) {
        return options.locale.localize.weekday(date.getUTCDay(), {
            type: 'long'
        });
    },
    'd': function (date) {
        return date.getUTCDay();
    },
    'do': function (date, options) {
        return options.locale.localize.ordinalNumber(date.getUTCDay(), {
            unit: 'dayOfWeek'
        });
    },
    'E': function (date) {
        return date.getUTCDay() || 7;
    },
    'W': function (date) {
        return getUTCISOWeek(date);
    },
    'Wo': function (date, options) {
        return options.locale.localize.ordinalNumber(getUTCISOWeek(date), {
            unit: 'isoWeek'
        });
    },
    'WW': function (date) {
        return addLeadingZeros(getUTCISOWeek(date), 2);
    },
    'YY': function (date) {
        return addLeadingZeros(date.getUTCFullYear(), 4).substr(2);
    },
    'YYYY': function (date) {
        return addLeadingZeros(date.getUTCFullYear(), 4);
    },
    'GG': function (date) {
        return String(getUTCISOWeekYear(date)).substr(2);
    },
    'GGGG': function (date) {
        return getUTCISOWeekYear(date);
    },
    'H': function (date) {
        return date.getUTCHours();
    },
    'HH': function (date) {
        return addLeadingZeros(date.getUTCHours(), 2);
    },
    'h': function (date) {
        var hours = date.getUTCHours();
        if (hours === 0) {
            return 12;
        } else if (hours > 12) {
            return hours % 12;
        } else {
            return hours;
        }
    },
    'hh': function (date) {
        return addLeadingZeros(formatters['h'](date), 2);
    },
    'm': function (date) {
        return date.getUTCMinutes();
    },
    'mm': function (date) {
        return addLeadingZeros(date.getUTCMinutes(), 2);
    },
    's': function (date) {
        return date.getUTCSeconds();
    },
    'ss': function (date) {
        return addLeadingZeros(date.getUTCSeconds(), 2);
    },
    'S': function (date) {
        return Math.floor(date.getUTCMilliseconds() / 100);
    },
    'SS': function (date) {
        return addLeadingZeros(Math.floor(date.getUTCMilliseconds() / 10), 2);
    },
    'SSS': function (date) {
        return addLeadingZeros(date.getUTCMilliseconds(), 3);
    },
    'Z': function (date, options) {
        var originalDate = options._originalDate || date;
        return formatTimezone(originalDate.getTimezoneOffset(), ':');
    },
    'ZZ': function (date, options) {
        var originalDate = options._originalDate || date;
        return formatTimezone(originalDate.getTimezoneOffset());
    },
    'X': function (date, options) {
        var originalDate = options._originalDate || date;
        return Math.floor(originalDate.getTime() / 1000);
    },
    'x': function (date, options) {
        var originalDate = options._originalDate || date;
        return originalDate.getTime();
    },
    'A': function (date, options) {
        return options.locale.localize.timeOfDay(date.getUTCHours(), {
            type: 'uppercase'
        });
    },
    'a': function (date, options) {
        return options.locale.localize.timeOfDay(date.getUTCHours(), {
            type: 'lowercase'
        });
    },
    'aa': function (date, options) {
        return options.locale.localize.timeOfDay(date.getUTCHours(), {
            type: 'long'
        });
    }
};
function formatTimezone(offset, delimeter) {
    delimeter = delimeter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2);
}

function addLeadingZeros(number, targetLength) {
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function addUTCMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var amount = Number(dirtyAmount);
    date.setUTCMinutes(date.getUTCMinutes() + amount);
    return date;
}

var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultFormattingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};
    var locale = options.locale || locale$1;
    if (!locale.localize) {
        throw new RangeError('locale must contain localize property');
    }
    if (!locale.formatLong) {
        throw new RangeError('locale must contain formatLong property');
    }
    var localeFormatters = locale.formatters || {};
    var formattingTokensRegExp = locale.formattingTokensRegExp || defaultFormattingTokensRegExp;
    var formatLong = locale.formatLong;
    var originalDate = toDate(dirtyDate, options);
    if (!isValid(originalDate, options)) {
        return 'Invalid Date';
    }
    var timezoneOffset = originalDate.getTimezoneOffset();
    var utcDate = addUTCMinutes(originalDate, -timezoneOffset, options);
    var formatterOptions = cloneObject(options);
    formatterOptions.locale = locale;
    formatterOptions.formatters = formatters;
    formatterOptions._originalDate = originalDate;
    var result = formatStr.replace(longFormattingTokensRegExp, function (substring) {
        if (substring[0] === '[') {
            return substring;
        }
        if (substring[0] === '\\') {
            return cleanEscapedString(substring);
        }
        return formatLong(substring);
    }).replace(formattingTokensRegExp, function (substring) {
        var formatter = localeFormatters[substring] || formatters[substring];
        if (formatter) {
            return formatter(utcDate, formatterOptions);
        } else {
            return cleanEscapedString(substring);
        }
    });
    return result;
}

function cleanEscapedString(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function subMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var amount = Number(dirtyAmount);
    return addMinutes(dirtyDate, -amount, dirtyOptions);
}

function isAfter(dirtyDate, dirtyDateToCompare, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var date = toDate(dirtyDate, dirtyOptions);
    var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
    return date.getTime() > dateToCompare.getTime();
}

function isBefore(dirtyDate, dirtyDateToCompare, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var date = toDate(dirtyDate, dirtyOptions);
    var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
    return date.getTime() < dateToCompare.getTime();
}

function isEqual$1(dirtyLeftDate, dirtyRightDate, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
    }
    var dateLeft = toDate(dirtyLeftDate, dirtyOptions);
    var dateRight = toDate(dirtyRightDate, dirtyOptions);
    return dateLeft.getTime() === dateRight.getTime();
}

var patterns$1 = {
    'M': /^(1[0-2]|0?\d)/,
    'D': /^(3[0-1]|[0-2]?\d)/,
    'DDD': /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    'W': /^(5[0-3]|[0-4]?\d)/,
    'YYYY': /^(\d{1,4})/,
    'H': /^(2[0-3]|[0-1]?\d)/,
    'm': /^([0-5]?\d)/,
    'Z': /^([+-])(\d{2}):(\d{2})/,
    'ZZ': /^([+-])(\d{2})(\d{2})/,
    singleDigit: /^(\d)/,
    twoDigits: /^(\d{2})/,
    threeDigits: /^(\d{3})/,
    fourDigits: /^(\d{4})/,
    anyDigits: /^(\d+)/
};
function parseDecimal$1(matchResult) {
    return parseInt(matchResult[1], 10);
}

var parsers = {
    'YY': {
        unit: 'twoDigitYear',
        match: patterns$1.twoDigits,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult);
        }
    },
    'YYYY': {
        unit: 'year',
        match: patterns$1.YYYY,
        parse: parseDecimal$1
    },
    'GG': {
        unit: 'isoYear',
        match: patterns$1.twoDigits,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) + 1900;
        }
    },
    'GGGG': {
        unit: 'isoYear',
        match: patterns$1.YYYY,
        parse: parseDecimal$1
    },
    'Q': {
        unit: 'quarter',
        match: patterns$1.singleDigit,
        parse: parseDecimal$1
    },
    'Qo': {
        unit: 'quarter',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'quarter'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'quarter'
            });
        }
    },
    'M': {
        unit: 'month',
        match: patterns$1.M,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) - 1;
        }
    },
    'Mo': {
        unit: 'month',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'month'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'month'
            }) - 1;
        }
    },
    'MM': {
        unit: 'month',
        match: patterns$1.twoDigits,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) - 1;
        }
    },
    'MMM': {
        unit: 'month',
        match: function (string, options) {
            return options.locale.match.months(string, {
                type: 'short'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.month(matchResult, {
                type: 'short'
            });
        }
    },
    'MMMM': {
        unit: 'month',
        match: function (string, options) {
            return options.locale.match.months(string, {
                type: 'long'
            }) || options.locale.match.months(string, {
                type: 'short'
            });
        },
        parse: function (matchResult, options) {
            var parseResult = options.locale.match.month(matchResult, {
                type: 'long'
            });
            if (parseResult == null) {
                parseResult = options.locale.match.month(matchResult, {
                    type: 'short'
                });
            }
            return parseResult;
        }
    },
    'W': {
        unit: 'isoWeek',
        match: patterns$1.W,
        parse: parseDecimal$1
    },
    'Wo': {
        unit: 'isoWeek',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'isoWeek'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'isoWeek'
            });
        }
    },
    'WW': {
        unit: 'isoWeek',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    'd': {
        unit: 'dayOfWeek',
        match: patterns$1.singleDigit,
        parse: parseDecimal$1
    },
    'do': {
        unit: 'dayOfWeek',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'dayOfWeek'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'dayOfWeek'
            });
        }
    },
    'dd': {
        unit: 'dayOfWeek',
        match: function (string, options) {
            return options.locale.match.weekdays(string, {
                type: 'narrow'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.weekday(matchResult, {
                type: 'narrow'
            });
        }
    },
    'ddd': {
        unit: 'dayOfWeek',
        match: function (string, options) {
            return options.locale.match.weekdays(string, {
                type: 'short'
            }) || options.locale.match.weekdays(string, {
                type: 'narrow'
            });
        },
        parse: function (matchResult, options) {
            var parseResult = options.locale.match.weekday(matchResult, {
                type: 'short'
            });
            if (parseResult == null) {
                parseResult = options.locale.match.weekday(matchResult, {
                    type: 'narrow'
                });
            }
            return parseResult;
        }
    },
    'dddd': {
        unit: 'dayOfWeek',
        match: function (string, options) {
            return options.locale.match.weekdays(string, {
                type: 'long'
            }) || options.locale.match.weekdays(string, {
                type: 'short'
            }) || options.locale.match.weekdays(string, {
                type: 'narrow'
            });
        },
        parse: function (matchResult, options) {
            var parseResult = options.locale.match.weekday(matchResult, {
                type: 'long'
            });
            if (parseResult == null) {
                parseResult = options.locale.match.weekday(matchResult, {
                    type: 'short'
                });
                if (parseResult == null) {
                    parseResult = options.locale.match.weekday(matchResult, {
                        type: 'narrow'
                    });
                }
            }
            return parseResult;
        }
    },
    'E': {
        unit: 'dayOfISOWeek',
        match: patterns$1.singleDigit,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult);
        }
    },
    'D': {
        unit: 'dayOfMonth',
        match: patterns$1.D,
        parse: parseDecimal$1
    },
    'Do': {
        unit: 'dayOfMonth',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'dayOfMonth'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'dayOfMonth'
            });
        }
    },
    'DD': {
        unit: 'dayOfMonth',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    'DDD': {
        unit: 'dayOfYear',
        match: patterns$1.DDD,
        parse: parseDecimal$1
    },
    'DDDo': {
        unit: 'dayOfYear',
        match: function (string, options) {
            return options.locale.match.ordinalNumbers(string, {
                unit: 'dayOfYear'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.ordinalNumber(matchResult, {
                unit: 'dayOfYear'
            });
        }
    },
    'DDDD': {
        unit: 'dayOfYear',
        match: patterns$1.threeDigits,
        parse: parseDecimal$1
    },
    'A': {
        unit: 'timeOfDay',
        match: function (string, options) {
            return options.locale.match.timesOfDay(string, {
                type: 'short'
            });
        },
        parse: function (matchResult, options) {
            return options.locale.match.timeOfDay(matchResult, {
                type: 'short'
            });
        }
    },
    'aa': {
        unit: 'timeOfDay',
        match: function (string, options) {
            return options.locale.match.timesOfDay(string, {
                type: 'long'
            }) || options.locale.match.timesOfDay(string, {
                type: 'short'
            });
        },
        parse: function (matchResult, options) {
            var parseResult = options.locale.match.timeOfDay(matchResult, {
                type: 'long'
            });
            if (parseResult == null) {
                parseResult = options.locale.match.timeOfDay(matchResult, {
                    type: 'short'
                });
            }
            return parseResult;
        }
    },
    'H': {
        unit: 'hours',
        match: patterns$1.H,
        parse: parseDecimal$1
    },
    'HH': {
        unit: 'hours',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    'h': {
        unit: 'timeOfDayHours',
        match: patterns$1.M,
        parse: parseDecimal$1
    },
    'hh': {
        unit: 'timeOfDayHours',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    'm': {
        unit: 'minutes',
        match: patterns$1.m,
        parse: parseDecimal$1
    },
    'mm': {
        unit: 'minutes',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    's': {
        unit: 'seconds',
        match: patterns$1.m,
        parse: parseDecimal$1
    },
    'ss': {
        unit: 'seconds',
        match: patterns$1.twoDigits,
        parse: parseDecimal$1
    },
    'S': {
        unit: 'milliseconds',
        match: patterns$1.singleDigit,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) * 100;
        }
    },
    'SS': {
        unit: 'milliseconds',
        match: patterns$1.twoDigits,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) * 10;
        }
    },
    'SSS': {
        unit: 'milliseconds',
        match: patterns$1.threeDigits,
        parse: parseDecimal$1
    },
    'Z': {
        unit: 'timezone',
        match: patterns$1.Z,
        parse: function (matchResult) {
            var sign = matchResult[1];
            var hours = parseInt(matchResult[2], 10);
            var minutes = parseInt(matchResult[3], 10);
            var absoluteOffset = hours * 60 + minutes;
            return sign === '+' ? absoluteOffset : -absoluteOffset;
        }
    },
    'ZZ': {
        unit: 'timezone',
        match: patterns$1.ZZ,
        parse: function (matchResult) {
            var sign = matchResult[1];
            var hours = parseInt(matchResult[2], 10);
            var minutes = parseInt(matchResult[3], 10);
            var absoluteOffset = hours * 60 + minutes;
            return sign === '+' ? absoluteOffset : -absoluteOffset;
        }
    },
    'X': {
        unit: 'timestamp',
        match: patterns$1.anyDigits,
        parse: function (matchResult) {
            return parseDecimal$1(matchResult) * 1000;
        }
    },
    'x': {
        unit: 'timestamp',
        match: patterns$1.anyDigits,
        parse: parseDecimal$1
    }
};
parsers['a'] = parsers['A'];

function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    var date = toDate(dirtyDate, dirtyOptions);
    var day = Number(dirtyDay);
    var currentDay = date.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}

function setUTCISODay(dirtyDate, dirtyDay, dirtyOptions) {
    var day = Number(dirtyDay);
    if (day % 7 === 0) {
        day = day - 7;
    }
    var weekStartsOn = 1;
    var date = toDate(dirtyDate, dirtyOptions);
    var currentDay = date.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}

function setUTCISOWeek(dirtyDate, dirtyISOWeek, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var isoWeek = Number(dirtyISOWeek);
    var diff = getUTCISOWeek(date, dirtyOptions) - isoWeek;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date;
}

var MILLISECONDS_IN_DAY$3 = 86400000;
function setUTCISOWeekYear(dirtyDate, dirtyISOYear, dirtyOptions) {
    var date = toDate(dirtyDate, dirtyOptions);
    var isoYear = Number(dirtyISOYear);
    var dateStartOfYear = startOfUTCISOWeekYear(date, dirtyOptions);
    var diff = Math.floor((date.getTime() - dateStartOfYear.getTime()) / MILLISECONDS_IN_DAY$3);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(isoYear, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    date = startOfUTCISOWeekYear(fourthOfJanuary, dirtyOptions);
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}

var MILLISECONDS_IN_MINUTE$6 = 60000;
function setTimeOfDay(hours, timeOfDay) {
    var isAM = timeOfDay === 0;
    if (isAM) {
        if (hours === 12) {
            return 0;
        }
    } else {
        if (hours !== 12) {
            return 12 + hours;
        }
    }
    return hours;
}

var units = {
    twoDigitYear: {
        priority: 10,
        set: function (dateValues, value) {
            var century = Math.floor(dateValues.date.getUTCFullYear() / 100);
            var year = century * 100 + value;
            dateValues.date.setUTCFullYear(year, 0, 1);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    year: {
        priority: 10,
        set: function (dateValues, value) {
            dateValues.date.setUTCFullYear(value, 0, 1);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    isoYear: {
        priority: 10,
        set: function (dateValues, value, options) {
            dateValues.date = startOfUTCISOWeekYear(setUTCISOWeekYear(dateValues.date, value, options), options);
            return dateValues;
        }
    },
    quarter: {
        priority: 20,
        set: function (dateValues, value) {
            dateValues.date.setUTCMonth((value - 1) * 3, 1);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    month: {
        priority: 30,
        set: function (dateValues, value) {
            dateValues.date.setUTCMonth(value, 1);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    isoWeek: {
        priority: 40,
        set: function (dateValues, value, options) {
            dateValues.date = startOfUTCISOWeek(setUTCISOWeek(dateValues.date, value, options), options);
            return dateValues;
        }
    },
    dayOfWeek: {
        priority: 50,
        set: function (dateValues, value, options) {
            dateValues.date = setUTCDay(dateValues.date, value, options);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    dayOfISOWeek: {
        priority: 50,
        set: function (dateValues, value, options) {
            dateValues.date = setUTCISODay(dateValues.date, value, options);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    dayOfMonth: {
        priority: 50,
        set: function (dateValues, value) {
            dateValues.date.setUTCDate(value);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    dayOfYear: {
        priority: 50,
        set: function (dateValues, value) {
            dateValues.date.setUTCMonth(0, value);
            dateValues.date.setUTCHours(0, 0, 0, 0);
            return dateValues;
        }
    },
    timeOfDay: {
        priority: 60,
        set: function (dateValues, value, options) {
            dateValues.timeOfDay = value;
            return dateValues;
        }
    },
    hours: {
        priority: 70,
        set: function (dateValues, value, options) {
            dateValues.date.setUTCHours(value, 0, 0, 0);
            return dateValues;
        }
    },
    timeOfDayHours: {
        priority: 70,
        set: function (dateValues, value, options) {
            var timeOfDay = dateValues.timeOfDay;
            if (timeOfDay != null) {
                value = setTimeOfDay(value, timeOfDay);
            }
            dateValues.date.setUTCHours(value, 0, 0, 0);
            return dateValues;
        }
    },
    minutes: {
        priority: 80,
        set: function (dateValues, value) {
            dateValues.date.setUTCMinutes(value, 0, 0);
            return dateValues;
        }
    },
    seconds: {
        priority: 90,
        set: function (dateValues, value) {
            dateValues.date.setUTCSeconds(value, 0);
            return dateValues;
        }
    },
    milliseconds: {
        priority: 100,
        set: function (dateValues, value) {
            dateValues.date.setUTCMilliseconds(value);
            return dateValues;
        }
    },
    timezone: {
        priority: 110,
        set: function (dateValues, value) {
            dateValues.date = new Date(dateValues.date.getTime() - value * MILLISECONDS_IN_MINUTE$6);
            return dateValues;
        }
    },
    timestamp: {
        priority: 120,
        set: function (dateValues, value) {
            dateValues.date = new Date(value);
            return dateValues;
        }
    }
};

var TIMEZONE_UNIT_PRIORITY = 110;
var MILLISECONDS_IN_MINUTE$7 = 60000;
var longFormattingTokensRegExp$1 = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultParsingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;
function parse(dirtyDateString, dirtyFormatString, dirtyBaseDate, dirtyOptions) {
    if (arguments.length < 3) {
        throw new TypeError('3 arguments required, but only ' + arguments.length + ' present');
    }
    var dateString = String(dirtyDateString);
    var options = dirtyOptions || {};
    var weekStartsOn = options.weekStartsOn === undefined ? 0 : Number(options.weekStartsOn);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }
    var locale = options.locale || locale$1;
    var localeParsers = locale.parsers || {};
    var localeUnits = locale.units || {};
    if (!locale.match) {
        throw new RangeError('locale must contain match property');
    }
    if (!locale.formatLong) {
        throw new RangeError('locale must contain formatLong property');
    }
    var formatString = String(dirtyFormatString).replace(longFormattingTokensRegExp$1, function (substring) {
        if (substring[0] === '[') {
            return substring;
        }
        if (substring[0] === '\\') {
            return cleanEscapedString$1(substring);
        }
        return locale.formatLong(substring);
    });
    if (formatString === '') {
        if (dateString === '') {
            return toDate(dirtyBaseDate, options);
        } else {
            return new Date(NaN);
        }
    }
    var subFnOptions = cloneObject(options);
    subFnOptions.locale = locale;
    var tokens = formatString.match(locale.parsingTokensRegExp || defaultParsingTokensRegExp);
    var tokensLength = tokens.length;
    var setters = [{
        priority: TIMEZONE_UNIT_PRIORITY,
        set: dateToSystemTimezone,
        index: 0
    }];
    var i;
    for (i = 0; i < tokensLength; i++) {
        var token = tokens[i];
        var parser = localeParsers[token] || parsers[token];
        if (parser) {
            var matchResult;
            if (parser.match instanceof RegExp) {
                matchResult = parser.match.exec(dateString);
            } else {
                matchResult = parser.match(dateString, subFnOptions);
            }
            if (!matchResult) {
                return new Date(NaN);
            }
            var unitName = parser.unit;
            var unit = localeUnits[unitName] || units[unitName];
            setters.push({
                priority: unit.priority,
                set: unit.set,
                value: parser.parse(matchResult, subFnOptions),
                index: setters.length
            });
            var substring = matchResult[0];
            dateString = dateString.slice(substring.length);
        } else {
            var head = tokens[i].match(/^\[.*]$/) ? tokens[i].replace(/^\[|]$/g, '') : tokens[i];
            if (dateString.indexOf(head) === 0) {
                dateString = dateString.slice(head.length);
            } else {
                return new Date(NaN);
            }
        }
    }
    var uniquePrioritySetters = setters.map(function (setter) {
        return setter.priority;
    }).sort(function (a, b) {
        return a - b;
    }).filter(function (priority, index, array) {
        return array.indexOf(priority) === index;
    }).map(function (priority) {
        return setters.filter(function (setter) {
            return setter.priority === priority;
        }).reverse();
    }).map(function (setterArray) {
        return setterArray[0];
    });
    var date = toDate(dirtyBaseDate, options);
    if (isNaN(date)) {
        return new Date(NaN);
    }
    var utcDate = subMinutes(date, date.getTimezoneOffset());
    var dateValues = {
        date: utcDate
    };
    var settersLength = uniquePrioritySetters.length;
    for (i = 0; i < settersLength; i++) {
        var setter = uniquePrioritySetters[i];
        dateValues = setter.set(dateValues, setter.value, subFnOptions);
    }
    return dateValues.date;
}

function dateToSystemTimezone(dateValues) {
    var date = dateValues.date;
    var time = date.getTime();
    var offset = date.getTimezoneOffset();
    offset = new Date(time + offset * MILLISECONDS_IN_MINUTE$7).getTimezoneOffset();
    dateValues.date = new Date(time + offset * MILLISECONDS_IN_MINUTE$7);
    return dateValues;
}

function cleanEscapedString$1(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function parseDate$1(date, format$$1) {
    if (typeof date !== 'string') {
        return isValid(date) ? date : null;
    }
    var parsed = parse(date, format$$1, new Date());
    if (!isValid(parsed) || format(parsed, format$$1) !== date) {
        return null;
    }
    return parsed;
}

function after (value, ref) {
    var otherValue = ref[0];
    var inclusion = ref[1];
    var format$$1 = ref[2];

    if (typeof format$$1 === 'undefined') {
        format$$1 = inclusion;
        inclusion = false;
    }
    value = parseDate$1(value, format$$1);
    otherValue = parseDate$1(otherValue, format$$1);
    if (!value || !otherValue) {
        return false;
    }
    return isAfter(value, otherValue) || inclusion && isEqual$1(value, otherValue);
}

var alpha = {
    en: /^[A-Z]*$/i,
    cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
    da: /^[A-ZÆØÅ]*$/i,
    de: /^[A-ZÄÖÜß]*$/i,
    es: /^[A-ZÁÉÍÑÓÚÜ]*$/i,
    fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[А-ЯЁ]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[A-ZČĆŽŠĐ]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};
var alphaSpaces = {
    en: /^[A-Z\s]*$/i,
    cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,
    da: /^[A-ZÆØÅ\s]*$/i,
    de: /^[A-ZÄÖÜß\s]*$/i,
    es: /^[A-ZÁÉÍÑÓÚÜ\s]*$/i,
    fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,
    lt: /^[A-ZĄČĘĖĮŠŲŪŽ\s]*$/i,
    nl: /^[A-ZÉËÏÓÖÜ\s]*$/i,
    hu: /^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,
    pl: /^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,
    pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,
    ru: /^[А-ЯЁ\s]*$/i,
    sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ\s]*$/i,
    sr: /^[A-ZČĆŽŠĐ\s]*$/i,
    tr: /^[A-ZÇĞİıÖŞÜ\s]*$/i,
    uk: /^[А-ЩЬЮЯЄІЇҐ\s]*$/i,
    ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/
};
var alphanumeric = {
    en: /^[0-9A-Z]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
    da: /^[0-9A-ZÆØÅ]$/i,
    de: /^[0-9A-ZÄÖÜß]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
    ru: /^[0-9А-ЯЁ]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};
var alphaDash = {
    en: /^[0-9A-Z_-]*$/i,
    cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,
    da: /^[0-9A-ZÆØÅ_-]*$/i,
    de: /^[0-9A-ZÄÖÜß_-]*$/i,
    es: /^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,
    fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,
    lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ_-]*$/i,
    nl: /^[0-9A-ZÉËÏÓÖÜ_-]*$/i,
    hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,
    pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,
    pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,
    ru: /^[0-9А-ЯЁ_-]*$/i,
    sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ_-]*$/i,
    sr: /^[0-9A-ZČĆŽŠĐ_-]*$/i,
    tr: /^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,
    uk: /^[0-9А-ЩЬЮЯЄІЇҐ_-]*$/i,
    ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/
};

var validate = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate(val, [locale]); });
    }
    if (!locale) {
        return Object.keys(alpha).some(function (loc) { return alpha[loc].test(value); });
    }
    return (alpha[locale] || alpha.en).test(value);
};

var validate$1 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$1(val, [locale]); });
    }
    if (!locale) {
        return Object.keys(alphaDash).some(function (loc) { return alphaDash[loc].test(value); });
    }
    return (alphaDash[locale] || alphaDash.en).test(value);
};

var validate$2 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$2(val, [locale]); });
    }
    if (!locale) {
        return Object.keys(alphanumeric).some(function (loc) { return alphanumeric[loc].test(value); });
    }
    return (alphanumeric[locale] || alphanumeric.en).test(value);
};

var validate$3 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var locale = ref[0]; if ( locale === void 0 ) locale = null;

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$3(val, [locale]); });
    }
    if (!locale) {
        return Object.keys(alphaSpaces).some(function (loc) { return alphaSpaces[loc].test(value); });
    }
    return (alphaSpaces[locale] || alphaSpaces.en).test(value);
};

function before (value, ref) {
    var otherValue = ref[0];
    var inclusion = ref[1];
    var format$$1 = ref[2];

    if (typeof format$$1 === 'undefined') {
        format$$1 = inclusion;
        inclusion = false;
    }
    value = parseDate$1(value, format$$1);
    otherValue = parseDate$1(otherValue, format$$1);
    if (!value || !otherValue) {
        return false;
    }
    return isBefore(value, otherValue) || inclusion && isEqual$1(value, otherValue);
}

var validate$4 = function (value, ref) {
    var min = ref[0];
    var max = ref[1];

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$4(val, [min,max]); });
    }
    return Number(min) <= value && Number(max) >= value;
};

function confirmed (value, other) { return String(value) === String(other); }

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var assertString_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = assertString;
    function assertString(input) {
        var isString = typeof input === 'string' || input instanceof String;
        if (!isString) {
            throw new TypeError('This library (validator.js) validates strings only');
        }
    }
    
    module.exports = exports['default'];
});
var assertString = unwrapExports(assertString_1)

var assertString$1 = /*#__PURE__*/Object.freeze({
  default: assertString,
  __moduleExports: assertString_1
});

var _assertString = ( assertString$1 && assertString ) || assertString$1;

var isCreditCard_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isCreditCard;
    var _assertString2 = _interopRequireDefault(_assertString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;
    function isCreditCard(str) {
        (0, _assertString2.default)(str);
        var sanitized = str.replace(/[- ]+/g, '');
        if (!creditCard.test(sanitized)) {
            return false;
        }
        var sum = 0;
        var digit = void 0;
        var tmpNum = void 0;
        var shouldDouble = void 0;
        for (var i = sanitized.length - 1;i >= 0; i--) {
            digit = sanitized.substring(i, i + 1);
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += tmpNum % 10 + 1;
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        return !(!(sum % 10 === 0 ? sanitized : false));
    }
    
    module.exports = exports['default'];
});
var isCreditCard = unwrapExports(isCreditCard_1)

function credit_card (value) { return isCreditCard(String(value)); }

var validate$5 = function (value, ref) {
    if ( ref === void 0 ) ref = [];
    var decimals = ref[0]; if ( decimals === void 0 ) decimals = '*';
    var separator = ref[1]; if ( separator === void 0 ) separator = '.';

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$5(val, [decimals,separator]); });
    }
    if (value === null || value === undefined || value === '') {
        return true;
    }
    if (Number(decimals) === 0) {
        return /^-?\d*$/.test(value);
    }
    var regexPart = decimals === '*' ? '+' : ("{1," + decimals + "}");
    var regex = new RegExp(("^-?\\d*(\\" + separator + "\\d" + regexPart + ")?$"));
    if (!regex.test(value)) {
        return false;
    }
    var parsedValue = parseFloat(value);
    return parsedValue === parsedValue;
};

function date_between (value, params) {
    var assign, assign$1;

    var min$$1;
    var max$$1;
    var format$$1;
    var inclusivity = '()';
    if (params.length > 3) {
        (assign = params, min$$1 = assign[0], max$$1 = assign[1], inclusivity = assign[2], format$$1 = assign[3]);
    } else {
        (assign$1 = params, min$$1 = assign$1[0], max$$1 = assign$1[1], format$$1 = assign$1[2]);
    }
    var minDate = parseDate$1(String(min$$1), format$$1);
    var maxDate = parseDate$1(String(max$$1), format$$1);
    var dateVal = parseDate$1(String(value), format$$1);
    if (!minDate || !maxDate || !dateVal) {
        return false;
    }
    if (inclusivity === '()') {
        return isAfter(dateVal, minDate) && isBefore(dateVal, maxDate);
    }
    if (inclusivity === '(]') {
        return isAfter(dateVal, minDate) && (isEqual$1(dateVal, maxDate) || isBefore(dateVal, maxDate));
    }
    if (inclusivity === '[)') {
        return isBefore(dateVal, maxDate) && (isEqual$1(dateVal, minDate) || isAfter(dateVal, minDate));
    }
    return isEqual$1(dateVal, maxDate) || isEqual$1(dateVal, minDate) || isBefore(dateVal, maxDate) && isAfter(dateVal, minDate);
}

function date_format (value, ref) {
	var format = ref[0];

	return !(!parseDate$1(value, format));
}

var validate$6 = function (value, ref) {
    var length = ref[0];

    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$6(val, [length]); });
    }
    var strVal = String(value);
    return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};

var validateImage = function (file, width, height) {
    var URL = window.URL || window.webkitURL;
    return new Promise(function (resolve) {
        var image = new Image();
        image.onerror = (function () { return resolve({
            valid: false
        }); });
        image.onload = (function () { return resolve({
            valid: image.width === Number(width) && image.height === Number(height)
        }); });
        image.src = URL.createObjectURL(file);
    });
};
function dimensions (files, ref) {
    var width = ref[0];
    var height = ref[1];

    var list = [];
    for (var i = 0;i < files.length; i++) {
        if (!/\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
            return false;
        }
        list.push(files[i]);
    }
    return Promise.all(list.map(function (file) { return validateImage(file, width, height); }));
}

var merge_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = merge;
    function merge() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var defaults = arguments[1];
        for (var key in defaults) {
            if (typeof obj[key] === 'undefined') {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }
    
    module.exports = exports['default'];
});
var merge$1 = unwrapExports(merge_1)

var merge$2 = /*#__PURE__*/Object.freeze({
  default: merge$1,
  __moduleExports: merge_1
});

var isByteLength_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    exports.default = isByteLength;
    var _assertString2 = _interopRequireDefault(_assertString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    function isByteLength(str, options) {
        (0, _assertString2.default)(str);
        var min = void 0;
        var max = void 0;
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            min = options.min || 0;
            max = options.max;
        } else {
            min = arguments[1];
            max = arguments[2];
        }
        var len = encodeURI(str).split(/%..|./).length - 1;
        return len >= min && (typeof max === 'undefined' || len <= max);
    }
    
    module.exports = exports['default'];
});
var isByteLength = unwrapExports(isByteLength_1)

var isByteLength$1 = /*#__PURE__*/Object.freeze({
  default: isByteLength,
  __moduleExports: isByteLength_1
});

var _merge = ( merge$2 && merge$1 ) || merge$2;

var isFQDN_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isFQDN;
    var _assertString2 = _interopRequireDefault(_assertString);
    var _merge2 = _interopRequireDefault(_merge);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    var default_fqdn_options = {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false
    };
    function isFQDN(str, options) {
        (0, _assertString2.default)(str);
        options = (0, _merge2.default)(options, default_fqdn_options);
        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
            str = str.substring(0, str.length - 1);
        }
        var parts = str.split('.');
        if (options.require_tld) {
            var tld = parts.pop();
            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
            }
            if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
                return false;
            }
        }
        for (var part, i = 0;i < parts.length; i++) {
            part = parts[i];
            if (options.allow_underscores) {
                part = part.replace(/_/g, '');
            }
            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
            }
            if (/[\uff01-\uff5e]/.test(part)) {
                return false;
            }
            if (part[0] === '-' || part[part.length - 1] === '-') {
                return false;
            }
        }
        return true;
    }
    
    module.exports = exports['default'];
});
var isFQDN = unwrapExports(isFQDN_1)

var isFQDN$1 = /*#__PURE__*/Object.freeze({
  default: isFQDN,
  __moduleExports: isFQDN_1
});

var _isByteLength = ( isByteLength$1 && isByteLength ) || isByteLength$1;

var _isFQDN = ( isFQDN$1 && isFQDN ) || isFQDN$1;

var isEmail_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isEmail;
    var _assertString2 = _interopRequireDefault(_assertString);
    var _merge2 = _interopRequireDefault(_merge);
    var _isByteLength2 = _interopRequireDefault(_isByteLength);
    var _isFQDN2 = _interopRequireDefault(_isFQDN);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    var default_email_options = {
        allow_display_name: false,
        require_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true
    };
    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    function isEmail(str, options) {
        (0, _assertString2.default)(str);
        options = (0, _merge2.default)(options, default_email_options);
        if (options.require_display_name || options.allow_display_name) {
            var display_email = str.match(displayName);
            if (display_email) {
                str = display_email[1];
            } else if (options.require_display_name) {
                return false;
            }
        }
        var parts = str.split('@');
        var domain = parts.pop();
        var user = parts.join('@');
        var lower_domain = domain.toLowerCase();
        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
            user = user.replace(/\./g, '').toLowerCase();
        }
        if (!(0, _isByteLength2.default)(user, {
            max: 64
        }) || !(0, _isByteLength2.default)(domain, {
            max: 254
        })) {
            return false;
        }
        if (!(0, _isFQDN2.default)(domain, {
            require_tld: options.require_tld
        })) {
            return false;
        }
        if (user[0] === '"') {
            user = user.slice(1, user.length - 1);
            return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
        }
        var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
        var user_parts = user.split('.');
        for (var i = 0;i < user_parts.length; i++) {
            if (!pattern.test(user_parts[i])) {
                return false;
            }
        }
        return true;
    }
    
    module.exports = exports['default'];
});
var isEmail = unwrapExports(isEmail_1)

var validate$7 = function (value) {
    if (Array.isArray(value)) {
        return value.every(function (val) { return isEmail(String(val)); });
    }
    return isEmail(String(value));
};

function ext (files, extensions) {
    var regex = new RegExp((".(" + (extensions.join('|')) + ")$"), 'i');
    return files.every(function (file) { return regex.test(file.name); });
}

function image (files) { return files.every(function (file) { return /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name); }); }

var validate$8 = function (value, options) {
    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$8(val, options); });
    }
    return !(!options.filter(function (option) { return option == value; }).length);
};

var isIP_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isIP;
    var _assertString2 = _interopRequireDefault(_assertString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    var ipv6Block = /^[0-9A-F]{1,4}$/i;
    function isIP(str) {
        var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        (0, _assertString2.default)(str);
        version = String(version);
        if (!version) {
            return isIP(str, 4) || isIP(str, 6);
        } else if (version === '4') {
            if (!ipv4Maybe.test(str)) {
                return false;
            }
            var parts = str.split('.').sort(function (a, b) {
                return a - b;
            });
            return parts[3] <= 255;
        } else if (version === '6') {
            var blocks = str.split(':');
            var foundOmissionBlock = false;
            var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
            if (blocks.length > expectedNumberOfBlocks) {
                return false;
            }
            if (str === '::') {
                return true;
            } else if (str.substr(0, 2) === '::') {
                blocks.shift();
                blocks.shift();
                foundOmissionBlock = true;
            } else if (str.substr(str.length - 2) === '::') {
                blocks.pop();
                blocks.pop();
                foundOmissionBlock = true;
            }
            for (var i = 0;i < blocks.length; ++i) {
                if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
                    if (foundOmissionBlock) {
                        return false;
                    }
                    foundOmissionBlock = true;
                } else if (foundIPv4TransitionBlock && i === blocks.length - 1) ; else if (!ipv6Block.test(blocks[i])) {
                    return false;
                }
            }
            if (foundOmissionBlock) {
                return blocks.length >= 1;
            }
            return blocks.length === expectedNumberOfBlocks;
        }
        return false;
    }
    
    module.exports = exports['default'];
});
var isIP = unwrapExports(isIP_1)

function ip (value, ref) {
    if ( ref === void 0 ) ref = [];
    var version = ref[0]; if ( version === void 0 ) version = 4;

    if (isNullOrUndefined(value)) {
        value = '';
    }
    if (Array.isArray(value)) {
        return value.every(function (val) { return isIP(val, version); });
    }
    return isIP(value, version);
}

function is (value, ref) {
	if ( ref === void 0 ) ref = [];
	var other = ref[0];

	return value === other;
}

function is_not (value, ref) {
	if ( ref === void 0 ) ref = [];
	var other = ref[0];

	return value !== other;
}

var compare = function (value, length, max) {
    if (max === undefined) {
        return value.length === length;
    }
    max = Number(max);
    return value.length >= length && value.length <= max;
};
function length (value, ref) {
    var length = ref[0];
    var max = ref[1]; if ( max === void 0 ) max = undefined;

    length = Number(length);
    if (value === undefined || value === null) {
        return false;
    }
    if (typeof value === 'number') {
        value = String(value);
    }
    if (!value.length) {
        value = toArray(value);
    }
    return compare(value, length, max);
}

function integer (value) {
    if (Array.isArray(value)) {
        return value.every(function (val) { return /^-?[0-9]+$/.test(String(val)); });
    }
    return /^-?[0-9]+$/.test(String(value));
}

function max$1 (value, ref) {
    var length = ref[0];

    if (value === undefined || value === null) {
        return length >= 0;
    }
    return String(value).length <= length;
}

function max_value (value, ref) {
    var max = ref[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
        return false;
    }
    return Number(value) <= max;
}

function mimes (files, mimes) {
    var regex = new RegExp(((mimes.join('|').replace('*', '.+')) + "$"), 'i');
    return files.every(function (file) { return regex.test(file.type); });
}

function min$1 (value, ref) {
    var length = ref[0];

    if (value === undefined || value === null) {
        return false;
    }
    return String(value).length >= length;
}

function min_value (value, ref) {
    var min = ref[0];

    if (Array.isArray(value) || value === null || value === undefined || value === '') {
        return false;
    }
    return Number(value) >= min;
}

var validate$9 = function (value, options) {
    if (Array.isArray(value)) {
        return value.every(function (val) { return validate$9(val, options); });
    }
    return !options.filter(function (option) { return option == value; }).length;
};

function numeric (value) {
    if (Array.isArray(value)) {
        return value.every(function (val) { return /^[0-9]+$/.test(String(val)); });
    }
    return /^[0-9]+$/.test(String(value));
}

function regex (value, ref) {
    var regex = ref[0];
    var flags = ref.slice(1);

    if (regex instanceof RegExp) {
        return regex.test(value);
    }
    return new RegExp(regex, flags).test(String(value));
}

function required (value, ref) {
    if ( ref === void 0 ) ref = [];
    var invalidateFalse = ref[0]; if ( invalidateFalse === void 0 ) invalidateFalse = false;

    if (Array.isArray(value)) {
        return !(!value.length);
    }
    if (value === false && invalidateFalse) {
        return false;
    }
    if (value === undefined || value === null) {
        return false;
    }
    return !(!String(value).trim().length);
}

function size (files, ref) {
    var size = ref[0];

    if (isNaN(size)) {
        return false;
    }
    var nSize = Number(size) * 1024;
    for (var i = 0;i < files.length; i++) {
        if (files[i].size > nSize) {
            return false;
        }
    }
    return true;
}

var isURL_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isURL;
    var _assertString2 = _interopRequireDefault(_assertString);
    var _isFQDN2 = _interopRequireDefault(_isFQDN);
    var _isIP2 = _interopRequireDefault(isIP_1);
    var _merge2 = _interopRequireDefault(_merge);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    
    var default_url_options = {
        protocols: ['http','https','ftp'],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false
    };
    var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
    function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    }
    
    function checkHost(host, matches) {
        for (var i = 0;i < matches.length; i++) {
            var match = matches[i];
            if (host === match || isRegExp(match) && match.test(host)) {
                return true;
            }
        }
        return false;
    }
    
    function isURL(url, options) {
        (0, _assertString2.default)(url);
        if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
            return false;
        }
        if (url.indexOf('mailto:') === 0) {
            return false;
        }
        options = (0, _merge2.default)(options, default_url_options);
        var protocol = void 0, auth = void 0, host = void 0, hostname = void 0, port = void 0, port_str = void 0, split = void 0, ipv6 = void 0;
        split = url.split('#');
        url = split.shift();
        split = url.split('?');
        url = split.shift();
        split = url.split('://');
        if (split.length > 1) {
            protocol = split.shift();
            if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
                return false;
            }
        } else if (options.require_protocol) {
            return false;
        } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
            split[0] = url.substr(2);
        }
        url = split.join('://');
        if (url === '') {
            return false;
        }
        split = url.split('/');
        url = split.shift();
        if (url === '' && !options.require_host) {
            return true;
        }
        split = url.split('@');
        if (split.length > 1) {
            auth = split.shift();
            if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
                return false;
            }
        }
        hostname = split.join('@');
        port_str = null;
        ipv6 = null;
        var ipv6_match = hostname.match(wrapped_ipv6);
        if (ipv6_match) {
            host = '';
            ipv6 = ipv6_match[1];
            port_str = ipv6_match[2] || null;
        } else {
            split = hostname.split(':');
            host = split.shift();
            if (split.length) {
                port_str = split.join(':');
            }
        }
        if (port_str !== null) {
            port = parseInt(port_str, 10);
            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
            }
        }
        if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
            return false;
        }
        host = host || ipv6;
        if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
            return false;
        }
        if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
            return false;
        }
        return true;
    }
    
    module.exports = exports['default'];
});
var isURL = unwrapExports(isURL_1)

function url (value, ref) {
    if ( ref === void 0 ) ref = [];
    var requireProtocol = ref[0]; if ( requireProtocol === void 0 ) requireProtocol = false;

    var options = {
        require_protocol: !(!requireProtocol),
        allow_underscores: true
    };
    if (isNullOrUndefined(value)) {
        value = '';
    }
    if (Array.isArray(value)) {
        return value.every(function (val) { return isURL(val, options); });
    }
    return isURL(value, options);
}

var Rules = {
    after: after,
    alpha_dash: validate$1,
    alpha_num: validate$2,
    alpha_spaces: validate$3,
    alpha: validate,
    before: before,
    between: validate$4,
    confirmed: confirmed,
    credit_card: credit_card,
    date_between: date_between,
    date_format: date_format,
    decimal: validate$5,
    digits: validate$6,
    dimensions: dimensions,
    email: validate$7,
    ext: ext,
    image: image,
    in: validate$8,
    integer: integer,
    length: length,
    ip: ip,
    is_not: is_not,
    is: is,
    max: max$1,
    max_value: max_value,
    mimes: mimes,
    min: min$1,
    min_value: min_value,
    not_in: validate$9,
    numeric: numeric,
    regex: regex,
    required: required,
    size: size,
    url: url
}

var normalize = function (fields) {
    if (Array.isArray(fields)) {
        return fields.reduce(function (prev, curr) {
            if (~curr.indexOf('.')) {
                prev[curr.split('.')[1]] = curr;
            } else {
                prev[curr] = curr;
            }
            return prev;
        }, {});
    }
    return fields;
};
var combine = function (lhs, rhs) {
    var mapper = {
        pristine: function (lhs, rhs) { return lhs && rhs; },
        dirty: function (lhs, rhs) { return lhs || rhs; },
        touched: function (lhs, rhs) { return lhs || rhs; },
        untouched: function (lhs, rhs) { return lhs && rhs; },
        valid: function (lhs, rhs) { return lhs && rhs; },
        invalid: function (lhs, rhs) { return lhs || rhs; },
        pending: function (lhs, rhs) { return lhs || rhs; },
        required: function (lhs, rhs) { return lhs || rhs; },
        validated: function (lhs, rhs) { return lhs && rhs; }
    };
    return Object.keys(mapper).reduce(function (flags, flag) {
        flags[flag] = mapper[flag](lhs[flag], rhs[flag]);
        return flags;
    }, {});
};
var mapScope = function (scope, deep) {
    if ( deep === void 0 ) deep = true;

    return Object.keys(scope).reduce(function (flags, field) {
    if (!flags) {
        flags = assign({}, scope[field]);
        return flags;
    }
    var isScope = field.indexOf('$') === 0;
    if (deep && isScope) {
        return combine(mapScope(scope[field]), flags);
    } else if (!deep && isScope) {
        return flags;
    }
    flags = combine(flags, scope[field]);
    return flags;
}, null);
};
var mapFields = function (fields) {
    if (!fields) {
        return function () {
            return mapScope(this.$validator.flags);
        };
    }
    var normalized = normalize(fields);
    return Object.keys(normalized).reduce(function (prev, curr) {
        var field = normalized[curr];
        prev[curr] = function mappedField() {
            if (this.$validator.flags[field]) {
                return this.$validator.flags[field];
            }
            if (normalized[curr] === '*') {
                return mapScope(this.$validator.flags, false);
            }
            var index = field.indexOf('.');
            if (index <= 0) {
                return {};
            }
            var ref = field.split('.');
            var scope = ref[0];
            var name = ref.slice(1);
            scope = this.$validator.flags[("$" + scope)];
            name = name.join('.');
            if (name === '*' && scope) {
                return mapScope(scope);
            }
            if (scope && scope[name]) {
                return scope[name];
            }
            return {};
        };
        return prev;
    }, {});
};

var ErrorComponent = {
    name: 'vv-error',
    inject: ['$validator'],
    functional: true,
    props: {
        for: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'span'
        }
    },
    render: function render(createElement, ref) {
        var props = ref.props;
        var injections = ref.injections;

        return createElement(props.tag, injections.$validator.errors.first(props.for));
    }
};

var version = '2.0.9';
var rulesPlugin = function (ref) {
    var Validator$$1 = ref.Validator;

    Object.keys(Rules).forEach(function (rule) {
        Validator$$1.extend(rule, Rules[rule]);
    });
    Validator$$1.localize('en', locale);
};
use(rulesPlugin);
var index_esm = {
    install: install,
    use: use,
    directive: directive,
    mixin: mixin,
    mapFields: mapFields,
    Validator: Validator,
    ErrorBag: ErrorBag,
    ErrorComponent: ErrorComponent,
    Rules: Rules,
    version: version
}

/* harmony default export */ __webpack_exports__["a"] = (index_esm);



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Url */
/* unused harmony export Http */
/* unused harmony export Resource */
/*!
 * vue-resource v1.5.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = Promise$1.prototype;

p.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p$1 = PromiseObj.prototype;

p$1.bind = function (context) {
    this.context = context;
    return this;
};

p$1.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p$1.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p$1.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return Promise.reject(reason);
    }
    );
};

/**
 * Utility functions.
 */

var ref = {};
var hasOwnProperty = ref.hasOwnProperty;
var ref$1 = [];
var slice = ref$1.slice;
var debug = false, ntick;

var inBrowser = typeof window !== 'undefined';

function Util (ref) {
    var config = ref.config;
    var nextTick = ref.nextTick;

    ntick = nextTick;
    debug = config.debug || !config.silent;
}

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function trimEnd(str, chars) {

    if (str && chars === undefined) {
        return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
        return str;
    }

    return str.replace(new RegExp(("[" + chars + "]+$")), '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

function root (options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !/^(https?:)?\//.test(url)) {
        url = trimEnd(options$$1.root, '/') + '/' + url;
    }

    return url;
}

/**
 * Query Parameter Transform.
 */

function query (options$$1, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url), expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^{}]+)\}|([^{}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null, values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }

                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key], result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

function template (options) {

    var variables = [], url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {}, options$$1 = url, transform;

    if (isString(url)) {
        options$$1 = {url: url, params: params};
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {

        if (isString(handler)) {
            handler = Url.transform[handler];
        }

        if (isFunction(handler)) {
            transform = factory(handler, transform, self.$vm);
        }

    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transform = {template: template, query: query, root: root};
Url.transforms = ['template', 'query', 'root'];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

function xdrClient (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(), handler = function (ref) {
                var type = ref.type;


                var status = 0;

                if (type === 'load') {
                    status = 200;
                } else if (type === 'error') {
                    status = 500;
                }

                resolve(request.respondWith(xdr.responseText, {status: status}));
            };

        request.abort = function () { return xdr.abort(); };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
}

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

function cors (request) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

}

/**
 * Form data Interceptor.
 */

function form (request) {

    if (isFormData(request.body)) {
        request.headers.delete('Content-Type');
    } else if (isObject(request.body) && request.emulateJSON) {
        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

}

/**
 * JSON Interceptor.
 */

function json (request) {

    var type = request.headers.get('Content-Type') || '';

    if (isObject(request.body) && type.indexOf('application/json') === 0) {
        request.body = JSON.stringify(request.body);
    }

    return function (response) {

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    };
}

function isJson(str) {

    var start = str.match(/^\s*(\[|\{)/);
    var end = {'[': /]\s*$/, '{': /}\s*$/};

    return start && end[start[1]].test(str);
}

/**
 * JSONP client (Browser).
 */

function jsonpClient (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, {status: status}));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({type: 'abort'});
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

/**
 * JSONP Interceptor.
 */

function jsonp (request) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

}

/**
 * Before Interceptor.
 */

function before (request) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

}

/**
 * HTTP method override Interceptor.
 */

function method (request) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

}

/**
 * Header Interceptor.
 */

function header (request) {

    var headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[toLower(request.method)]
    );

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

}

/**
 * XMLHttp client (Browser).
 */

function xhrClient (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(), handler = function (event) {

                var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
                });

                each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                    response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
                });

                resolve(response);
            };

        request.abort = function () { return xhr.abort(); };

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.responseType && 'responseType' in xhr) {
            xhr.responseType = request.responseType;
        }

        if (request.withCredentials || request.credentials) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        // deprecated use downloadProgress
        if (isFunction(request.progress) && request.method === 'GET') {
            xhr.addEventListener('progress', request.progress);
        }

        if (isFunction(request.downloadProgress)) {
            xhr.addEventListener('progress', request.downloadProgress);
        }

        // deprecated use uploadProgress
        if (isFunction(request.progress) && /^(POST|PUT)$/i.test(request.method)) {
            xhr.upload.addEventListener('progress', request.progress);
        }

        if (isFunction(request.uploadProgress) && xhr.upload) {
            xhr.upload.addEventListener('progress', request.uploadProgress);
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
}

/**
 * Http client (Node).
 */

function nodeClient (request) {

    var client = __webpack_require__(38);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

            var response = request.respondWith(resp.body, {
                status: resp.statusCode,
                statusText: trim(resp.statusMessage)
            });

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);

        }, function (error$$1) { return handler(error$$1.response); });
    });
}

/**
 * Base client.
 */

function Client (context) {

    var reqHandlers = [sendRequest], resHandlers = [];

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        while (reqHandlers.length) {

            var handler = reqHandlers.pop();

            if (isFunction(handler)) {

                var response = (void 0), next = (void 0);

                response = handler.call(context, request, function (val) { return next = val; }) || next;

                if (isObject(response)) {
                    return new PromiseObj(function (resolve, reject) {

                        resHandlers.forEach(function (handler) {
                            response = when(response, function (response) {
                                return handler.call(context, response) || response;
                            }, reject);
                        });

                        when(response, resolve, reject);

                    }, context);
                }

                if (isFunction(response)) {
                    resHandlers.unshift(response);
                }

            } else {
                warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
            }
        }
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    return client(request);
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;


    this.map = {};

    each(headers, function (value, name) { return this$1.append(name, value); });
};

Headers.prototype.has = function has (name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get (name) {

    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function getAll (name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set (name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append (name, value) {

    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1 (name) {
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll () {
    this.map = {};
};

Headers.prototype.forEach = function forEach (callback, thisArg) {
        var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;


    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;

    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob () {
    return when(this.bodyBlob);
};

Response.prototype.text = function text () {
    return when(this.bodyText);
};

Response.prototype.json = function json () {
    return when(this.text(), function (text) { return JSON.parse(text); });
};

Object.defineProperty(Response.prototype, 'data', {

    get: function get() {
        return this.body;
    },

    set: function set(body) {
        this.body = body;
    }

});

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl () {
    return Url(this);
};

Request.prototype.getBody = function getBody () {
    return this.body;
};

Request.prototype.respondWith = function respondWith (body, options$$1) {
    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

function Http(options$$1) {

    var self = this || {}, client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {

        if (isString(handler)) {
            handler = Http.interceptor[handler];
        }

        if (isFunction(handler)) {
            client.use(handler);
        }

    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);

    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptor = {before: before, method: method, jsonp: jsonp, json: json, form: form, header: header, cors: cors};
Http.interceptors = ['before', 'method', 'jsonp', 'json', 'form', 'header', 'cors'];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body}));
    };

});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, function (action, name) {

        action = merge({url: url, params: assign({}, params)}, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action), params = {}, body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) { return new Vue.Promise(executor, this$1); };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["a"] = (plugin);



/***/ }),
/* 38 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(10)
/* script */
var __vue_script__ = __webpack_require__(40)
/* template */
var __vue_template__ = __webpack_require__(41)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Slider.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dba9550", Component.options)
  } else {
    hotAPI.reload("data-v-2dba9550", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "slider",
    data: function data() {
        return {
            currentIndex: 0, //This is the number of the current slide.
            uniqueKey: 0, //Unique key used to prevent re-rendering.
            slides: [], //This is slides array, it will only ever contain two images
            slideTimeout: null, //The ID of the slide timeout, assigned by the setTimeout method.
            slideSpeed: 3000, //Automatic slide speed in ms.
            slideDuration: 1000, //CSS transition speed in ms.
            images: ["/img/slider/01.jpg", "/img/slider/02.jpg", "/img/slider/03.jpg", "/img/slider/04.jpg"] //Array containing all of the slider images.
        };
    },
    mounted: function mounted() {
        //Add the first image to the beginning of the slides array.
        this.slides.unshift({
            image: this.images[0],
            key: this.uniqueKey
        });
        this.startSlideTimeout();
    },

    methods: {
        previousSlide: function previousSlide() {
            this.activateSlide(-1);
        },
        nextSlide: function nextSlide() {
            this.activateSlide(1);
        },
        activateSlide: function activateSlide(offset) {
            //This removes the slide timer since we have loaded a new image.
            clearTimeout(this.slideTimeout);
            //Start a new slide timer since we have removed the last one.
            this.startSlideTimeout();

            var imageIndex = this.currentIndex + offset;

            //If the index of the next image is a negative number, go to the end. If the index of the next image is past the end, go back to the beginning.
            if (imageIndex < 0) {
                imageIndex = this.images.length - 1;
            } else if (imageIndex == this.images.length) {
                imageIndex = 0;
            }

            //Here we call the addSlide method to add the next image (based on the imageIndex) to the slides array.
            this.addSlide(this.images[imageIndex]);
            this.currentIndex = imageIndex;
        },
        addSlide: function addSlide(image) {
            var _this = this;

            this.uniqueKey++;
            //Add the next image to the beginning of the slides array.
            this.slides.unshift({
                image: image,
                key: this.uniqueKey
            });
            this.slides[1].fadeOut = true;
            //Remove the last image from the slides array after the transition duration (using the asynchronous setTimeout method) since we have added the next image.
            setTimeout(function () {
                _this.slides.pop();
            }, this.slideDuration);
        },
        startSlideTimeout: function startSlideTimeout() {
            var _this2 = this;

            //Assign the ID of the timer that is set by the asynchronous setTimeout method (which starts the slider by going to the next slide after the slide timer duration). We need this ID for the clearTimeout method so it knows which timer to remove.
            this.slideTimeout = setTimeout(function () {
                _this2.nextSlide();
            }, this.slideSpeed);
        }
    }
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "slides" }, [
    _c(
      "div",
      { staticClass: "slides" },
      _vm._l(_vm.slides, function(slide) {
        return _c("div", {
          key: slide.key,
          staticClass: "slide",
          class: { fadeOut: slide.fadeOut },
          style: { "background-image": "url(" + slide.image + ")" }
        })
      })
    ),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("a", {
      staticClass: "arrow arrow-prev",
      on: { click: _vm.previousSlide }
    }),
    _vm._v(" "),
    _c("a", { staticClass: "arrow arrow-next", on: { click: _vm.nextSlide } })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "center-intro" }, [
      _c("header", { staticClass: "centered" }, [
        _c("h1", { staticClass: "my-name" }, [_vm._v("Ken Studdy")]),
        _vm._v(" "),
        _c("p", { staticClass: "my-title" }, [
          _vm._v("Full Stack Web Developer")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "socia-icons" }, [
        _c(
          "a",
          {
            staticClass: "btn btn-round btn-clear btn-lin",
            attrs: {
              href: "https://www.linkedin.com/in/kenstuddy",
              target: "_blank"
            }
          },
          [_c("i", { staticClass: "fa my-fa-linkedin-square" })]
        ),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "btn btn-round btn-clear btn-github",
            attrs: { href: "https://github.com/kenstuddy", target: "_blank" }
          },
          [_c("i", { staticClass: "fa my-fa-github-square" })]
        )
      ]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "btn btn-contact contact-me",
          attrs: { href: "#page-contact" }
        },
        [_vm._v("Contact Me")]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2dba9550", module.exports)
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(10)
/* script */
var __vue_script__ = __webpack_require__(43)
/* template */
var __vue_template__ = __webpack_require__(44)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/Contact.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43b63039", Component.options)
  } else {
    hotAPI.reload("data-v-43b63039", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "contact",
    data: function data() {
        return {
            submitted: false, //This should be true if the form has been submitted (submit has been clicked). Setting this to true disables the form input, textarea, and button elements.
            email: "", //Email of person contacting me.
            name: "", //Name of person contacting me.
            success: "", //This is the success response message from the API.
            message: "", //Form message.
            form: true, //The form is visible when this is true because of v-show in the form tag.
            submitText: "Submit Message", //This is the text of the submit button.
            resetContactTime: 4000 //This is the time in ms to wait before resetting the contact form after sending a message.
        };
    },

    methods: {
        submitContact: function submitContact() {
            var _this = this;

            this.submitText = "Submitting Message...";
            this.submitted = true;
            //The then method returns a Promise that is handled by an arrow function.
            this.$validator.validateAll().then(function (response) {
                var data = {
                    "name": _this.name,
                    "email": _this.email,
                    "message": _this.message
                };
                //Send the HTTP POST API request to be handled by the Laravel ContactController send method. This also returns a Promise since it once again uses the then method.
                axios.post("/api/contact/send", data).then(function (response) {
                    _this.submitted = true;
                    _this.submitText = "Submitted Message.";
                    _this.success = response.data.message;
                    //Reset the form using the asynchronous setTimeout method, if we use parenthesis for the resetContact method it will immediately invoke the method instead of waiting the duration of resetContactTime, which is not what we want.
                    setTimeout(_this.resetContact, _this.resetContactTime);
                }).catch(function (error) {
                    _this.errors = error.response.data.errors;
                    _this.submitText = "Submit Message";
                    _this.submitted = false;
                });
            });
        },
        resetContact: function resetContact() {
            var _this2 = this;

            //We only want to reset the contact form if it has been submitted (in other words, not reset), otherwise we might reset it twice by accident (for example, automatically 4 seconds later after form submission when someone already submit and reset the form once and now might be entering another message).
            if (this.submitted) {
                this.name = "";
                this.email = "";
                this.message = "";
                //On the next tick, reset the validator so that no error messages occur from resetting the form. This still allows error messages to occur the following tick (when there are actually errors like invalid email).
                this.$nextTick(function () {
                    _this2.$validator.reset();
                });
                this.submitted = false;
                this.success = false;
                this.form = true;
                this.submitText = "Submit Message";
            }
        }
    }
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(1),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-7" }, [
        _c("h3", [_vm._v("Get in Touch")]),
        _vm._v(" "),
        _c(
          "form",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.form,
                expression: "form"
              }
            ],
            staticClass: "form-horizontal",
            attrs: { id: "contact_form" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.submitContact()
              }
            }
          },
          [
            _c("div", { staticClass: "control-group" }, [
              _c(
                "label",
                { staticClass: "control-label", attrs: { for: "name" } },
                [_vm._v("Name")]
              ),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.name,
                    expression: "name"
                  },
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  name: "name",
                  placeholder: "Your Name",
                  id: "name",
                  disabled: _vm.submitted
                },
                domProps: { value: _vm.name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.name = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "p",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.errors.has("name"),
                      expression: "errors.has('name')"
                    }
                  ],
                  staticClass: "help-block text-danger"
                },
                [
                  _c("ul", { attrs: { role: "alert" } }, [
                    _c("li", [_vm._v(_vm._s(_vm.errors.first("name")))])
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "control-group" }, [
              _c(
                "label",
                { staticClass: "control-label", attrs: { for: "email" } },
                [_vm._v("Email")]
              ),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.email,
                    expression: "email"
                  },
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required|email",
                    expression: "'required|email'"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  type: "email",
                  id: "email",
                  placeholder: "Your email address",
                  name: "email",
                  disabled: _vm.submitted
                },
                domProps: { value: _vm.email },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.email = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "p",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.errors.has("email"),
                      expression: "errors.has('email')"
                    }
                  ],
                  staticClass: "help-block text-danger"
                },
                [
                  _c("ul", { attrs: { role: "alert" } }, [
                    _c("li", [_vm._v(_vm._s(_vm.errors.first("email")))])
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "control-group" }, [
              _c(
                "label",
                { staticClass: "control-label", attrs: { for: "message" } },
                [_vm._v("Message")]
              ),
              _vm._v(" "),
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.message,
                    expression: "message"
                  },
                  {
                    name: "validate",
                    rawName: "v-validate",
                    value: "required",
                    expression: "'required'"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  id: "message",
                  rows: "6",
                  name: "message",
                  placeholder: "",
                  disabled: _vm.submitted
                },
                domProps: { value: _vm.message },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.message = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "p",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.errors.has("message"),
                      expression: "errors.has('message')"
                    }
                  ],
                  staticClass: "help-block text-danger"
                },
                [
                  _c("ul", { attrs: { role: "alert" } }, [
                    _c("li", [_vm._v(_vm._s(_vm.errors.first("message")))])
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _vm.success
              ? _c(
                  "div",
                  {
                    staticClass: "control-group alert alert-success",
                    attrs: { name: "alert", id: "alert" }
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "close",
                        attrs: { type: "button" },
                        on: { click: _vm.resetContact }
                      },
                      [_vm._v("×")]
                    ),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.success))])
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "control-group" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-contact btn-block btn-lg",
                  attrs: { type: "submit", disabled: _vm.submitted }
                },
                [_vm._v(_vm._s(_vm.submitText))]
              )
            ])
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("header", { staticClass: "section-header" }, [
      _c("h2", { staticClass: "section-title" }, [
        _c("span", [_vm._v("Contact")])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "spacer" }),
      _vm._v(" "),
      _c("p", { staticClass: "section-subtitle" }, [
        _vm._v(
          "Feel free to contact me any time of day and I'll get back to you as soon as I can."
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-5 contact-info" }, [
      _c("h3", [_vm._v("Contact Info")]),
      _vm._v(" "),
      _c("p", [
        _c("i", { staticClass: "fa fa-envelope-o" }),
        _vm._v("kenstuddy@gmail.com")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-43b63039", module.exports)
  }
}

/***/ })
],[11]);