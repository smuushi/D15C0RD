class Api::UsersController < ApplicationController
  # before_action :set_user, only: %i[ show update destroy ]

  # before_action :require_logged_in
  #COMMENT THIS BACK IN LATER

  # GET /users
  # GET /users.json
  def index
    # debugger
    if false #!current_user
      render json: {error: 'u need to be logged in to see everyone'}, status: :unauthorized
    else

      @users = User.all

      render :index

    end

  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find_by(id: params[:id])
  end

  # POST /users
  # POST /users.json

  def create

    if current_user
      render json: {error: 'bad from current user already detected/ur already logged in.. '}, status: :unauthorized
    else 

      @user = User.new(user_params)

      if @user.save
        login(@user)
        render :show, status: 200
      else

        render json: @user.errors, status: :unprocessable_entity
        # render json: {error: 'bad'}, status: 400

      end

    end

    
  end

  # def create
  #   @user = User.new(user_params)

  #   if @user.save
  #     render :show, status: :created, location: @user
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update

    @user.find_by()

    if @user.update(user_params)
      render :show, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_user
    #   @user = User.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :username, :tag, :password)
    end
end