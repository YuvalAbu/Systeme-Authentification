const users = require('./usersController');
const static = require('./staticController');

module.exports = router => {
  users(router);
  static(router)
  return router;
};
