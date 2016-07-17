import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Route.extend({

    model: function() {
      //return [];
        var url = (ENV.APP.API_HOST || '') + '/api/v1/places/';
        console.log(url);

        return jQuery.ajax({
            url: url,
            type: 'GET'
        });
    }
});
