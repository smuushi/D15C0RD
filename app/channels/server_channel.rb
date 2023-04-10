class ServerChannel < ApplicationCable::Channel


    def subscribed
        # debugger
        server = Server.find_by_id(params[:server_id])

        stream_for server

    end

    def receive(data)

        
    end


end