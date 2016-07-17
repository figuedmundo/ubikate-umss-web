import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Route.extend({

  geolocation: Ember.inject.service(),

  actions: {

    locate() {
      var that = this;
      this.get('geolocation').getLocation().then(function(geoObject) {
        console.log(geoObject);
        var currentLocation = that.get('geolocation').get('currentLocation');
        console.log(currentLocation);
        that.controllerFor('places.show').set('userLocation', currentLocation);
      });

    }

  },

  model(params) {
      var url = (ENV.APP.API_HOST || '') + '/api/v1/places/' + params.id;

      return jQuery.ajax({
          url: url,
          type: 'GET',
          headers: {
              'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
      });
  },





});
