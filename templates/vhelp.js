{% load vline_tags %}


document.write(" <div> <img src='/static/Chathead.png' id = 'chathead' style='position:fixed; right:0; bottom:0; z-index:99999'/> </div><div class='row'><div class='span4'><p><button data-userid='4' id = 'foo' class='btn callbutton' ></button></p></div> </div><div id = 'video_panel' style = 'position:fixed;bottom:0;right:0;height:200px;width:200px'></div>");

$('#chathead').click( function(){
  $('#foo').trigger('click');
  $('#chathead').hide();

});


var vlineClient = (function(){
  
  localStorage && console.log(localStorage.call_active);



  var client, session,

    
    serviceId = {% vline_service_id %};

    {% if user.is_authenticated %}
    var authToken = {{ user|vline_auth_token|safe }}, 
    profile = {{ user|vline_user_profile|safe }}; 
    
    {% else %}

    

    var authToken = '{{ auth_token|safe }}',
    profile = {{ profile|safe }};

    {% endif %}

  // Create vLine client  
  window.vlineClient = client = vline.Client.create({"serviceId": serviceId, "ui": true, "uiVideoPanel": "video_panel", "uiLocalVideo": false, "uiOutgoingDialog": false});
  // Add login event handler
  client.on('login', onLogin);
  // Do login
  client.login(serviceId, profile, authToken);

  client.on("add:mediaSession", onMediaSession);
  client.on("recv:im", onNewMessage);

  function onNewMessage(event) {
    console.log(event.message.getBody());
  }



  function onLogin(event) {
    session = event.target;

  window.setTimeout(function(){
   if(localStorage.call_active == "true"){
      $('#chathead').hide();

   // var userId = button.getAttribute('data-userid');
    
      // fetch person object associated with username
     if (session.getLocalPerson().getId() !== 'vhelp:4') {
      session.getPerson('vhelp:4').done(function(person) {
          
          if (person.getPresenceState() === 'online') {
            console.log("auto starting call");  
              $('#chathead').hide();
            person.startMedia();
            //console.log("Sending Message");
            //person.publishMessage(location.href);  
          } else {
           person.on('change:presenceState', function(e){
                 
              if (person.getPresenceState() === 'online') {
               console.log("auto starting call on online");
                 $('#chathead').hide();
                person.startMedia();
                  //console.log("Sending Message");
                  //person.publishMessage(location.href); 
              } 
           });
        }
          
      });
     }

      
   }
  }, 500);

    // Find and init call buttons
    var callButtons = document.getElementsByClassName('callbutton');
    for (var i=0; i < callButtons.length; ++i) {
      initCallButton(callButtons[i]);
    }
  }


  function onMediaSession(event) {
    var mediaSession = event.target;
    mediaSession.on("enterState:active", onActive);
    mediaSession.on("enterState:closed", onClosed);
  }

   function onActive(event) {
    console.log("active");
    if (localStorage) {
      localStorage.call_active = true;
    } 
  }

  function onClosed(event) {
    console.log("closed");
    if (localStorage) {
      localStorage.call_active = false;
    } 
  }

  //window.addEventListener("load", loadfunc);
 //  window.addEventListener("onunload", unloadf);

 // function unloadf(event) {
 //  console.log("unloading");
 //   session.getPerson('4').done(function(person) {
      
 //          person.endMedia();
 //          //console.log("Sending Message");
 //      });
 //  }



 function loadfunc(event) {
   // console.log("auto starting call");
  //  console.log("window closed");
  //  localStorage.navigated = true;
  window.setTimeout(function(){
   if(localStorage.call_active == "true"){
    console.log("auto starting call");
   // var userId = button.getAttribute('data-userid');
    
      // fetch person object associated with username
      session.getPerson('4').done(function(person) {
      
          person.startMedia();
          //console.log("Sending Message");
          person.publishMessage(location.href);
      });
   }
  }, 1000);
 }

 
  // add event handlers for call button
  function initCallButton(button) {
    var userId = button.getAttribute('data-userid');
  
    // fetch person object associated with username
    session.getPerson(userId).done(function(person) {
      // // update button state with presence
      // function onPresenceChange() {
      //   button.setAttribute('data-presence', person.getPresenceState());
      // }
    
      // // set current presence
      // onPresenceChange();
    
      // // handle presence changes
      // person.on('change:presenceState', onPresenceChange);
    
      // start a call when button is clicked
      button.addEventListener('click', function() {
        person.startMedia();
        //console.log("Sending Message");
        person.publishMessage(location.href);
      });
    });
  }
  
  return client;
})();



