var jade = require('jade')
  , templateFinder = require('./shared/templateFinder')(jade);

/**
 * Export a global opject so people can add locals, helpers, etc.
 */
exports.globals = jade._globals = {};

/**
 * `getTemplate` is available on both client and server.
 */
exports.getTemplate = templateFinder.getTemplate;

/**
 * Expose `templatePatterns` for manipulating how `getTemplate` finds templates.
 */
exports.templatePatterns = templateFinder.templatePatterns;

/**
 * `getLayout` should only be used on the server.
 */
if (typeof window === 'undefined') {
  exports.getLayout = require('./server/layoutFinder')(jade).getLayout;
} else {
  exports.getLayout = function() {
    throw new Error('getLayout is only available on the server.');
  };
}

/**
 * Register helpers, available on both client and server.
 *
 * Export it so other modules can register helpers as well.
 */
exports.registerHelpers = function registerHelpers(helpersModule) {
  var helpers = helpersModule(jade, exports.getTemplate);

  for (var key in helpers) {
    if (!helpers.hasOwnProperty(key)) continue;
    jade._globals[key] = helpers[key];
  }
};

/**
 * Register the pre-bundled Rendr helpers.
 */
//var rendrHelpers = require('./shared/helpers');
//exports.registerHelpers(rendrHelpers);
