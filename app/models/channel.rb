# == Schema Information
#
# Table name: channels
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  name        :string           not null
#  server_id   :bigint           not null
#  description :string
#
class Channel < ApplicationRecord

    validates :name, :server_id, presence: true

    
    has_many(
        :messages,
        class_name: :Message,
        foreign_key: :context_id,
        primary_key: :id,
        dependent: :destroy
    )

    belongs_to(
        :Server, 
        class_name: :Server, 
        foreign_key: :server_id, 
        primary_key: :id
    )

end
