class Api::ServerSubscriptionsController < ApplicationController
  # before_action :set_server_subscription, only: %i[ show update destroy ]

  # GET /server_subscriptions
  # GET /server_subscriptions.json
  def index
    @server_subscriptions = ServerSubscription.all
  end

  # GET /server_subscriptions/1
  # GET /server_subscriptions/1.json
  def show
  end

  # POST /server_subscriptions
  # POST /server_subscriptions.json
  def create

    # debugger

    @invite_code = Invite.find_by(invite_code: server_subscription_params[:invite])

    if @invite_code
      server_id = @invite_code.server.id
      @server_subscription = ServerSubscription.new(subscriber_id: server_subscription_params[:subscriber_id], server_id: server_id)
      # debugger

      if @server_subscription.save
        render :show, status: :created 
      else
        render json: @server_subscription.errors.full_messages, status: 469

      end

    else
      render json: ["invite is so invalid it hurts... oh god"], status: 469
    end

    # @server_subscription = ServerSubscription.new()

    # if @server_subscription.save
    #   render :show, status: :created, location: @server_subscription
    # else
    #   render json: @server_subscription.errors, status: :unprocessable_entity
    # end
  end

  # PATCH/PUT /server_subscriptions/1
  # PATCH/PUT /server_subscriptions/1.json
  def update
    if @server_subscription.update(server_subscription_params)
      render :show, status: :ok, location: @server_subscription
    else
      render json: @server_subscription.errors, status: :unprocessable_entity
    end
  end

  # DELETE /server_subscriptions/1
  # DELETE /server_subscriptions/1.json
  def destroy
    #params can hold the serverId since i can use subId from earlier architecture.. 
    # debugger
    @user = User.includes(:subscriptions).find_by_id(server_subscription_params[:subscriber_id])

    @subscription_to_destroy = @user.subscriptions.where(server_id: params[:id])[0]

    if @subscription_to_destroy

      # debugger

      @subscription_to_destroy.destroy

      # @server = Server.find_by_id(params[:id]) 
      # don't need to render back server info to update the store for the end user
      # because they left the server lmao... 
      # debugger

      render 'api/users/show', status: 200

    else 

      render json: "could not find subscription to destroy...??", status: 469

    end



  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_server_subscription
    #   @server_subscription = ServerSubscription.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def server_subscription_params
      params.require(:subrequest).permit(:subscriber_id, :invite)
    end
end
