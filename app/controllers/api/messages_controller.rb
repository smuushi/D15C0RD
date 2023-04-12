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

            ChannelChannel.broadcast_to(@channel, {message_list: @channel.messages.ids, message: from_template('api/messages/message', message: @message), picture: @message.picture.url})
        
            render :show, status: :created

        else

            debugger


        end

    end


    def destroy


        @message = Message.find_by_id(params[:id])

        if current_user.id != @message.author_id 
            render json: {error: "unauthorized"}, status: 401
        
        elsif @message.destroy
            
            @channel = Channel.includes(:messages).find_by_id(@message.context_id)
            ChannelChannel.broadcast_to(@channel, {message_list: @channel.messages.ids})

            render json: {message_list: @channel.messages.ids}

        else
            render json: {error: "bad"}, status: 469
        end

    end

    def update
        @message = Message.includes(:channel).find_by_id(params[:id])



        if @message.update(content: message_params[:content])

            @channel = Channel.find_by_id(@message.context_id)

            ChannelChannel.broadcast_to(@channel, {message_update: from_template("api/messages/message", message: @message)})

            render partial: "api/messages/message", locals: {message: @message}, status: 200

        else 
            render json: @message.errors.full_messages, status: 409
        end
        

    end

    def from_template(partial, locals = {})
        JSON.parse(self.class.render(:json, partial: partial, locals: locals))
    end


    def message_params 

        params.require(:message).permit(:content, :context_id, :author_id, :picture)

    end

end
