Tickets = new Mongo.Collection("tickets");
Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Template.hello.helpers({
    posts: function(){
      return Posts.find();
    },
    counter: function () {
      return Session.get('counter');
    }
  });
  
  Template.post.events({
    'submit form.ticket': function(e){
      e.preventDefault();
      Tickets.insert({name: e.target.name.value, postId: this._id})
    }
  })
  
  Template.ticket.helpers({
  })
  Template.ticket.events({
    "click .btn-ok": function(){
      Tickets.update(this._id, {$set: {status: "OK"}});
    },
    "click .btn-ng": function(){
      Tickets.update(this._id, {$set: {status: "NG"}});
    },
    "click .btn-none": function(){
      Tickets.update(this._id, {$set: {status: ""}});
    }

    
  });
  
  
  Template.post.helpers({
    tickets: function(){
      return Tickets.find({postId: this._id})
    }
  })

  Template.hello.events({
    'submit form.post': function(e){
      e.preventDefault();
      Posts.insert({name: e.target.name.value})
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
