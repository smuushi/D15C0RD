## Websocketing

- Set up rails to receive subscriptions and connections through react’s ActiveCable library through

   — create the consumer with ActionCable.createConsumer(), and pass in the path that the rails server will respond to. 

- on that consumer variable or pointer or just appended onto it, create the subscription through 

   — <<consumer>>.subscriptions.create(), and pass in the channel name as the first argument.. (I could pass in an object hash, but it MUST have the key of channel in order to route to the right place, and then extra keys will be params when it reaches the channel rb file. 
   
   - You can use ActionCable.createConsumer() to connect to the cable server if action_cable_meta_tag is invoked in the layout. Otherwise, A path is specified as first argument to createConsumer (e.g. ActionCable.createConsumer("/websocket")).