# PubNub Remote Debugger : An easy way to debug your mobile web app

This tool allows you to easily debug any app on a remote device. Main features are : 
* Automatically display all the "console.log" events from the remote device app in your local browser.
* Send JS function & scripts to the remote device app through your local browser.

#What is it good for?
Developing mobile web apps often requires debugging, and that when it's getting dirty : in order to view the console logs from your mobile web app you'll usually have to install heavy debuggers or plugins.
PubNub Remote Debugger provide easy solution to that problem - it enables you to see every console log from your mobile device right on your browser window.
In addition, you can invoke functions right inside your mobile device app by sending queries through your local browser.
#How does it work?
To communicate between the local and remote devices I used PubNub, which offers a very easy and cool websockets solutions :
- https://github.com/pubnub

The console-events listener (js-console-listener) is made by ianpgall :
- https://github.com/ianpgall/js-console-listener

#Setup
1. The pubnub keys provided in this project are for demo purposes only. Please create a free Pubnub account, then copy & paste your own keys to run your debugging with.
2. Download the project folder. 
3. Open "remote-device" folder, cut & paste "remote-device-script.js" to your remote mobile web app project directory. Don't forget to include it in your app.
4. Create a new folder in your server or local machine. Copy all PubNub Remote Debugger files into it. 
5. You should now be able to access PubNub Remote Debugger main page in your browser.

#Usage
Once you completed the setup for both devices, you should instantly see some data getting logged in the main console window in your browser.
To send the remote device functions or any script, use the "Send Query" box. The remote web app should respond accordingly.

#Troubleshooting
If you see that your mobile web app fails to load remote-device-script.js when it's included in your index.html file, consider including the script after the app loads (e.g using $.getScript('remote-device-script.js'))

#Code contributions and improvements
As this is the first issue of this tool, feel free to contribute from your own knowledge and improve it.
