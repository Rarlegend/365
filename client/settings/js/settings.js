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

    'submit #changePassForm': function(event, template){
        event.preventDefault();
        var oldPassword = event.target.oldPass.value;
        var newPassword = event.target.newPass.value;
        var newConfirm = event.target.newPassConfirm.value;
        if (Session.get("isFB")){
            alert("You logged in with FB!");
            // Session.set("showChangePassword", false);
            // $("#changePassword").hide();
        }
        else if (newPassword == newConfirm){
            Accounts.changePassword(oldPassword, newPassword, function(err){
                if (err){
                    alert(err.reason);
                    // Session.set("showChangePassword", false);
                    // $("#changePassword").hide();
                }
                else{
                    console.log("success");
                    // Session.set("showChangePassword", false);
                    // $("#changePassword").hide();
                    alert("Success!");
                    event.target.reset();
                }
            });
        }
        else{
            //TODO Send error to user
            alert("Passwords no not match");
            // Session.set("showChangePassword", false);
            // $("#changePassword").hide();
        }
        // template.find("changePassForm").reset();



    },

    'change #attach': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Avatars.insert(file, function (err, fileObj) {
                if (err) { // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                    console.log(err);
                } else {
                    $('#upload-picture').modal('hide');
                    $('#change-picture').hide();
                    var avatarUrl = {
                        'profile.picture' : fileObj._id
                    }
                    Meteor.users.update(Meteor.userId(), {$set: avatarUrl});
                    // Session.set('showProfile', Meteor.user());
                }
            });
        });
    },


});




 

 



