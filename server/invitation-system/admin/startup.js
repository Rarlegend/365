Meteor.startup(function () {
    var splashThoughtOne = "Ran into Oliver for the first time in a while. It was nice. There's something weirdly comforting about seeing old faces.";

    var splashThoughtTwo = "I wandered around an art store by my house today and decided to buy some clay. It was surprisingly fun to mess around with. I never realized how powerful and versatile a material it is. A world without painting, photography, or animation wouldn't be much different, but without clay?";

    var splashThoughtThree = "Don't confuse my personality with my attitude. My personality is who I am. My attitude depends on who you are. ";

    var splashThoughtFour = "I'm not a politician but I could run the country into the ground way better than any of these candidates";

    var hiThoughtOne = "Who or what made you smile today?";

    var hiThoughtTwo= "Who challenged you today?";

    var hiThoughtThree = "If you had a chance to be a teacher, what class would you teach?";

    var hiThoughtFour = "Tell us something you learned about a friend today.";

    var hiThoughtFive = "When did you feel most proud of yourself today?";

    var hiThoughtSix = "Did you have a moment of conflict today? Tell us about it.";

    var hiThoughtSeven = "Is there any part of today you would redo?";

    var hiThoughtEight = "Did you run into someone you might have a crush on? Explain why you like them.";

    SplashThoughts.remove({});
    HiThoughts.remove({});
    Meteor.call("addHiThought", hiThoughtOne, "Keepspace");
    Meteor.call("addHiThought", hiThoughtTwo, "Keepspace");
    Meteor.call("addHiThought", hiThoughtThree, "Keepspace");
    Meteor.call("addHiThought", hiThoughtFour, "Keepspace");
    Meteor.call("addHiThought", hiThoughtFive, "Keepspace");
    Meteor.call("addHiThought", hiThoughtSix, "Keepspace");
    Meteor.call("addHiThought", hiThoughtSeven, "Keepspace");
    Meteor.call("addHiThought", hiThoughtEight, "Keepspace");
    Meteor.call("addSplashThought", splashThoughtOne, "Keepspace");
    Meteor.call("addSplashThought", splashThoughtTwo, "Keepspace");
    Meteor.call("addSplashThought", splashThoughtThree, "Keepspace");
    Meteor.call("addSplashThought", splashThoughtFour, "Keepspace");

    Accounts.emailTemplates.from = 'admin@thekeepspace.com';
    Accounts.emailTemplates.siteName = 'thekeepspace';
    var checkUser, i, id, len, results, user, users;
    users = [
        {
            name: "Keepspace  Administrator",
            email: "admin@thekeepspace.com",
            password: "rashdoggystyle",
            roles: ['admin']
        }
    ];
    results = [];
    for (i = 0, len = users.length; i < len; i++) {
        user = users[i];
        checkUser = Meteor.users.findOne({
            "emails.address": user.email
        });
        if (!checkUser) {
            id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: {
                    name: user.name
                }
            });
            if (user.roles.length > 0) {
                results.push(Roles.addUsersToRoles(id, user.roles));
            } else {
                results.push(void 0);
            }
        } else {
            results.push(void 0);
        }
    }
    return results;
});
