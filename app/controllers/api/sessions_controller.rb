class Api::SessionsController < ApplicationController
    def show
  
      if current_user
        @user = current_user
        render 'api/users/show'
        # debugger
      else 
        # debugger
        if !@user
          puts "hello???????"
          puts json: {user: nil}, status: 209
          render json: {user: nil}, status: 209
        end
      end
  
    end
  
    def create
  
      @user = User.find_by_credentials(params[:email], params[:password])
  
      # debugger
  
      if !!@user
        session[:session_token] = @user.reset_session_token!
        render "api/users/show"
      else
        render json: {error: "wrong creds"}, status: 401
      end
  
    end
  
    def destroy
  
      logout
  
    end
  
  end