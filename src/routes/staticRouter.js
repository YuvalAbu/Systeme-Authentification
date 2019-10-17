const controller = require('../controllers/staticController');

module.exports = router => {
  router.route('/').get(controller.index);
  router.route('/signin').get(controller.signin);
  router.route('/signup').get(controller.signup);
};
