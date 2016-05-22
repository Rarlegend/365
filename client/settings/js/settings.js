Template.settings.helpers({
     picture: function() {
        if (Meteor.user()) {
            var picture = Meteor.user().profile.picture;
            var customAvatar = Avatars.findOne({ _id: picture });
            if (customAvatar) {
                return customAvatar.url();
            }
        }
        return picture;
    }
});

Template.settings.events({
	'click [data-action=read]': function() {
		Meteor.call("readNotification", this._id);
    },
});




 

 



