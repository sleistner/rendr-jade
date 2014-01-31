module.exports = {
  index: function(params, callback) {
    this.app.set('title', 'Example home/index');
    var user1 = this.app.modelUtils.getModel('user');
    user1.attributes['name'] = 'User 1';
    var user2 = this.app.modelUtils.getModel('user');
    user2.attributes['name'] = 'User 2';
    callback(null, { model: user1, user: user2 });
  },

  collections: function(params, callback) {
    var spec = {
      collection: { collection: 'Users', params: params }
    };
    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });
  }
}
