# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  tag             :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true

    validates :password, length: {minimum: 5}, allow_nil: true

    before_validation :ensure_session_token

    has_one_attached :avatar

    attr_reader :password

    def password=(pw)

        self.password_digest = BCrypt::Password.create(pw)
        @password = pw

    end

    def generate_unique_session_token
        token = SecureRandom.urlsafe_base64(12)

        while User.exists?(session_token: token)
            token = SecureRandom.urlsafe_base64(12)
        end
        return token

    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token

    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)

        if @user && @user.is_password?(password)
            return @user
        else
            return nil
        end
    end

    def is_password?(password)

        bcrypt_obj = BCrypt::Password.new(self.password_digest)

        bcrypt_obj.is_password?(password)

    end


    has_many(
        :servers, 
        class_name: :Server, 
        foreign_key: :owner_id,
        primary_key: :id,
        dependent: :destroy
    )

    has_many(
        :subscriptions, 
        class_name: :ServerSubscription, 
        foreign_key: :subscriber_id, 
        primary_key: :id, 
        dependent: :destroy
    )

    has_many(
        :joined_servers,
        through: :subscriptions,
        source: :server
    )

    

end
