import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
      submit: function() {
          var controller = this.get('controller');
          let email = controller.get('email');
          let name = controller.get('name');
          let signupReason = controller.get('reason');

          console.log(email);

          controller.set('email', null);
          this.transitionTo('home');
      },

      cancel: function() {
          var controller = this.get('controller');
          controller.set('email', null);
          controller.set('name', null);
          controller.set('reason', null);

          this.transitionTo('home');
      },
    }
});
