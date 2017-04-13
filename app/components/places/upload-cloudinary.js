// import Ember from 'ember';
// import ENV from 'ubikate-umss-web/config/environment';
//
// export default Ember.Component.extend({
//
//   tagName: 'input',
//   name: 'file',
//   classNames: ['cloudinary-fileupload'],
//   attributeBindings: ['name', 'type', 'accept'],
//   type: 'file',
//   accept: null,
//   cloudinaryImage: null,
//   uploadPreset: null,
//
//   didInsertElement: function() {
//     var self = this;
//     var controller = this.get('controller');
//
//     console.log(controller);
//
//     this.$().unsigned_cloudinary_upload(
//       ENV.CLOUDINARY_UPLOAD_PRESET, {
//         cloud_name: ENV.CLOUDINARY_NAME
//       }, {
//         disableImageResize: false,
//         imageMaxWidth: 1000,
//         imageMaxHeight: 1000,
//         acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
//         maxFileSize: 5000000 // 5MB
//       }
//     );
//
//     this.$().bind('fileuploaddone', function(e, data) {
//       console.log(data.result);
//       self.set('cloudinaryImage', data.result);
//     });
//   }
//
// });


// import Ember from 'ember';
// import EmberUploader from 'ember-uploader';
// import ENV from 'ubikate-umss-web/config/environment';
//
//
// export default EmberUploader.FileField.extend({
//
//     filesDidChange: function(files) {
//
//         const uploader = EmberUploader.Uploader.create({
//           // url: this.get('url')
//             url: (ENV.APP.API_HOST || '') + '/api/v1/images/save'
//         });
//
//         if (!Ember.isEmpty(files)) {
//             // this second argument is optional and can to be sent as extra data with the upload
//             uploader.upload(files[0]);
//         }
//     }
//
//     // multiple: true,
//     // attributeBindings: ["capture", "accept"],
//     // accept: "accept='image//*'",
//     // capture: "camera",
//     // changedFiles: Ember.observer('files', function() {
//     //     var files;
//     //     files = this.get('files');
//     //     if (!Ember.isEmpty(files)) {
//     //         this.sendAction('filesChanged', files);
//     //         return this.rerender();
//     //     }
//     // })
// });
