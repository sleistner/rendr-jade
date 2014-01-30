var _ = require('underscore');

// Lazy-required.
var BaseView = null;

module.exports = function(jade, getTemplate) {

  return {
    view: function(viewName, options) {
      var ViewClass, html, viewOptions, view;
      // it's lazy loaded, not a compile time dependency
      // hiding it from r.js compiler
      var lazyRequire_baseView = 'rendr/shared/base/view';
      // BaseView = BaseView || require(lazyRequire_baseView);
      BaseView = BaseView || require('rendr/shared/base/view');
      options = options || {};
      viewOptions = options;

      // Pass through a reference to the app.
      var app = getProperty('_app', this, options);
      if (app) {
        viewOptions.app = app;
        viewName = app.modelUtils.underscorize(viewName);
      } else{
        throw new Error("An App instance is required when rendering a view, it could not be extracted from the options.")
      }

      // Pass through a reference to the parent view.
      var parentView = getProperty('_view', this, options);
      if (parentView) {
        viewOptions.parentView = parentView;
      }

      // get the Backbone.View based on viewName
      ViewClass = BaseView.getView(viewName, app.options.entryPath);
      view = new ViewClass(viewOptions);

      // create the outerHTML using className, tagName
      return view.getHtml();
    },

    partial: function(templateName, options) {
      var data, html, locals, template;

      template = getTemplate(templateName);

      locals = options || {};

      locals._app = getProperty('_app', this, options);
      return template(locals);
    },

    json: function(object, spacing) {
      return JSON.stringify(object, null, spacing);
    }

  };
};

/**
 * Grab important underscored properties from the current context.
 * These properties come from BaseView::decorateTemplateData().
 */
function getOptionsFromContext(obj) {
  var options, keys, value;

  keys = [
    '_app',
    '_view',
    '_model',
    '_collection'
  ];

  options = keys.reduce(function(memo, key) {
    value = obj[key];
    if (value) {
      memo[key] = value;
    }
    return memo;
  }, {});

  return options;
}

/**
 * Get a property that is being passed down through helpers, such as `_app`
 * or `_view`. It can either live on the context, i.e. `this._app`, or in the
 * `options.data` object passed to the helper, i.e. `options.data._app`, in the
 * case of a block helper like `each`.
 */
function getProperty(key, context, options) {
  return context[key] || (options.data || {})[key];
}
