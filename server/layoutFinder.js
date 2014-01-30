/*global rendr*/
var fs = require('fs'),
    _ = require('underscore'),
    templateFinder = require('../shared/templateFinder');
module.exports = function(jade) {
  templateFinder = templateFinder(jade);
  return {
    getLayout: function(name, entryPath, callback) {
      var layoutPath = entryPath + '/app/templates/' + name + '.jade';
      fs.readFile(layoutPath, 'utf8', function (err, str) {
        if (err) return callback(err);
        var template = jade.compile(str, {
          filename: '/app/templates/' + name + '.jade'
        });
        callback(null, templateFinder.extendTemplate(template));
      });
    }
  }
};
