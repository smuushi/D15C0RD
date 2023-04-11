class ChannelChannel < ApplicationCable::Channel


    def subscribed
        # debugger
        channel = Channel.find_by_id(params[:channel_id])

        stream_for channel

    end

    def receive(data)

        
    end


end