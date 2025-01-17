Meteor.methods({
    validateBetaToken: function (user) {
        var id, testInvite;
        check(user, {
            email: String,
            password: String,
            betaToken: String,
            firstName: String,
            lastName: String,
            phone: String
        });
        testInvite = Invites.findOne({
            email: user.email,
            token: user.betaToken
        }, {
            fields: {
                "_id": 1,
                "email": 1,
                "token": 1
            }
        });
        if (!testInvite) {
            throw new Meteor.Error("bad-match", "Hmm, this token doesn't match your email. Try again?");
        } else {
            id = Accounts.createUser({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            });
            Roles.addUsersToRoles(id, ['tester']);
            Invites.update(testInvite._id, {
                $set: {
                    accountCreated: true
                },
                $unset: {
                    token: ""
                }
            });
            return true;
        }
    }
});

