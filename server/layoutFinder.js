/*global rendr*/
var fs = require('fs');

module.exports = function(jade) {
  return {
    getLayout: function(name, callback) {
      var layoutPath = rendr.entryPath + '/app/templates/' + name + '.jade';
      fs.readFile(layoutPath, 'utf8', function (err, str) {
        if (err) return callback(err);
        
        console.log("hidsfvhfdvuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuhs");
        console.log(jade._globals);
        var template = jade.compile(str, {
          globals: jade._globals,
          filename: '/app/templates/' + name + '.jade'
        });
        callback(null, template);
      });
    }
  }
};
