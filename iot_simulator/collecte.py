#!/usr/bin/python3

import time
import json
import paho.mqtt.client as mqtt
from shapely.geometry import Point, Polygon
from random import randint

mqttc = mqtt.Client()
mqttc.connect("tracker.snootlab.com", 1883)

with open('recup-verre.json','r') as f:
    collecte_verre = json.loads(f.read())

with open('tls_center.json','r') as f:
    tls_center = json.loads(f.read())

tls_center_polygon = []
for point in tls_center:
    tls_center_polygon.append((point['lat'], point['lng']))
tls_center_geofence = Polygon(tls_center_polygon)

mqttc.loop_start()

while True:
    collecte_point = collecte_verre[randint(0, len(collecte_verre)-1)]
    msg = {}
    msg['name'] = collecte_point['recordid']
    msg['points'] = collecte_point['fields']['geo_point_2d']
    msg['level'] = randint(0,5)

    point = Point(msg['points'][0], msg['points'][1])
    if point.within(tls_center_geofence) :
        mqttc.publish('collecte/', json.dumps(msg))

    time.sleep(0.01)
