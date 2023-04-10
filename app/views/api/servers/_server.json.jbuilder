json.extract! server, :name, :owner_id, :id, :created_at, :updated_at
json.icon server.icon.attached? ? server.icon.url : nil

json.channels do 

    json.array! server.channels.ids

end

json.subscribers do 

    json.array! server.subscribers.ids

end



# json.url server_url(server, format: :json)
