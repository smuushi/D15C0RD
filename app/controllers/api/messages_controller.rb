class Api::MessagesController < ApplicationController

    def index

        @messages = Message.includes(:picture_blob).all

    end


    def create

        # debugger

        # debugger



        @message = Message.new(message_params)


        if @message.save 
            @channel = Channel.find_by_id(params[:context_id])

            ChannelChannel.broadcast_to(@channel, {message_list: @channel.messages.ids, message: @message, picture: @message.picture.url})
        
            render :show, status: :created

        else

            debugger


        end

    end


    def destroy

    end

    def updated_at

    end


    def message_params 

        params.require(:message).permit(:content, :context_id, :author_id, :picture)

    end

end
