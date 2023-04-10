module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_user

    def connect 

      self.current_user = User.find_by(session_token: request.session[:session_token])
      # debugger

    end

  end
end
