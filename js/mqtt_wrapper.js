var mqtt;
var reconnectTimeout = 2000;

var host = "tracker.snootlab.com";
var port = 443;
var path = "/mqtt/";

var useTLS = true;
var username = null;
var password = null;
var cleansession = true;

var tracker_time_last_message = new Map;
var trackers = new Map;
var drawPaths = true;

function MQTTconnect()
{
	mqtt = new Paho.MQTT.Client(
			host,
			port,
			path,
			"web_" + parseInt(Math.random() * 100, 10)
	);

	var options = {
		timeout: 3,
		useSSL: useTLS,
		cleanSession: cleansession,
		onSuccess: onConnect,
		onFailure: onFailure,
	};

	mqtt.onConnectionLost = onConnectionLost;
	mqtt.onMessageArrived = onMessageArrived;
	mqtt.connect(options);
}

function onConnect()
{
	mqtt.subscribe("collecte/");
	console.log("Connected to " + host);
}

function onConnectionLost(response)
{
	setTimeout(MQTTconnect, reconnectTimeout);
};

function onFailure(message)
{
	setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(message)
{
	var topic = message.destinationName;
	var payload = JSON.parse(message.payloadString.replace(/'/g,'"'));

	if( topic == 'collecte/' )
	{
		collecte_verre_new_message(topic, payload);
	}
}
