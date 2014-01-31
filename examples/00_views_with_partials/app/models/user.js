var Base = require('./base');

module.exports = Base.extend({
  initialize: function(models, options) {
    Base.prototype.initialize.call(this, models, options);
    this.attributes.name = this.attributes.name || 'Hardcoded Name';
    this.attributes.email = this.attributes.email || 'Hardcoded@email.com';
  }
});
module.exports.id = 'User';
