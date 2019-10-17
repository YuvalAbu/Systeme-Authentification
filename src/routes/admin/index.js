const admin = require('./adminRouter.js');

module.exports = router => {
  users(router);
  return router;
};
