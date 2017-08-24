import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';
import Poller from 'ubikate-umss-web/helpers/poller';

export default Ember.Controller.extend({

    userLocation: null,
    currentGeoJSON: null,
    loading: null,
    imageId: null,
    imageLoading: null,
    imageUrl: null,
    imageSaving: false,
    isWatchingPosition: false,
    poller: null,

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

        showMap() {

          var poller = new Poller();
          poller.setInterval(10000);
          this.set('poller', poller);
          this.getShortestRoute1(this);
        },

        clearGeoJSON() {
          this.set('currentGeoJSON', null);
          this.set('isWatchingPosition', false);
          let poller  = this.get('poller');
          if(poller !== null){
            poller.stop();
          }
        }
// https://www.googleapis.com/geolocation/v1/geolocate?key=%GOOGLE_API_KEY%
// https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDqg6-vRr87oUQ4SyuYdkKtq2qcnEFkZwU

//AIzaSyBMEAWaMMva5ONu-VQZ36f-IBer8uZM5OU
// https://location.services.mozilla.com/v1/geolocate?key=test
    },

    getShortestRoute1: (controller) => {
      let self = controller;
      let poller = self.get('poller');
      self.set('currentGeoJSON', null);
      self.set('loading', true);

      let geoOptions = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 75000
      };

      // trackLocation
      //getLocation
      self.get('geolocation').trackLocation(geoOptions).then(function(geoObject) {

          console.log("geoObject:");
          console.log(geoObject);

          let currentLocation = self.get('geolocation').get('currentLocation');
          self.set('userLocation', currentLocation);

          var getSourceDataRequest = self.getLocationNode(currentLocation[0], currentLocation[1]);
          var getTargetDataRequest = self.getLocationNode(self.get('lat'), self.get('lng'));
          var putAddVisitToPlace = self.updatePlaceVisitCount(self.get('model').id);

          putAddVisitToPlace.then(function() {
            console.log("visit count updated");
          });

          self.getRouteGeoJSON(getSourceDataRequest, getTargetDataRequest, controller);
          self.set('loading', false);

          let count = 0;
          poller.start(self, function() {
            count += 1;
            console.log(count);

            let newCurrentLocation = self.get('geolocation').get('currentLocation');

            if (currentLocation !== newCurrentLocation) {
              currentLocation = newCurrentLocation;
              self.set('userLocation', currentLocation);

              let newSourceDataRequest = self.getLocationNode(currentLocation[0], currentLocation[1]);
              self.set('currentGeoJSON', null);
              self.getRouteGeoJSON(newSourceDataRequest, getTargetDataRequest, self);
            }

            // 3 min max
            if (count > 18) {
              poller.stop();
            }
          });


      })
      .catch(function(error) {
        self.set('loading', false);
        let message = error.message;
        console.log(message);
        self.get('flashMessages').danger(message);
      });
    },

    getLocationNode: (lat, lon) => {
      var urlNode = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/' + lat + '/' + lon;

      return jQuery.ajax({
          url: urlNode,
          type: 'GET'
      });
    },

    updatePlaceVisitCount: (id) => {
      var url = (ENV.APP.API_HOST || '') + `/api/v1/places/${id}/visit`;

      return jQuery.ajax({
          url: url,
          type: 'PUT'
      });
    },

    getRouteGeoJSON: (getSourceDataRequest, getTargetDataRequest, controller) => {
      Promise.all([
          getSourceDataRequest,
          getTargetDataRequest,
      ]).then(function(values) {
          var sourceData = values[0];
          var targetData = values[1];

          var urlLineString = (ENV.APP.API_HOST || '') + '/api/v1/ways/route/' + sourceData.id + '/' + targetData.id;

          jQuery.ajax({
              url: urlLineString,
              type: 'GET'
          }).then(function(geoJSON) {
              controller.set('currentGeoJSON', geoJSON);
              // self.set('loading', false);
              // self.get('flashMessages').info("distancia: " + geoJSON.distance + "[metros] <br> tiempo: " + geoJSON.time + " [minutos]" );
          });
      });
    }

    });
