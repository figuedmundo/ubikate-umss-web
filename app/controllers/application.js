import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';

export default Ember.Controller.extend({
    user: null,

    userObserver: function() {
        if (!this.get('user') && localStorage.getItem('user_id')) {
            var self = this;

            var url = (ENV.APP.API_HOST || '') + '/api/v1/users/' + localStorage.getItem('user_id');

            jQuery.ajax({
                url: url,
                type: 'GET'
            }).done(function(user) {
                self.set('user', user);
            }).fail(function() {
                self.send('logout');
            });
        }
    }.observes('currentPath'),
});
