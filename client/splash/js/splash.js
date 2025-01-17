Meteor.subscribe("splashThoughts");
Meteor.subscribe("hiThoughts");
Meteor.subscribe("users");
Meteor.subscribe("Questions");
Template.splashBanner.events({
	'click #loginLink': function(){
		Router.go("loginPage");
	},
	'click #aboutLink': function() {
        Router.go('about');
    },
	'click #teamLink': function() {
		event.preventDefault();
		$("body, html").animate({ 
				scrollTop: $("#teamSlide").offset().top - em(5.3)
		}, 800);
	},
	'click #fixedLoginLink': function(){
		event.stopPropagation();
		$("body, html").animate({ 
				scrollTop: $("#topSlide").offset().top
		}, 800);
		
		$(".signOptions").hide();
		// $(".signupEmail").val("");
		$("#mainSlide").hide();
		$("#navLoginOption").show();
	},
	'click #fixedSignupLink': function(){
		event.stopPropagation();
		$("body, html").animate({ 
				scrollTop: $("#topSlide").offset().top
		}, 800);
		
		$(".signOptions").hide();
		$("#mainSlide").hide();
		$("#navSignupOption").show();
	},
	'click #splashBannerLogo': function(){ Router.go('splash');},
	'click #facebookSignButton': function(){
		var text = $("#splashThoughtBox").val();
		// console.log(text);
		Meteor.loginWithFacebook(
			{requestPermissions: ['email', 'user_friends', 'user_location', 'user_status',
			'user_posts','publish_actions']}, 
			function(err){
					if (!err){
						Session.set("isFB", true);
						localStorage.setItem("justLoggedIn", "true");
						resetAllFeeds();
						Router.go("home");
						var thoughtId = Meteor.call("addThought", text, "How will you remember today?", null,
						function(err, data) {
							if (err){
								console.log(err);
							}
							var thought = Thoughts.findOne({_id:data});
							thoughtsList.push(thought);
						});
						// $("#changePassword").hide();
					}
					else{
						console.log(err);
					}
			}
		);
	},
	'click #facebookLoginButton': function(){
		loginWithFacebook();
	},
	'click #topSlide':function(event){
		$(".signOptions").hide();
		// $(".signupEmail").val("");
		$("#mainSlide").show();
	},
	'click #goSignupButton': function(event){
		event.stopPropagation();
			$("#mainSlide").hide();
			// $("#navSignupOption").show();
			// $("#signupOptionsSlide").show();
			$("#signHereOption").show();
	},
	'click .signOptions': function(event){
		event.stopPropagation();
	},
	'click #loginLink': function(event){
		loginWithFacebook();
	},
	'click #signupLink': function(event){
		event.stopPropagation();
		$(".signOptions").hide();
		$("#mainSlide").hide();
		$("#navSignupOption").show();
	},
	'click #goButton': function(event){
			// console.log("hi");
		event.preventDefault();
		var emailVar = $("#loginEmail").val();
		var passwordVar = $("#loginPassword").val();
		Meteor.loginWithPassword({email: emailVar}, passwordVar, function(err){
			if (!err){
				Session.set("isFB", false);
				localStorage.setItem("justLoggedIn", "true");
				resetAllFeeds();
					if (emailVar === "admin@thekeepspace.com") {
							console.log("I'm bad at debugging");
							Router.go('invites');
					} else {
							console.log("not as bad as me!");
							Router.go("home");
					}
				// $("#changePassword").show();
			}
			else{
				alert(err);
			}
		});
	},
	'submit .myform': function(event){
		console.log("hi");
		event.preventDefault();
		var emailVar = $("#loginEmail").val();
		var passwordVar = $("#loginPassword").val();
		Meteor.loginWithPassword({email: emailVar}, passwordVar, function (err) {
				if (!err) {
						Session.set("isFB", false);
						localStorage.setItem("justLoggedIn", "true");
						resetAllFeeds();
						if (emailVar === "admin@thekeepspace.com") {
								console.log("I'm bad at debugging");
								Router.go('invites');
						} else {
								console.log("not as bad as me!");
								Router.go("home");
						}
						// $("#changePassword").show();
				}
				else {
						alert(err);
				}
		});
	},
	'click #forgotPass': function(){
		var email = $("#loginEmail").val();
		if (email == "") {
			alert("Please enter your email address.");
		} else {
			Accounts.forgotPassword({email: email}, function(err) {
						if (err) {
								if (err.message === 'User not found [403]') {
									console.log('This email does not exist.');
								} else {
									console.log('We are sorry but something went wrong.');
								}
						} else {
					Router.go('/changeEmail');
					setInterval(function(){
					Router.go('/loginPage');
					},5000);
						}
					});
		}
	},
	'click .scrollDown': function(event){
		event.preventDefault();
		$("body, html").animate({ 
				scrollTop: $("#secondSlide").offset().top - em(5.3)
		}, 800);
	},
	"submit .newThoughtSplash": function (event) {
		event.preventDefault();
		$("#submitThoughtPopup").show();
		return false;
	},
	"click #submitNewThoughtHome": function(event) {
		event.preventDefault();
		$("#submitThoughtPopup").show();
		return false
	},
	"click #closeSignupPopup": function(event){
		$("#submitThoughtPopup").hide();
	},
});

Template.splashBanner.helpers({
    'splashThoughts' : function () {
        return SplashThoughts.find({});
    },
	'hiThoughts' : function () {
		return HiThoughts.find({});
	}
});

Template.splashBanner.onRendered(function(){
	$(".alertDiv").click(closeAlert);
	$(".closeAlert").click(closeAlert);
	/*$.keyframe.define([{
	name: animationName,
	'0%': {
			'transform': 'translatex(0px) translatey(0px)'
	},
	'12.5%': {
			'transform': 'translatex(' + (randDir() * (getRandom(5,10))) +'px) translatey(' + (randDir() * (getRandom(5,10))) + 'px)'
	},
	'37.5%': {
			'transform': 'translatex(' + (randDir() * (getRandom(5,10))) + 'px) translatey(' + (randDir() * (getRandom(5,10))) + 'px)'
	},
	'62.5%': {
			'transform': 'translatex(' + (randDir() * (getRandom(5,10))) + 'px) translatey(' + (randDir() * (getRandom(5,10))) + 'px)'
	},
	'87.5%': {
			'transform': 'translatex(' + (randDir() * (getRandom(5,10))) + 'px) translatey(' + (randDir() * (getRandom(5,10))) + 'px)'
	},
	'100%': {
			'transform': 'translatex(0px) translatey(0px)'
	}
	}]);*/
	$("#splashThoughtBox").keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13){
			$('.newThoughtSplash').submit();
			return false;  // stop propagation of the keypress
		}
		return true;
	});
	$(function(){
		$(".icon-downbutton").hover(
			function(){
				// console.log("a");
				$(".icon-downbutton").hide();
				$(".scrollDown").show();
			},
			function() {
				// on mouseout, reset the background colour
				// $('#b').css('background-color', '');
				$(".scrollDown").hide();
				$(".icon-downbutton").show();
				// console.log("b");
		});
		$(".scrollDown").hover(
			function(){
				// console.log("a");
				$(".icon-downbutton").hide();
				$(".scrollDown").show();
			},
			function() {
				// on mouseout, reset the background colour
				// $('#b').css('background-color', '');
				$(".scrollDown").hide();
				$(".icon-downbutton").show();
				// console.log("b");
		});
	});
});
var trimInput = function(val) {
	return val.replace(/^\s*|\s*$/g, "");
};

function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
}
//convert em to pixel
function em(input) {
		var emSize = parseFloat($("body").css("font-size"));
		return (emSize * input);
}

function loginWithFacebook(){
	Meteor.loginWithFacebook(
		{requestPermissions: ['email', 'user_friends', 'user_location', 'user_status',
		'user_posts','publish_actions']}, 
		function(err){
			if (!err){
			Session.set("isFB", true);
			localStorage.setItem("justLoggedIn", "true");
			resetAllFeeds();
			Router.go("home");
			console.log(Meteor.user());
			Meteor.call('getFBUserData', function(err, data) {
				// console.log(JSON.stringify(data, undefined, 4));
			});
			Meteor.call('getFBPostData', function(err, data) {
				// console.log("post data");
				// console.log(data);
				// console.log(JSON.stringify(data, undefined, 4));
				// console.log(data["data"]);
				//check whose post it is using
				//data[(post number)][from][name]
				//only want the one's from the user
			});
			Meteor.call('getFBFriendData', function(err, data){
				var data = JSON.stringify(data, undefined, 4);
				console.log(data);
			});
				// $("#changePassword").hide();
			}
			else{
				console.log(err);
			}
		}
	)	
}
