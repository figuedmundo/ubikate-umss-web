import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';
//import ProtectedRoute from 'ubikate-umss-web/routes/protected';

export default Ember.Route.extend({

    model(params) {

        var url = (ENV.APP.API_HOST || '') + '/api/v1/places/' + params.id;

        return jQuery.ajax({
            url: url,
            type: 'GET',
            headers: {
                'session_id': localStorage.getItem('token')
            }
        });

    },

    // geolocation: Ember.inject.service(),

    actions: {
        submit() {
            var self = this;

            var controller = this.get('controller');

            var model = controller.get('model');
            var id = model.id;

            var name = null;
            var description = null;
            var phone = null;
            var level = null;

            name = controller.get('model.name');
            description = controller.get('model.description');
            phone = controller.get('model.phone');
            level = controller.get('model.level');

            // alert(name);
            // alert(description);
            // alert(level);


            controller.set('message', null);

            var payload = {
                name: name,
                description: description,
                phone: phone,
                level: level,
                // lat: lat,
                // lon: lon
            };

            var url = (ENV.APP.API_HOST || '') + `/api/v1/places/${id}/edit`;
            jQuery.ajax({
                url: url,
                type: 'put',
                data: payload
            }).then(
                function(data) {
                    console.log(data);

                    self.transitionTo('places.show', id);

                    // var transition = controller.get('transition');

                    // if (transition) {
                    //     // self.transitionTo('places');
                    //     console.log(transition);
                    //     self.transitionTo('places.show');
                    // } else {
                    //     self.transitionTo('places');
                    // }
                },
                function(error) {
                    controller.set('message', error.responseText);
                }
            );

        },

        cancel() {
            this.transitionTo('places');
        }
    }

});
