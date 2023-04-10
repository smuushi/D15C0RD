# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord

    validates :name, :owner_id, presence: true

    after_save :create_owner_subscription

    after_create :create_owner_subscription
    

    def create_owner_subscription

        owner_subscription = ServerSubscription.new(server_id: self.id, subscriber_id: self.owner_id)

        if (!ServerSubscription.find_by(server_id: self.id, subscriber_id: self.owner_id))
            owner_subscription.save!
        end


    end


    has_one_attached :icon

    belongs_to(
        :owner, 
        class_name: :User, 
        foreign_key: :owner_id, 
        primary_key: :id
    )

    has_many(
        :channels, 
        class_name: :Channel, 
        foreign_key: :server_id, 
        primary_key: :id, 
        dependent: :destroy
    )

    has_many(
        :subscriptions, 
        class_name: :ServerSubscription, 
        foreign_key: :server_id, 
        primary_key: :id, 
        dependent: :destroy
    )

    has_many(
        :invites, 
        class_name: :Invite, 
        foreign_key: :server_id, 
        primary_key: :id, 
        dependent: :destroy
    )

    has_many(
        :subscribers, 
        through: :subscriptions, 
        source: :subscriber
    )



end
