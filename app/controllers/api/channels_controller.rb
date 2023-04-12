class Api::ChannelsController < ApplicationController
  # before_action :set_channel, only: %i[ show update destroy ]

  # GET /channels
  # GET /channels.json

  before_action :require_logged_in, only: [:destroy]

  def index
    @channels = Channel.includes(:messages).all
  end

  # GET /channels/1
  # GET /channels/1.json
  def show
    @channel = Channel.find_by_id(params[:id])
    # debugger
    if @channel
      render :show, status: 200;
    else 
      render json: "idk how we reached here..", status: 500;
    end
  end

  # POST /channels
  # POST /channels.json
  def create

    # debugger

    @channel = Channel.new(channel_params)

    if @channel.save

      @server = Server.includes(:channels).find_by_id(channel_params[:server_id])

      ServerChannel.broadcast_to(@server, {type: "newchannel", channel: @channel, server_channels: @server.channels.ids})

      render :show, status: :created 
    else
      render json: {error: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /channels/1
  # PATCH/PUT /channels/1.json
  def update

    @channel = Channel.find_by_id(params[:id])    

    if @channel.update(channel_params)
      render :show, status: :ok
    else
      render json: {error: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /channels/1
  # DELETE /channels/1.json
  def destroy
    @channel = Channel.find_by_id(params[:id])

    @channel.destroy
    @server = Server.find_by_id(@channel.server_id)
    ServerChannel.broadcast_to(@server, {type: "destroyedchannel", server_channels: @server.channels.ids})

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_channel
    #   @channel = Channel.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def channel_params
      params.require(:channel).permit(:server_id, :name, :description)
    end
end
