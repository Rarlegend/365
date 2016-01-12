Template.notifications.helpers({
	notifications: function(){
        
        // console.log("all notifications");
        // console.log(notifications);
        result = [];
		var ready = Meteor.subscribe('Notifications').ready();
        var notifications = Notifications.find().fetch();
        
        var counter = 0;
        notifications.forEach(function (notification) {  
        	console.log("single");  
            console.log(notification);     
            counter += 1;

            var user = Meteor.users.findOne({_id:notification.friendId});
            var element = {};

            if (notification.type == "acceptRequest"){
                element.notification = " is now your friend.";
                element.isFriendType = true;
            }
            else{
                element.notification = ' collected your post:';
                element.isFriendType = false;
            }
            element.username = user.username;
            var date = new Date();
            var createdAt = new Date(notification.createdAt);
            var diffHours = Math.abs((date - createdAt) / 36e5);
            var timeString = getTimeString(diffHours);
            
            element.picture = user.profile.picture;
            element.timeString = timeString;
            element.username = user.username;
            element.type = notification.type;
            if (counter % 2 == 0){
            	element.classNames = "notificationRow evenRow";
            }
            else{
            	element.classNames = "notificationRow";
            }
            if (notification.seen){
            	element.statusName = "notificationStatus read";
            }
            else{
            	element.statusName = "notificationStatus unread";
            }
            result.push(element);
            // if (notification.type == "acceptRequest")
            //     sAlert.success(user.username + ' accepted your friend request!', {position: 'bottom'});
            // else
            //     sAlert.success(user.username + ' collected your thought!', {position: 'bottom'});
        });
        // console.log(result);
        // console.log(result[0]);
        return{
            data: result,
            ready: ready
        };
    }
});

function getTimeString(diffHours){
	var timeString;
	if (diffHours < 1){
        diffHours = diffHours * 60;
        var numMinutes = Math.floor(diffHours);
        if (numMinutes == 1){
            timeString = numMinutes.toString() + " min ago";
        }
        else{
            timeString = numMinutes.toString() + " mins ago";
        }
    }
    else if (diffHours > 24){
        diffHours = diffHours / 24;
        var numDays = Math.floor(diffHours);
        if (numDays == 1){
            timeString = numDays.toString() + " day ago";
        }
        else{
            timeString = numDays.toString() + " days ago";
        }
    }
    else{
        var numHours = Math.floor(diffHours);
        if (numHours == 1){
            timeString = numHours.toString() + " hr ago";
        }
        else{
            timeString = numHours.toString() + " hrs ago";
        }
    }
    return timeString;
}