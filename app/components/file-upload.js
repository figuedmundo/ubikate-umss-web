import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from 'ubikate-umss-web/config/environment';

export default EmberUploader.FileField.extend({
  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      // url: this.get('url')
      url: (ENV.APP.API_HOST || '') + '/api/v1/images/',
      cloudinaryNameId: this.get('cloudinaryNameId'),
      paramNamespace: 'cloudinary',
      // paramName: 'imageUpload'
    });

    console.log(uploader);
    // var place = "hola";

    if (!Ember.isEmpty(files)) {
      var photo = files[0];
      console.log(photo.name);
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(photo)
        .then(data => {
          // Handle success
          console.log("Success uploading file");
          console.log(data);
        }, error => {
          // Handle failure
          console.log(error);
        });
    }
  }
});
