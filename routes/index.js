module.exports = function (app, controller) {
  app.get('/', controller.index.index);
  app.get('/index/support', controller.index.support);
}
