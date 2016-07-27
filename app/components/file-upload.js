import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from 'ubikate-umss-web/config/environment';


export default EmberUploader.FileField.extend({
    filesDidChange: function(files) {

        const uploader = EmberUploader.Uploader.create({
          // url: this.get('url')
            url: (ENV.APP.API_HOST || '') + '/api/v1/images/save'
        });

        if (!Ember.isEmpty(files)) {
            // this second argument is optional and can to be sent as extra data with the upload
            uploader.upload(files[0]);
        }
    }

    // multiple: true,
    // attributeBindings: ["capture", "accept"],
    // accept: "accept='image//*'",
    // capture: "camera",
    // changedFiles: Ember.observer('files', function() {
    //     var files;
    //     files = this.get('files');
    //     if (!Ember.isEmpty(files)) {
    //         this.sendAction('filesChanged', files);
    //         return this.rerender();
    //     }
    // })
});
