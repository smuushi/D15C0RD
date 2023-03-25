class SessionsController < ApplicationController


    before_action :ensure_logged_in, only: [:destroy]

    def new
        @user = User.new

        render :new

    end

    def create

        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

        if @user
            login(@user)
            redirect_to users_url
        else
            @user = User.new(email: params[:user][:email])
            flash.now[:errors] = ["Invalid email or password"]
            render :new
        end

    end




end