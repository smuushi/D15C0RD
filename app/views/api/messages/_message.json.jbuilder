json.extract! message, :content, :author_id, :id, :context_id, :created_at, :updated_at

json.picture message.picture.attached? ? message.picture.url : nil



