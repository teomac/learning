import pyshark

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
            print(pkt.coap.code)