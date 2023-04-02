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
        render json: {error: ["wrong creds hehehe"]}, status: 401
      end
  
    end
  
    def destroy

      if current_user
    
        logout!

        render json: {message_from_your_beloved: "reset the session token for the detected current user and then reset the browser's session token to nil/null lmao"}, status: 200

      else 

        render json: {message_from_your_beloved: "kinda had some weird situation where I'm not getting a current user... help!"}, status: 500

      end
  
    end
  
  end