var count = Counts.get('Notifications-Counter');
Session.set('count',count);
//Meteor.subscribe("Notifications");

Tracker.autorun(function() {
    Session.get('count');
    getNotifications();
});

function getNotifications(){
    if (Counts.get('Notifications-Counter') > 0){
        var notfications = Notifications.find().fetch();
        notfications.forEach(function (notification) {            
            var user = Meteor.users.findOne({_id:notification.friendId});
            if (notification.type == "acceptRequest")
                sAlert.success(user.username + ' accepted your friend request!', {position: 'bottom'});
            else
                sAlert.success(user.username + ' collected your thought!', {position: 'bottom'});
        });
        Meteor.call("clearNotifications", Meteor.userId());
    }
}