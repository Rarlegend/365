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

    'submit #changePassForm': function(event){
        event.preventDefault();
        var oldPassword = event.target.oldPass.value;
        var newPassword = event.target.newPass.value;
        var newConfirm = event.target.newPassConfirm.value;
        if (Session.get("isFB")){
            alert("You logged in with FB!");
            Session.set("showChangePassword", false);
            // $("#changePassword").hide();
        }
        else if (newPassword == newConfirm){
            Accounts.changePassword(oldPassword, newPassword, function(err){
                if (err){
                    alert(err.reason);
                    Session.set("showChangePassword", false);
                    // $("#changePassword").hide();
                }
                else{
                    console.log("success");
                    Session.set("showChangePassword", false);
                    // $("#changePassword").hide();
                }
            });
        }
        else{
            //TODO Send error to user
            alert("Passwords no not match");
            Session.set("showChangePassword", false);
            // $("#changePassword").hide();
        }
    },
});




 

 



