import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from 'ubikate-umss-web/config/environment';

export default EmberUploader.FileField.extend({
  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      // url: this.get('url')
      url: (ENV.APP.API_HOST || '') + '/api/v1/images/',
      cloudinaryNameId: this.get('cloudinaryNameId'),
      // placeId: this.get('placeId'),
      // paramNamespace: 'cloudinary'
      // name: 'upload-button'
      // paramName: 'imageUpload'
    });

    console.log(uploader);

    if (!Ember.isEmpty(files)) {
      var photo = files[0];
      console.log(photo);

      uploader.upload(photo)
        .then(data => {
          // Handle success
          console.log("Success uploading file");
          console.log(data);
          console.log("cloudinaryName = " + this.cloudinaryNameId + "-" + Date.now());
          //
          // var payload = {
          //     cloudinary_public_id: photo.name + "_"
          // };
          //
          // let saveImageUrl = (ENV.APP.API_HOST || '') + `/api/v1/places/${this.placeId}/images`;
          //
          // return jQuery.post(saveImageUrl, payload).then(
          //     function(data) {
          //         console.log(data);
          //         console.log("place image saved");
          //     },
          //     function(error) {
          //         console.log('message', error.responseText);
          //     }
          // );
        }, error => {
          // Handle failure
          console.log("ERROR uploading file");
          console.log(error);
        });
    }
  }
});
