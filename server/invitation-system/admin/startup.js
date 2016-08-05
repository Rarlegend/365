Meteor.startup(function () {
    var splashThoughtOne = "Ran into Oliver for the first time in a while. It was nice. There's something weirdly comforting about seeing old faces.";

    var splashThoughtTwo = "I wandered around an art store by my house today and decided to buy some clay. It was surprisingly fun to mess around with. I never realized how powerful and versatile a material it is. A world without painting, photography, or animation wouldn't be much different, but without clay?";

    var splashThoughtThree = "Don't confuse my personality with my attitude. My personality is who I am. My attitude depends on who you are. ";

    var splashThoughtFour = "I'm not a politician but I could run the country into the ground way better than any of these candidates";

    var hiThoughtOne = splashThoughtOne;

    var hiThoughtTwo= "Work had me thinking a lot about my relationship with my boss today. I've gotta remember that it's my job to make him look as good as possible. Even if I don't get credit immediately, It'll all work out in the end.";

    var hiThoughtThree = "I would definitely teach economics. I think it's super important for understanding how the world works...but then again, I'm a chemistry nerd and that would be a lot more fun haha.";

    var hiThoughtFour =  "I found out Antonia used to rock climb religiously in college. Funny because I rock climb and I never knew that. Small world.";

    var hiThoughtFive = "I got through my last day of company training today. I made it without doing anything too stupid which is huge for me lol.";

    var hiThoughtSix = "I realized today I have to pivot my career, even if it means leaving the paycheck and security. I've learned everything I can, now it's time to move on. I'm just happy I've made this realization before wasting too much time.";

    var hiThoughtSeven = "I have no regrets today. It was a great one.";

    var hiThoughtEight = "Yep, in nyc I fall in love literally every day. Especially when going through the crosswalk.";

    SplashThoughts.remove({});
    HiThoughts.remove({});
    Meteor.call("addHiThought", "   43", hiThoughtOne, "Who or what made you smile today?" , "Keepspace");
    Meteor.call("addHiThought", "   11", hiThoughtTwo, "Who challenged you today?","Keepspace");
    Meteor.call("addHiThought", "   64", hiThoughtThree, "If you had a chance to be a teacher, what class would you teach?","Keepspace");
    Meteor.call("addHiThought", "   98", hiThoughtFour, "Tell us something you learned about a friend today.","Keepspace");
    Meteor.call("addHiThought", "   104", hiThoughtFive, "When did you feel most proud of yourself today?", "Keepspace");
    Meteor.call("addHiThought", "   323", hiThoughtSix, "Did you have a moment of conflict today? Tell us about it.","Keepspace");
    Meteor.call("addHiThought", "   34", hiThoughtSeven, "Is there any part of today you would redo?" ,"Keepspace");
    Meteor.call("addHiThought", "   24", hiThoughtEight, "Did you run into someone you might have a crush on? Explain why you like them." ,"Keepspace");
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
