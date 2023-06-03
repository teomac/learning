
/*
*	IMPORTANT:
*	The code will be avaluated based on:
*		Code design  
*
*/
 
 
#include "Timer.h"
#include "RadioRoute.h"


module RadioRouteC @safe() {
  uses {
  	/****** INTERFACES *****/
	interface Boot;

	//interfaces for communication:
	interface Receive;
	interface AMSend;
	interface SplitControl as AMControl;
	interface Packet; //for processing packets

	//interface for timers:
	interface Timer<TMilli> as Timer0;
	interface Timer<TMilli> as Timer1;

	//interface for LED:
	interface Leds;
  }
}
implementation {

  int codice_persona[] = {1,0,6,6,0,3,5,9};		// variable for storing codice persona
  
  int counter = 0;								// counter to access incrementally codice_persona array

  message_t packet;
  
  routing_table_t routing_table;				// declaration of routing table of each node
  
  // Variables to store the message to send
  message_t queued_packet;
  uint16_t queue_addr;
  uint16_t time_delays[7]={61,173,267,371,479,583,689}; //Time delay in milli seconds
  
  
  bool route_req_sent=FALSE;
  bool route_rep_sent=FALSE;
  
  
  bool locked;
  
  bool actual_send (uint16_t address, message_t* packet);
  bool generate_send (uint16_t address, message_t* packet, uint8_t type);
  
  

  
  
  // function used to send messages (every node can't send more than one route request and one route reply)
  bool generate_send (uint16_t address, message_t* packet, uint8_t type){
  /*
  * 
  * Function to be used when performing the send after the receive message event.
  * It store the packet and address into a global variable and start the timer execution to schedule the send.
  * It allow the sending of only one message for each REQ and REP type
  * @Input:
  *		address: packet destination address
  *		packet: full packet to be sent (Not only Payload)
  *		type: payload message type
  *
  * MANDATORY: DO NOT MODIFY THIS FUNCTION
  */
  	if (call Timer0.isRunning()){
  		return FALSE;
  	}else{
  	if (type == 1 && !route_req_sent ){
  		route_req_sent = TRUE;
  		call Timer0.startOneShot( time_delays[TOS_NODE_ID-1] );
  		queued_packet = *packet;
  		queue_addr = address;
  	}else if (type == 2 && !route_rep_sent){
  	  	route_rep_sent = TRUE;
  		call Timer0.startOneShot( time_delays[TOS_NODE_ID-1] );
  		queued_packet = *packet;
  		queue_addr = address;
  	}else if (type == 0){
  		call Timer0.startOneShot( time_delays[TOS_NODE_ID-1] );
  		queued_packet = *packet;
  		queue_addr = address;	
  	}
  	}
  	return TRUE;
  }
  
  event void Timer0.fired() {
  	/*
  	* Timer triggered to perform the send.
  	* MANDATORY: DO NOT MODIFY THIS FUNCTION
  	*/
  	actual_send (queue_addr, &queued_packet);
  }
  
  // this function updates the locked variable if AMSend.send is called successfully
  bool actual_send (uint16_t address, message_t* packet) {
  
	if (locked) {
		return FALSE;
	}
	else {
		
		radio_route_msg_t* rrm = (radio_route_msg_t*)call Packet.getPayload(&packet, sizeof(radio_route_msg_t));
	
		if (rrm == NULL) {
			dbg("error", "Error actual send. \n");
		}
	
		if (call AMSend.send(address, packet, sizeof(radio_route_msg_t)) == SUCCESS) {
			locked = TRUE;
			return TRUE;
		}
	}
	  
  }
  
  // event called when the application is booted
  event void Boot.booted() {
    dbg("boot","Application booted.\n");
    call AMControl.start();
  }

  event void AMControl.startDone(error_t err) {
	if (err == SUCCESS) {
      dbg("radio","Radio on on node %d!\n", TOS_NODE_ID);
      call Timer1.startOneShot(5000);							// if the radio starts correctly, Timer1 starts
    }
    else {
      dbgerror("radio", "Radio failed to start, retrying...\n");
      call AMControl.start();
    }
  }

  event void AMControl.stopDone(error_t err) {
    dbg("boot", "Radio stopped!\n");
  }
  
  // event called when Timer1 fires
  event void Timer1.fired() {
	/*
	* Implement here the logic to trigger the Node 1 to send the first REQ packet
	*/
	
	dbg("timer", "Timer 1 is fired\n");
	
	// if the current node is Node 1, it tries to send the DATA message requested
	if(TOS_NODE_ID == 1) {
		radio_route_msg_t* rrm = (radio_route_msg_t*)call Packet.getPayload(&packet, sizeof(radio_route_msg_t));
		rrm->destination = 7;
		rrm->value = 5;
		rrm->type = 0;
		dbg("radio_send", "Node 1: attempt to send initial message to node 7\n");
		
		// if the destination is not in the routing table, it broadcasts the request
		if (routing_table[rrm->destination - 1].destination == 0) {
			radio_route_msg_t* REQ = (radio_route_msg_t*)call Packet.getPayload(&packet, sizeof(radio_route_msg_t));
			REQ->type = 1;
			REQ->node_requested = 7;
			REQ->sender = 1;
			dbg("radio_send", "The route table of node 1 is empty, trying to send a request broadcast\n");
			generate_send (AM_BROADCAST_ADDR, &packet, REQ->type);
		}
		// if the destination is in the routing table, it sends the message to the next hop (added this else only for completeness, in our case this is never entered)
		else {
			generate_send(routing_table[rrm->node_requested - 1].next_hop, &packet, rrm->type);
		}
	}
  }

  // event called when a node receives a message
  event message_t* Receive.receive(message_t* bufPtr, 
				   void* payload, uint8_t len) {
	/*
	* Parse the receive packet.
	* Implement all the functionalities
	* Perform the packet send using the generate_send function if needed
	* Implement the LED logic and print LED status on Debug
	*/

	// after a message is received, the codice_persona array is accessed with index==counter, to compute which led to toggle
	if(codice_persona[counter] % 3 == 0) {
		call Leds.led0Toggle();
	}
	else if(codice_persona[counter] % 3 == 1) {
		call Leds.led1Toggle();
	}
	else if(codice_persona[counter] % 3 == 2) {
		call Leds.led2Toggle();
	}
	
	// debug added to print the state of leds of node 6 after every update
	if(TOS_NODE_ID == 6) {
		dbg("radio_rec", "\n\nLed state of node %d\n %d%d%d \n\n\n", TOS_NODE_ID, call Leds.get() & LEDS_LED0, call Leds.get() & LEDS_LED1, call Leds.get() & LEDS_LED2);
	}
	
	// the counter is reinitialized to zero to follow the round robin cycle
	if (counter<8) {
		counter++;
	}
	else {
		counter = 0;
	}
	
	
	// control to check if size of received message is correct
	if (len != sizeof(radio_route_msg_t)) {
		dbg("radio_rec", "Size error");
	return bufPtr;}
	
	else {
		// declaration of two messages to access attributes of received/sent message
		radio_route_msg_t* rcm = (radio_route_msg_t*)payload;
		radio_route_msg_t* rcm_packet = (radio_route_msg_t*)call Packet.getPayload(&packet, sizeof(radio_route_msg_t));
		
		// switch statement to perform different operations based on type of message received
		switch(rcm->type) {
			// case --> type==0
			case 0:
				// if the current node is 7, the initial DATA message is arrived to the destination
				if(TOS_NODE_ID == 7) {
					dbg("radio_rec", "Message from node 1 arrived at node 7 with value: %d\n", rcm->value);
					break;
				}
				// if current node is not 7, forward of DATA message to next hop
				else{
					rcm_packet->type = 0;
					rcm_packet->sender = TOS_NODE_ID;
					rcm_packet->destination = 7;
					rcm_packet->value = 5;
					generate_send(routing_table[rcm->node_requested - 1].next_hop, &packet, rcm->type);
					dbg("radio_rec", "Forwarding DATA message to node 7 --> Next hop: %d, Cost: %d\n", routing_table[rcm->node_requested - 1].next_hop, routing_table[rcm->node_requested - 1].cost);
					break;
				}
				
			// case --> type==1
			case 1:
				dbg("radio_rec", "Received route request message with sender: %d and node requested: %d\n", rcm-> sender, rcm->node_requested);
				// if node requested is not current node and not in routing table, broadcast a route request
				if (routing_table[rcm->node_requested - 1].next_hop == 0 && rcm->node_requested != TOS_NODE_ID){
					rcm_packet->type = rcm->type;
					rcm_packet->node_requested = rcm->node_requested;
					rcm_packet->sender = TOS_NODE_ID;
					generate_send(AM_BROADCAST_ADDR, &packet, rcm->type);
					dbg("radio_rec", "Sending route request in broadcast from node %d\n", TOS_NODE_ID);
					
				}
				// if node requested is current node, broadcast a route reply
				else if (rcm->node_requested == TOS_NODE_ID) {
					rcm_packet->type = 2;
					rcm_packet->cost = 1;
					rcm_packet->sender = TOS_NODE_ID;
					rcm_packet->node_requested = rcm->node_requested;
					generate_send(AM_BROADCAST_ADDR, &packet, rcm_packet->type);
					dbg("radio_rec", "Node requested found, sending route reply in broadcast from node %d\n", TOS_NODE_ID);
				}
				// if node requested is not current node but it is present in routing table, broadcast a route reply updating the cost
				else if (routing_table[rcm->node_requested - 1].next_hop != 0 && rcm->node_requested != TOS_NODE_ID) {
					rcm_packet->type = 2;
					rcm_packet->cost = rcm->cost + 1;
					rcm_packet->sender = TOS_NODE_ID;
					generate_send(AM_BROADCAST_ADDR, &packet, rcm_packet->type);
					dbg("radio_rec", "Node requested found in routing table, sending route reply in broadcast from node %d, with updated cost\n", TOS_NODE_ID);
					
				}
				break;
			
			// case --> type==2	
			case 2:
				dbg("radio_rec", "Received route reply message with sender: %d and with updated cost to reach node %d\n", rcm-> sender, rcm->node_requested);
				
				// if current node is 1 and sender is node 3, the shortest path to the destination is available to node 1. Send DATA message to next hop
				if(TOS_NODE_ID == 1 && rcm->sender == 3) {
					routing_table[rcm->node_requested - 1].cost = rcm->cost;
					routing_table[rcm->node_requested - 1].destination = rcm->node_requested;
					routing_table[rcm->node_requested - 1].next_hop = rcm->sender;
					
					
					rcm_packet->type = 0;
					rcm_packet->sender = TOS_NODE_ID;
					rcm_packet->destination = 7;
					rcm_packet->value = 5;
					
					generate_send(routing_table[rcm->node_requested - 1].next_hop, &packet, rcm_packet->type);
					dbg("radio_rec", "Sending DATA message to node 7 --> Next hop: %d, Cost: %d\n", routing_table[rcm->node_requested - 1].next_hop, routing_table[rcm->node_requested - 1].cost);
				}
				
				// if node requested is not in routing table or if the cost received is lower than the current cost, update the cost and broadcast a reply
				else if (routing_table[rcm->node_requested - 1].next_hop == 0 || rcm->cost < routing_table[rcm->node_requested - 1].cost) {
					routing_table[rcm->node_requested - 1].cost = rcm->cost;
					routing_table[rcm->node_requested - 1].destination = rcm->node_requested;
					routing_table[rcm->node_requested - 1].next_hop = rcm->sender;
					
					rcm_packet->type = 2;
					rcm_packet->cost = rcm->cost + 1;
					rcm_packet->sender = TOS_NODE_ID;
					generate_send(AM_BROADCAST_ADDR, &packet, rcm_packet->type);
					dbg("radio_rec", "Sending route reply message in broadcast and updating cost to reach node %d\n", rcm->node_requested);
					
				}
				
				break;
			}
		}
		
		return bufPtr;
    
  }

  event void AMSend.sendDone(message_t* bufPtr, error_t error) {
	if (&queued_packet == bufPtr) {
      locked = FALSE;
      dbg("radio_send", "Packet sent,");
      dbg_clear("radio_send", " timestamp: %s \n", sim_time_string());
    }
    else {
    	dbg_clear("radio_send", "sending error\n");
    }
  }

}