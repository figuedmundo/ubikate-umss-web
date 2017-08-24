/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ubikate-umss-web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created

    }
  };


  // ENV.contentSecurityPolicy = {
  //   'default-src': "'none'",
  //   'child-src': "'self'",
  //   'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
  //   'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  //   'font-src': "'self' fonts.gstatic.com",
  //   'connect-src': "'self' *",
  //   'img-src': "'self' data: *",
  //   // 'img-src': "'self'",
  //   'media-src': "'self'",
  //   'frame-src': "'none'"
  // };

  ENV.contentSecurityPolicy = {
    'default-src': ["'none'"],
    'script-src':  ["'self' 'unsafe-inline' 'unsafe-eval' *"],
    'style-src':   ["'self' 'unsafe-inline' https://fonts.googleapis.com"],
    'font-src':    ["'self' fonts.gstatic.com"],
    'connect-src': ["'self' *"],
    'img-src':     ["'self' data: *"],
    'media-src':   ["'self'"]
  };



  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.API_HOST = 'https://10.0.0.9:3443';

    ENV.CLOUDINARY_NAME = 'ubikate-umss';
    ENV.CLOUDINARY_UPLOAD_PRESET = 'qiolb1ud';

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // ENV.CLOUDINARY_NAME = 'ubikate-umss';
    // ENV.CLOUDINARY_UPLOAD_PRESET = 'qiolb1ud';
  }

  return ENV;
};
