import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Route.extend({

  searchFor: '',

  model() {
    //return [];
    var searchTerm = this.get('searchFor');

    var url = '';
    if (searchTerm) {
      url = (ENV.APP.API_HOST || '') + '/api/v1/places/search/' + searchTerm;
    }
    else {
      url = (ENV.APP.API_HOST || '') + '/api/v1/places/';
    }

    console.log(url);
    return jQuery.ajax({
      url: url,
      type: 'GET',
      headers: {
        'session_id': localStorage.getItem('token')
      }
    });
  },

  actions: {
    setSearchTerm() {
      var controller = this.get('controller');
      var searchTerm = controller.get('searchTerm');
      this.set('searchFor', searchTerm);
      this.refresh();
    }
  }

});
