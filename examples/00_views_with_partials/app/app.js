var BaseApp = require('rendr/shared/app');

module.exports = BaseApp.extend({
  defaults: {
    templateAdapter: 'rendr-jade'
  },

  postInitialize: function() {

  },

  start: function() {
    BaseApp.prototype.start.call(this);
  }

});
