
$(document).ready(function(){

	//-------------------------------------------------------------------------
	// Pubnub initialization
	//-------------------------------------------------------------------------
  	
  	// choose unique names!
    var myChannel = 'debug';
    var myName = 'Local Debugger';

  	var pubnub = PUBNUB.init({
        publish_key: 'pub-c-989553e9-6a75-4602-8b21-14501f77e2f8',
        subscribe_key: 'sub-c-6e147c98-1117-11e4-8bd3-02ee2ddab7fe',
        uuid: myName
    });

   	pubnub.subscribe({
	    channel: myChannel,
	    presence: function(data){

    		if (data['action'] == 'join' && myName == data.uuid) {
    			appendData('You joined the session as ['+data.uuid +']', 'text-primary');
    		} 

    		$('.connected-users-list').html(data.occupancy);
  		},
	    message: function(m){
			appendData(m, 'text-info');
	    },
	    error: function (error) {
	      	appendData(m, 'text-danger');
	    }
	});

    function publish(a, m) {
        pubnub.publish({
		    channel: myChannel,        
		    message: m,
		    callback : function(m){}
		});
    };

    function unsubscribe() {
        pubnub.unsubscribe({
		    channel: myChannel,
		    callback : function(){
		    	appendData('You choosed to end your seesion. Refresh to reconnect', 'text-danger');
		    }
		});
    };

	//-------------------------------------------------------------------------
	// Other DOM actions
	//-------------------------------------------------------------------------

	$('.submit-message').on('click', function (){ 
		publish(myChannel, {
				isFunction: $('.message-textarea').val()
			}
		); 
	});

	$('.unsubscribe-from-channel').on('click', function (){ 
		unsubscribe();
	});

	function appendData(data ,displayClass){
		data = JSON.stringify(data, null, 4);
		$('.live-logger').append('<br><div class="' +(displayClass ? displayClass : '') +'">['+ new Date().toTimeString().split(' ')[0] +'] : ' +data+ '</span><br>'); 
		$('pre').animate({ scrollTop: $('pre')[0].scrollHeight}, 4000);
	}

});
