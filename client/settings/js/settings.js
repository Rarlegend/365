Template.settings.helpers({

});

Template.settings.events({
	'click [data-action=read]': function() {
		Meteor.call("readNotification", this._id);
    },
});



