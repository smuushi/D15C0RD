json.extract! channel, :id, :name, :server_id, :description, :created_at, :updated_at

json.messages do 

    json.array! channel.messages.ids

end

