const controller = require('../controllers/usersController');
const passport = require('passport');

module.exports = router => {
  router
    .route('/user/:_id')
    .get(controller.getUser)
    .put(controller.putUser)
    .delete(controller.deleteUser);
  router.route('/signin').post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
    }),
  );
  router.route('/signup').post(controller.signup);
  router.route('/user/confirm/:token').get(controller.confirmedAccount);
  router.route('/logout').get(controller.logout);
};
