import pyshark

# question 1

capture0 = pyshark.FileCapture('challenge2023_1.pcapng', display_filter = "coap.code == 132 and ip.src == 127.0.0.1")
counter = 0
mids = []

for pkt in capture0:
    mids.append(pkt.coap.mid)

capture01 = pyshark.FileCapture('challenge2023_1.pcapng', display_filter = "coap.code == GET")

for pkt in capture01:
    if(pkt.coap.mid in mids):
        counter += 1
print(counter)

# questions 1-2

capture = pyshark.FileCapture('challenge2023_1.pcapng', display_filter = "coap.code == DELETE and ip.dst == 134.102.218.18")

token = []
mid = []

for pkt in capture:
    if hasattr(pkt.coap, 'token'):
        token.append(pkt.coap.token)
    mid.append(pkt.coap.mid)

capture2 = pyshark.FileCapture('challenge2023_1.pcapng', display_filter = "coap.code == DELETE and coap.opt.uri_path == hello")

count = 0
token_hello = []
mid_hello = []

for pkt in capture2:
    if hasattr(pkt.coap, 'token'):
        if(pkt.coap.token in token):
            print(pkt.coap.code)
            token_hello.append(pkt.coap.token)
            count = count + 1
    else:
        if(pkt.coap.mid in mid):
            print(pkt.coap.type)
            mid_hello.append(pkt.coap.mid)
            count = count + 1

print('count = ', count)

print('-----------------------------')

capture3 = pyshark.FileCapture('challenge2023_1.pcapng', display_filter = "coap")

for pkt in capture3:
    if hasattr(pkt.coap, 'token'):
        if(pkt.coap.token in token_hello):
            continue
            #print(pkt.coap.code)


# question 3
# test.mosquitto.org ip 91.121.93.94
# filter: mqtt and ip.dst==91.121.93.94 and mqtt.topic contains "+"

# question 4
# filter: mqtt and mqtt.willmsg and mqtt.willtopic contains "university"

# question 5
# HiveMQ ip: 3.65.137.17 or 52.29.173.150
# ports of clients connected to hivemq: 47723, 45635, 37401, 46967, 47549, 42827, 60609, 57265, 36665 (10.0.2.15)
# mqtt.qos==1 and ip.dst==10.0.2.15 and (ip.src==52.29.173.150 or ip.src==3.65.137.17)
# and tcp.port in {47723, 45635, 37401, 46967, 47549, 42827, 60609, 57265, 36665}

# question 6
# filter: mqttsn.pub.msg and frame.time > "Mar 14, 2023 15:16:00" and mqttsn.topic.id==9