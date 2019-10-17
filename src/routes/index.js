const users = require('./usersRouter');
const static = require('./staticRouter');

module.exports = router => {
  users(router);
  static(router);
  return router;
};
