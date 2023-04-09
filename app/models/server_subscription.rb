# == Schema Information
#
# Table name: server_subscriptions
#
#  id            :bigint           not null, primary key
#  subscriber_id :bigint           not null
#  server_id     :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class ServerSubscription < ApplicationRecord

    validates :subscriber_id, :server_id , presence: true

    validates :subscriber_id, uniqueness: {scope: :server_id, message: "already subscribed"}



    belongs_to(
        :server, 
        class_name: :Server, 
        foreign_key: :server_id, 
        primary_key: :id
    )

    belongs_to(
        :subscriber, 
        class_name: :User, 
        foreign_key: :subscriber_id, 
        primary_key: :id
    )

end
