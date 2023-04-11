# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  content    :string           not null
#  context_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord

    validates :author_id, :context_id,  presence: true

    after_initialize :ensure_not_nil

    has_one_attached :picture


    belongs_to(
        :channel,
        class_name: :Channel, 
        foreign_key: :context_id,
        primary_key: :id
    )

    belongs_to(
        :author,
        class_name: :User,
        foreign_key: :author_id,
        primary_key: :id
    )





    private 

    def ensure_not_nil 

        # debugger

        if self.content == nil 
            # debugger
            self.content = ""
        end


    end

end
