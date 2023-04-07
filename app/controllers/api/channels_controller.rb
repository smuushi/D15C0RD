class Api::ChannelsController < ApplicationController
  # before_action :set_channel, only: %i[ show update destroy ]

  # GET /channels
  # GET /channels.json
  def index
    @channels = Channel.all
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
      render :show, status: :created 
    else
      render json: {error: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /channels/1
  # PATCH/PUT /channels/1.json
  def update
    if @channel.update(channel_params)
      render :show, status: :ok, location: @channel
    else
      render json: {error: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /channels/1
  # DELETE /channels/1.json
  def destroy
    @channel = Channel.find_by_id(params[:id])

    @channel.destroy
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
