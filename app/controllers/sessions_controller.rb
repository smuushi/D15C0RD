class SessionsController < ApplicationController

    # skip_before_action :verify_authenticity_token

    before_action :ensure_logged_in, only: [:destroy]

    def new
        @user = User.new

        render :new

    end

    def create
        debugger
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

        if @user
            login(@user)
            render json: @user
        else
            @user = User.new(email: params[:user][:email])
            # flash.now[:errors] = ["Invalid email or password"]
            render json: 'invalid', status: 404
        end

    end




end