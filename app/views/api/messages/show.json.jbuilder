json.channel do
    json.partial! "api/channels/channel", channel: @channel
end

json.message do 
    json.partial! "api/messages/message", message: @message
end