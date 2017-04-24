/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png'
      ]
    }
  });


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // app.import('bower_components/proj4/dist/proj4.js');
  // app.import('bower_components/jquery/dist/jquery.js');
  // app.import('bower_components/jquery-ui/ui/widget.js');
  //
  // app.import('bower_components/blueimp-load-image/js/load-image.js');
  // app.import('bower_components/blueimp-load-image/js/load-image-orientation.js');
  // app.import('bower_components/blueimp-load-image/js/load-image-meta.js');
  // app.import('bower_components/blueimp-load-image/js/load-image-exif.js');
  // app.import('bower_components/blueimp-load-image/js/load-image-exif-map.js');

  // app.import('bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js');

  //
  // app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
  // app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
  // app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-process.js');
  // app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-image.js');
  // app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-ui.js');
  // app.import('bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js');
  // app.import('bower_components/cloudinary-jquery-file-upload/cloudinary-jquery-file-upload.js');
  //

  return app.toTree();
};
