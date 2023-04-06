class ApplicationController < ActionController::API

    before_action :snake_case_params, :attach_authenticity_token

    include ActionController::RequestForgeryProtection
  
    protect_from_forgery with: :exception

    def current_user
        @current_user ||= User.includes(:servers).find_by(session_token: session[:session_token])

    end


    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logged_in?
        !!current_user
    end

    def logout!
        current_user.reset_session_token!

        session[:session_token] = nil

        @current_user = nil

    end

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized 
        end
    end



private

    def snake_case_params
        # debugger
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
        #COMMENT OUT THIS LINE TO GET JSON FROM BROWSER
    end


end
