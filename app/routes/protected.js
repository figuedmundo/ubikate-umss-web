import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        if (!localStorage.getItem('token')) {
            return Ember.RSVP.reject({
                status: 'Unauthorized',
                message: 'Please login to access this page'
            });
        }
    }
});
