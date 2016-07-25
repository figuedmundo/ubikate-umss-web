/* globals jQuery */
import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({

    beforeModel: function() {
        if (localStorage.getItem('token')) {
            this.transitionTo('home');
        }
    },

    actions: {
        submit: function() {

            var self = this;
            var controller = this.get('controller');

            var username = controller.get('username');
            var password = controller.get('password');

            var image = controller.get('image');


            console.log(username);
            console.log(image);

            controller.set('message', null);

            var payload = {
                username: username,
                password: password
            };

            var url = (ENV.APP.API_HOST || '') + '/login';
            jQuery.post(url, payload).then(
                function(data) {
                    localStorage.setItem('token', data.session_id);
                    localStorage.setItem('user_id', data.user_id);

                    var transition = controller.get('transition');

                    if (transition) {
                        transition.retry();
                    } else {
                        self.transitionTo('home');
                    }
                },
                function(error) {
                    controller.set('message', error.responseText);
                }
            );
        },

        cancel: function() {
            this.transitionTo('home');
        }
    },

    resetController: function(controller) {
        controller.setProperties({
            username: null,
            password: null,
            message: null,
            transition: null
        });
    }
});
