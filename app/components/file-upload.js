import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from 'ubikate-umss-web/config/environment';

export default EmberUploader.FileField.extend({
  //
  // showPlaceController: Ember.inject.controller('places.show'),
  // imageSaving: Ember.computed.alias('showPlaceController.imageSaving'),

  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      url: (ENV.APP.API_HOST || '') + '/api/v1/images/',
      placeId: this.get('placeId'),
      imageSave: this.get('imageSaving')
    });

    console.log(uploader);

    if (!Ember.isEmpty(files)) {
      this.set('imageSave', true);
      var photo = files[0];
      console.log(photo);

      uploader.upload(photo)
        .then(res => {
          var self = this;
          // Handle success
          console.log("Success uploading file");
          console.log(res.data.public_id);

          var payload = {
              cloudinary_public_id: res.data.public_id
          };

          let saveImageUrl = (ENV.APP.API_HOST || '') + `/api/v1/places/${this.placeId}/images`;

          return jQuery.post(saveImageUrl, payload).then(
              function(data) {
                  console.log(data);
                  console.log("place image saved");

                  self.set('imageSave', false);
              },
              function(error) {
                  console.log('message', error.responseText);
              }
          );
        }, error => {
          // Handle failure
          console.log("ERROR uploading file");
          console.log(error);
        });
    }
  }
});
