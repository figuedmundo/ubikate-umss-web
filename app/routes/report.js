import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';
//import ProtectedRoute from 'ubikate-umss-web/routes/protected';

//export default ProtectedRoute.extend({
export default Ember.Route.extend({
  model() {
      var url = (ENV.APP.API_HOST || '') + '/api/v1/places/visited/count';

      return jQuery.ajax({
          url: url,
          type: 'GET',
          headers: {
              'session_id': localStorage.getItem('token')
          }
      });
  },

});
