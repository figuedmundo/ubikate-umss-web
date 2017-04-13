import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';
//import ProtectedRoute from 'ubikate-umss-web/routes/protected';

//export default ProtectedRoute.extend({
export default Ember.Route.extend({

  model(params) {
      var url = (ENV.APP.API_HOST || '') + '/api/v1/places/' + params.id;

      return jQuery.ajax({
          url: url,
          type: 'GET',
          headers: {
              'session_id': localStorage.getItem('token')
          }
      });

  },

  resetController: function(controller) {
      controller.setProperties({
          userLocation: null,
          currentGeoJSON: null,
      });
  }

});
