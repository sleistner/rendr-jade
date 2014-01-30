/*global rendr*/
var fs = require('fs');
var _ = require('underscore');
module.exports = function(jade) {
  return {
    getLayout: function(name, entryPath, callback) {
      var layoutPath = entryPath + '/app/templates/' + name + '.jade';
      fs.readFile(layoutPath, 'utf8', function (err, str) {
        if (err) return callback(err);

        var template = jade.compile(str, {
          filename: '/app/templates/' + name + '.jade'
        });
        var extendedTemplate = function(locals) {
          Object.keys(jade.helpers).forEach(function(fnName) {
            locals[fnName] = jade.helpers[fnName].bind(locals);
          })
          return template.call(locals, locals);
        };
        callback(null, extendedTemplate);
      });
    }
  }
};
