class Api::ServersController < ApplicationController
  # before_action :set_server, only: %i[ show update destroy ]

  # GET /servers
  # GET /servers.json
  def index
    # I want to only render the servers for the current_user???
    all_servers = Server.all



    @servers = Server.all

    


  end

  # GET /servers/1
  # GET /servers/1.json
  def show

  end

  # POST /servers
  # POST /servers.json
  def create
    @server = Server.new(server_params)

    if @server.save
      render :show, status: :created, location: @server
    else
      render json: @server.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /servers/1
  # PATCH/PUT /servers/1.json
  def update
    if @server.update(server_params)
      render :show, status: :ok, location: @server
    else
      render json: @server.errors, status: :unprocessable_entity
    end
  end

  # DELETE /servers/1
  # DELETE /servers/1.json
  def destroy
    @server.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_server
      @server = Server.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def server_params
      params.fetch(:server, {})
    end
end