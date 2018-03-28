
var collecte_point_active = new Map();

var container_level_icons = [
	L.icon({iconUrl: 'img/battery_0.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
	L.icon({iconUrl: 'img/battery_1.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
	L.icon({iconUrl: 'img/battery_2.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
	L.icon({iconUrl: 'img/battery_3.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
	L.icon({iconUrl: 'img/battery_4.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
	L.icon({iconUrl: 'img/battery_5.svg',iconSize:[40, 40],iconAnchor:[20, 20]}),
];

function collecte_verre_new_message(topic, payload)
{
	if( collecte_point_active.has(payload.name) )
	{
		change_collecte_point_level(payload.name, payload.level)
	}
	else
	{
		create_collecte_point(payload.name, payload.points, payload.level);
	}
}

function create_collecte_point(name, points, level)
{
	var new_collecte_point = L.marker([points[0], points[1]], {icon: container_level_icons[level]}).addTo(mymap);
	collecte_point_active.set(name, new_collecte_point);
}

function change_collecte_point_level(name, level)
{
	collecte_point_active.get(name).setIcon(container_level_icons[level]);
}
