import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Controller.extend({

    userLocation: null,
    currentGeoJSON: null,
    loading: null,
    imageId: null,
    imageLoading: null,
    imageUrl: null,

    lat: Ember.computed('model', {
        get() {
            return this.get('model').geometry.coordinates[1];
        }
    }),

    lng: Ember.computed('model', {
        get() {
            return this.get('model').geometry.coordinates[0];
        }
    }),

    zoom: 16,

    location: Ember.computed('lat', 'lng', {
        get() {
            return [this.get('lat'), this.get('lng')];
        }
    }),

    geolocation: Ember.inject.service(),

    actions: {

        getShortestRoute() {
            let self = this;
            this.set('currentGeoJSON', null);
            this.set('loading', true);

            this.get('geolocation').getLocation().then(function(geoObject) {
                let coords = [geoObject.coords.latitude, geoObject.coords.longitude];
                self.set('userLocation', coords);

                var urlUser = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/' + coords[0] + '/' + coords[1];
                var urlTarget = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/' + self.get('lat') + '/' + self.get('lng');
                var urlAddVisitToPlace = (ENV.APP.API_HOST || '') + `/api/v1/places/${self.get('model').id}/visit`;

                var getSourceDataRequest = jQuery.ajax({
                    url: urlUser,
                    type: 'GET'
                });

                var getTargetDataRequest = jQuery.ajax({
                    url: urlTarget,
                    type: 'GET'
                });

                var putAddVisitToPlace = jQuery.ajax({
                  url: urlAddVisitToPlace,
                  type: 'PUT'
                });

                Promise.all([
                    getSourceDataRequest,
                    getTargetDataRequest,
                    putAddVisitToPlace
                ]).then(function(values) {
                    var sourceData = values[0];
                    var targetData = values[1];

                    var urlLineString = (ENV.APP.API_HOST || '') + '/api/v1/ways/route/' + sourceData.id + '/' + targetData.id;

                    jQuery.ajax({
                        url: urlLineString,
                        type: 'GET'
                    }).then(function(geoJSON) {
                        self.set('currentGeoJSON', geoJSON);
                        self.set('loading', false);
                    });
                });
            });
        },

        clearGeoJSON() {
          this.set('currentGeoJSON', null);
        }

    }
});
