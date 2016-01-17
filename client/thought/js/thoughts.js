var feed;
var thought_id;
var direction = 1;

function randDir() {
    return (Math.random() < 0.5 ? -1 : 1);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

Template.thought.onRendered(function() {
    var thought = this.data;
    var node = $('#' + thought._id);
    var radius = 75 * (thought.rank+1);
    var container = this.firstNode.parentNode.classList[0];
    /* set css & available buttons based off starting feed */
    var animationName = 'float' + thought._id;
    $.keyframe.define([{
        name: animationName,
        '0%': {
            'transform': 'translatex(0px) translatey(0px)'
        },
        '12.5%': {
            'transform': 'translatex(' + (randDir() * (getRandom(10,37))) +'px) translatey(' + (randDir() * (getRandom(10,37))) + 'px)'
        },
        '37.5%': {
            'transform': 'translatex(' + (randDir() * (getRandom(10,37))) + 'px) translatey(' + (randDir() * (getRandom(10,37))) + 'px)'
        },
        '62.5%': {
            'transform': 'translatex(' + (randDir() * (getRandom(10,37))) + 'px) translatey(' + (randDir() * (getRandom(10,37))) + 'px)'
        },
        '87.5%': {
            'transform': 'translatex(' + (randDir() * (getRandom(10,37))) + 'px) translatey(' + (randDir() * (getRandom(10,37))) + 'px)'
        },
        '100%': {
            'transform': 'translatex(0px) translatey(0px)'
        }
    }]);
    node.css({
        'height' : radius*2 + 'px',
        'width'  : radius*2 + 'px',
        'border-radius' : radius + 'px',
        'line-height' : radius*2 + 'px'
    });
    if (thought.userId == Meteor.userId()) {
        node.css({'background-color' : "#F38286"});
        node.children().get(4).className += " edit-thought";
        node.children().get(4).className += " delete-thought";
    } else if ((container == "friendFeed" && thought.userId != Meteor.userId())
        || thought.collectedBy.includes(Meteor.userId()) && thought.privacy != "public") {
        node.css({'background-color' : "#32C0D2"});
        node.children().get(4).className += " collect-thought";
        node.children().get(4).className += " hide-thought";
    } else {
        node.css({'background-color' : "#FAA43A"});
        node.children().get(4).className += " collect-thought";
        node.children().get(4).className += " hide-thought";
    }
    $('.thought').draggable({
        revert: 'invalid',
        stack: '.thought',
        helper: 'clone',
        appendTo: 'body',
        /*
            thought_id -> BSON _id associated w/Thought
            feed -> <div> feed id
            hide's the actual thought and creates a clone to faciliate dragging
            over the 'feedwrapper' <div>
         */
        start: function(event, ui) {
            thought_id = this.id;
            feed = $(this).parent().get(0).id;
            $(this).hide();
        },
        /*
            If the drag was successful, delete the thought currently masked by hide(),
             else show() the original thought. The clone will be GCd
         */
        stop: function(event, ui) {
            if (feed != $(this).parent().get(0).id) {
                $(this).remove();
            } else {
                $(this).show();
            }
        }
    });
    $('#' + thought._id).playKeyframe({
        name: animationName, // name of the keyframe you want to bind to the selected element
        duration: '17s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
        delay:  getRandom(0,1)+'s', //[optional, default: 0s]  how long you want to wait before the animation starts
        iterationCount: 'infinite' //[optional, default:1]  how many times you want the animation to repeat
    });
});



Template.myFeed.onRendered(function() {
    /*
     Sets #myFeed as a droppable jQueryGUI zone, if the drop thought's
     feed differs from the origin feed, update the privacy settings and append
     the thought to the new feed, else do nothing.
     */
    $( "#myFeed" ).droppable({ //set container droppable
        drop: function(event, ui) { //on drop
            if (event.target.id != feed) {
                Meteor.call("updatePrivacy", thought_id, "private", Meteor.userId());
                if (Meteor.userId() != Thoughts.findOne({_id: thought_id}).userId) {
                    Meteor.call("addToMyCollection", thought_id);
                }
                ui.draggable.css({ // set absolute position of dropped object
                    position: 'absolute',
                    top: ui.position.top - 95, //subtract height of header
                    left: ui.position.left
                }).appendTo('#myFeed'); //append to container
            }
        }
    });
});

Template.friendFeed.onRendered(function() {
    /*
     Sets #friendFeed as a droppable jQueryGUI zone, if the drop thought's
     feed differs from the origin feed, update the privacy settings and append
     the thought to the new feed, else do nothing.
     */
    $( ".friendFeed" ).droppable({
        drop: function(event, ui) {
            if (event.target.id != feed && Thoughts.findOne({_id: thought_id}).userId == Meteor.userId()) {
                Meteor.call("updatePrivacy", thought_id, "friends", Meteor.userId());
                ui.draggable.css({ // set absolute position of dropped object
                    position: 'absolute',
                    top: ui.position.top - 95, //subtract height of header
                    left: ui.position.left
                }).appendTo('.friendFeed'); //append to container
            }
        }
    });
});

Template.worldFeed.onRendered(function() {
    /*
     Sets #worldFeed as a droppable jQueryGUI zone, if the drop thought's
     feed differs from the origin feed, update the privacy settings and append
     the thought to the new feed, else do nothing.
     */
    $( ".worldFeed" ).droppable({ //set container droppable
        drop: function(event, ui) { //on drop
            if (event.target.id != feed && Thoughts.findOne({_id: thought_id}).userId == Meteor.userId()) {
                Meteor.call("updatePrivacy", thought_id, "public", Meteor.userId());
                    ui.draggable.css({ // set absolute position of dropped object
                        position: 'absolute',
                        top: ui.position.top - 95, //subtract height of header
                        left: ui.position.left
                    }).appendTo('.worldFeed'); //append to container
            }
        }
    });
});

Template.thought.events({
    /* Expand a thought */
    'click .condensed': function(event) {
        console.log(this);
        var bubble = $(event.currentTarget);
        var span = bubble.children('span');
        var del = bubble.children('button')
        var p = bubble.children('p');
        var container = $(event.currentTarget.parentNode);
        var radius = Math.min( parseInt(container.css('width')), parseInt(container.css('height')) - 65 );

        bubble.animate({
            width: radius,
            height: radius,
            borderRadius: radius
        });
        bubble.toggleClass('condensed expanded');

        span.removeClass('text');
        span.addClass('text-expanded');
        span.css({'margin-top': radius * 0.12 + 'px'});
        span.fadeOut(function(){
            span.fadeIn();
        });

        p.css({'display': 'block'});

        del.css({'visibility': 'visible'})
        del.css({'margin-top':'5px'})
    },

    /* Condense a thought */
    'click .expanded': function(event) {
        var bubble = $(event.currentTarget);
        var span = bubble.children('span');
        var del = bubble.children('button')
        var p = bubble.children('p');

        bubble.animate({
            width: 150,
            height: 150
        });
        bubble.toggleClass('condensed expanded');

        span.hide();
        span.removeClass('text-expanded');
        span.css({'margin-top':'0px'})
        span.addClass('text');
        span.fadeIn(1000);

        del.css({'visibility': 'hidden'})
        del.css({'margin-top': '0' + 'px'})

        p.css({'display': 'none'});
    },
    /* Deletes a thought */
    "click .delete-thought": function (event) {
        Meteor.call("deleteThought", this._id);
    },
    /* Sets a thought's privacy setting to private */
    "click .unshare-thought": function (event) {
        Meteor.call("setPrivate", this._id, ! this.private);
    },
    'click .collect-thought': function(event) {

    },
    'click .edit-thought': function(event) {

    },
    'click .hide-thought': function(event) {

    }
});

Template.thought.helpers({
    author: function (event) {
        return this.username;
    }
});