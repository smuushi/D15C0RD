json.extract! server, :name, :owner_id, :id, :created_at, :updated_at
json.icon server.icon.attached? ? server.icon.url : nil

# json.url server_url(server, format: :json)
