$(document).ready(function() {
    $.getScript('http://cdn.pubnub.com/pubnub-3.7.13.min.js').done(function() {
        $.getScript('http://lynxpeer.com/debugger/js/console-listener.js').done(function() {
            
            //-------------------------------------------------------------------------
            // Pubnub initialization
            //-------------------------------------------------------------------------

            // choose a unique channel name
            var myChannel = 'debug';
            var myName = 'Remote App';

            var pubnub = PUBNUB.init({
                publish_key: 'pub-c-989553e9-6a75-4602-8b21-14501f77e2f8',
                subscribe_key: 'sub-c-6e147c98-1117-11e4-8bd3-02ee2ddab7fe',
                uuid: myName
            });
            
            pubnub.subscribe({
                channel: myChannel,
                message: function(m) {
                    if (m.isFunction) {
                        $.globalEval(m.isFunction);
                    }
                },
                error: function(error) {
                    alert('Pubnub subscribe error - :' + error);
                },
                presence: function(data) {
                    if (data['action'] == 'join') {
                        publish(myChannel, 'Remote device [' + data.uuid + '] has joined the session');
                    } 
                },
            });

            function publish(a, m) {
                pubnub.publish({
                    channel: myChannel,
                    message: m,
                    callback: function(m) {}
                });
            };

            //-------------------------------------------------------------------------
            // console-listener event actions
            //-------------------------------------------------------------------------

            // on console.log, publish a message containing the log data
            ConsoleListener.on("log", function(data) {
                if (data != '1') {
                    publish(myChannel, data);
                }
            });

            //-------------------------------------------------------------------------
            // Other DOM actions
            //-------------------------------------------------------------------------
            $("button").on("click", function() {
                console.log($("body"));
            });
        });
    });
})