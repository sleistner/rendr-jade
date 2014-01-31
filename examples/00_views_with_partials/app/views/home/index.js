var BaseView = require('../base');

module.exports = BaseView.extend({
  className: 'home-index',
  getTemplateData: function() {
    var data = BaseView.prototype.getTemplateData.call(this);
    data.user = this.options.user;
    return data;
  }
});
module.exports.id = 'home/index';
