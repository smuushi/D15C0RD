class Api::ServersController < ApplicationController
  # before_action :set_server, only: %i[ show update destroy ]

  # GET /servers
  # GET /servers.json
  def index
    # I want to only render the servers for the current_user???

    @servers = Server.includes(:channels, :subscribers).all

    


  end

  # GET /servers/1
  # GET /servers/1.json
  def show
    @server = Server.find_by_id(params[:id])
  end

  # POST /servers
  # POST /servers.json
  def create
    @server = Server.new(server_params)

    if @server.save
      # owner_subscription = ServerSubscription.new(server_id: @server.id, subscriber_id: server_params[:owner_id])
      # tried to move this to the model for after validation..

      render :show, status: 200
    else
      render json: {error: @server.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /servers/1
  # PATCH/PUT /servers/1.json
  def update

    @server = Server.find_by_id(params[:id])

    if @server.update(server_params)
      render :show, status: :ok
    else
      render json: @server.errors, status: :unprocessable_entity
    end
  end

  # DELETE /servers/1
  # DELETE /servers/1.json
  def destroy
    @server = Server.find_by_id(params[:id])
    @server.destroy
  end


  ###CUSTOM ROUTE BELOW###

  def invite

    new_invite = Invite.new(server_id: params[:id])



    if new_invite.save
      render json: {invite_code: new_invite.invite_code}
    else
      render json: {error: "unable to make new invite..."}, status: 589
    end

  end


  ###########

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_server
    #   @server = Server.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def server_params

      params.require(:server).permit(:owner_id, :name, :icon)
    end
end
