import Ember from 'ember';
import ENV from 'ubikate-umss-web/config/environment';
//import ProtectedRoute from 'ubikate-umss-web/routes/protected';

//export default ProtectedRoute.extend({
export default Ember.Route.extend({

    geolocation: Ember.inject.service(),

    actions: {
        submit() {

            var self = this;
            this.get('geolocation').getLocation().then(function(geoObject) {
                let lat = geoObject.coords.latitude;
                let lon = geoObject.coords.longitude;

                var controller = self.get('controller');

                var name = controller.get('name');
                var description = controller.get('description');
                var phone = controller.get('phone');
                var level = controller.get('level');

                controller.set('message', null);

                var payload = {
                    name: name,
                    description: description,
                    phone: phone,
                    level: level,
                    lat: lat,
                    lon: lon
                };

                var url = (ENV.APP.API_HOST || '') + '/api/v1/places/new';
                jQuery.post(url, payload).then(
                    function(data) {
                        console.log(data);

                        var transition = controller.get('transition');

                        if (transition) {
                            // self.transitionTo('places');
                            console.log(transition);
                            self.transitionTo('places.show');
                        } else {
                            self.transitionTo('places');
                        }
                    },
                    function(error) {
                        controller.set('message', error.responseText);
                    }
                );
            });
        },

        cancel() {
            this.transitionTo('places');
        },

        resetController: function(controller) {
            controller.setProperties({
                name: null,
                description: null,
                lat: null,
                lon: null
            });
        }




    }
});
