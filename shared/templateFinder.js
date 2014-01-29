/*global rendr*/
var cachedTemplates = {};
var _ = require('underscore');
module.exports = function(jade) {

  /**
   * Provide a way for apps to specify that different template name patterns
   * should use different compiled template files.
   */
  var templatePatterns = [];

  /**
   * Given a template name, return the compiled Handlebars template.
   */
  function getTemplate(templateName) {
    /**
     * Find the correct source file for this template.
     */
    var src = getSrcForTemplate(templateName);
    /**
     * Allow compiledTemplates to be created asynchronously.
     */
    if (!cachedTemplates[src]) {
      cachedTemplates[src] = require(src);
      if (typeof cachedTemplates[src] == 'function') {
        cachedTemplates[src] = cachedTemplates[src](jade);
      }
    }
    var template = cachedTemplates[src][templateName];
    // replace template with extendedtemplate
    if(!template.extended) {
      var extendedTemplate = function(locals) {
        _.extend(locals, jade.helpers);
        return template(locals, locals);
      }
      extendedTemplate.extended = true;
      cachedTemplates[src][templateName] = extendedTemplate;
      return extendedTemplate;
    } else {
      return template
    }
  }

  /**
   * For a given template name, find the correct compiled templates source file
   * based on pattern matching on the template name.
   */
  function getSrcForTemplate(templateName) {
    var currentPattern = templatePatterns.filter(function(obj) {
      return obj.pattern.test(templateName);
    })[0];

    if (currentPattern == null) {
      throw new Error('No pattern found to match template "' + templateName + '".');
    }

    return currentPattern.src;
  }

  return {
    getTemplate: getTemplate,
    getSrcForTemplate: getSrcForTemplate,
    templatePatterns: templatePatterns
  }
};
