const controller = require('../../controllers/usersController');

module.exports = router => {
  router.route('/login').post(controller.login);
};
