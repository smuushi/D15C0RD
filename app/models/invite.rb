# == Schema Information
#
# Table name: invites
#
#  id          :bigint           not null, primary key
#  server_id   :bigint           not null
#  invite_code :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Invite < ApplicationRecord

    validates :server_id, :invite_code, presence: true
    validates :invite_code, uniqueness: true

    after_initialize :ensure_code   


    belongs_to(
        :server, 
        class_name: :Server, 
        foreign_key: :server_id, 
        primary_key: :id
    )

    def generate_unique_invite_code

        possible_code = SecureRandom.urlsafe_base64(6)

        while(Invite.exists?(invite_code: possible_code))
            possible_code = SecureRandom.urlsafe_base64(6)
        end

        return possible_code

    end

    def ensure_code

        self.invite_code ||= generate_unique_invite_code


    end

end
