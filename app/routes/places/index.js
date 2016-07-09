import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        var url = 'http://localhost:3000/api/v1/places';

        return jQuery.ajax({
            url: url,
            type: 'GET',
            headers: {
                'session_id': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0Njg2NDA0NjQyMDUsImtleSI6MX0.1nbogtW1cBeHYo6Fq3VsPT_zXnW7RkOi4_Dq_qSc7CQ'
            }
        });
    }
});
