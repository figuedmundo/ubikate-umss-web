import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Controller.extend({

  userLocation: null,

  shortestRoute: "hola",

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

  zoom: 17,


  location: Ember.computed('lat', 'lng', {
    get() {
      return [this.get('lat'), this.get('lng')];
    }
  }),


  geolocation: Ember.inject.service(),

  actions: {


    locateMe() {

      let _this = this;
      this.get('geolocation').getLocation().then(function(geoObject) {

        console.log(geoObject);
        _this.set("userLocation", [geoObject.coords.latitude, geoObject.coords.longitude]);

      });
    },

    getShortestRoute() {

      //Locate Me
      let _this = this;
      this.get('geolocation').getLocation()
      .then(function(geoObject) {

        console.log(geoObject);
        let coords = [geoObject.coords.latitude, geoObject.coords.longitude];
        _this.set("userLocation", coords);

        // return coords;

        var urlUser = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+coords[0]+'/'+coords[1];

        var sourceId = jQuery.ajax({
          url: urlUser,
          type: 'GET',
          headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
        })
        .then((sourceData) => {
          console.log(sourceData);
          return sourceData.id;
        });

        console.log("sourceId: ", sourceId);

        /*
        var urlUser = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+_this.get('userLocation')[0]+'/'+_this.get('userLocation')[1];

        let nodeNearUser = jQuery.ajax({
          url: urlUser,
          type: 'GET',
          headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
        });

        console.log(nodeNearUser);
        nodeNearUser.then((data) => {
          console.log(data.id);
        });

        */
      })
      .then((data) => {
        //get nodes source and target
        //get node near user = source
        console.log(data);
        var urlUser = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+data[0]+'/'+data[1];

        return jQuery.ajax({
          url: urlUser,
          type: 'GET',
          headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
        });

        // console.log(nodeNearUser);
        // let source = nodeNearUser.id;

      })
      .then((data) => {
        console.log(data);
        //get node near target
        var urlTarget = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+_this.get('lat')+'/'+_this.get('lng');

        var targetPromise = jQuery.ajax({
          url: urlTarget,
          type: 'GET',
          headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
        })
        .then((targetData) => {
          console.log(targetData);
          console.log(targetData.id);
          return targetData.id;
        });
        console.log([targetPromise, data]);
        return [targetPromise, data];

//4423187 beto's number
      })
      .then((data) => {
        console.log(data);
        //get GeoJSON of linestring that represent the shortest route
        var urlLineString = (ENV.APP.API_HOST || '') + '/api/v1/ways/route/'+data[0]+'/'+data[1];

        let shortestRouteJSON = jQuery.ajax({
          url: urlLineString,
          type: 'GET',
          headers: {
            'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
          }
        });

        shortestRouteJSON.then((data) =>{
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });



      // //get nodes source and target
      // //get node near user = source
      // var urlUser = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+this.get('userLocation')[0]+'/'+this.get('userLocation')[1];
      //
      // let nodeNearUser = jQuery.ajax({
      //   url: urlUser,
      //   type: 'GET',
      //   headers: {
      //     'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
      //   }
      // });
      //
      // console.log(nodeNearUser);
      // let source = nodeNearUser.id;
      //


      // //get node near target
      // var urlTarget = (ENV.APP.API_HOST || '') + '/api/v1/ways/node/'+this.get('lat')+'/'+this.get('lng');
      //
      // let nodeNearTarget = jQuery.ajax({
      //   url: urlTarget,
      //   type: 'GET',
      //   headers: {
      //     'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
      //   }
      // });
      //
      // console.log(nodeNearTarget);
      // let target = nodeNearTarget.id;

      // //get GeoJSON of linestring that represent the shortest route
      // var urlLineString = (ENV.APP.API_HOST || '') + '/api/v1/ways/route/'+source+'/'+target;
      //
      // let shortestRouteJSON = jQuery.ajax({
      //   url: urlLineString,
      //   type: 'GET',
      //   headers: {
      //     'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
      //   }
      // });
      //
      // console.log(shortestRouteJSON);

    }

  },

  // getWay() {
  //   var url = (ENV.APP.API_HOST || '') + '/api/v1/ways/route/1/5';
  //
  //   return jQuery.ajax({
  //     url: url,
  //     type: 'GET',
  //     headers: {
  //       'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
  //     }
  //   });
  // }



});
