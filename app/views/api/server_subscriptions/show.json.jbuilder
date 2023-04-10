json.partial! "api/server_subscriptions/server_subscription", server_subscription: @server_subscription

json.server do
    json.partial! "api/servers/server", server: @server

end