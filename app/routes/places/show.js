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
          imageId: null,
          imageUrl: null,
          isWatchingPosition: false,
          poller: null
      });
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    if (model.images) {
      controller.set('imageLoading', true);
      // the images of the place are returned in a string separated by comma
      var images = model.images.split(',');

      // use the first one to request from cloudinary
      // TODO get all the images and implement a carrusel to see all the images
      var url = (ENV.APP.API_HOST || '') + '/api/v1/images/' + images[0];
      console.log(url);

      // Get the cloudinary image id by the entry stored in the table place_images
      jQuery.ajax({
          url: url,
          type: 'GET'
      }).then(data => {
        // End the image loading
        controller.set('imageLoading', false);
        // set the cloudinary url
        controller.set('imageUrl', data);
      });
    } else {
      // Default image of the UMSS when the place doesn't have an image associated
      var sample = "https://res.cloudinary.com/ubikate-umss/image/upload/v1469683710/Campus_UMSS_Urbana_Web_vthauk.jpg";
      controller.set('imageLoading', false);
      controller.set('imageUrl', sample);
    }
  },

  actions: {
    willTransition: function(){
      let poller = this.controller.get('poller');
      if (poller !== null) {
        poller.stop();
      }
    }
  }

});
