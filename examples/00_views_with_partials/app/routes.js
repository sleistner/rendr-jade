module.exports = function(match) {
  match('', 'home#index');
  match('/collections', 'home#collections');
}
