import Ember from 'ember';

export default Ember.Route.extend({

  geolocation: Ember.inject.service(),

  init() {

      var that = this;
      this.get('geolocation').getLocation().then(function(geoObject) {
        console.log(geoObject);

        var currentLocation = that.get('geolocation').get('currentLocation');
        console.log(currentLocation);
        that.controllerFor('places.show').set('userLocation', currentLocation);

      });

  },

  model(params) {
      var url = 'http://localhost:3000/api/v1/places/' + params.id;

      return jQuery.ajax({
          url: url,
          type: 'GET',
          headers: {
              'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
      });
  },

  getRoute() {
    var url = 'http://localhost:3000/api/v1/ways/route/1/5';

    return jQuery.ajax({
        url: url,
        type: 'GET',
        headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
        }
    });
  }



});
