json.extract! user, :id, :username, :tag, :email, :created_at, :updated_at

json.servers do 
    json.array! user.servers.ids
end
# json.url user_url(user, format: :json)
