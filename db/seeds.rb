# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# require "open-uri"

# ActiveRecord::Base.transaction do 

#     User.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:users)

#     Server.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:servers)

#     Channel.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:channels)

#     ServerSubscription.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:server_subscriptions)

#     User.create(username:"DemoUser", email:"demo@demo.io", password:"password", about:"this is the demo user!", tag:"0900")
#     User.create(username:"Papaya", email:"papaya@paired.com", password:"testing", tag: "0780")
#     User.create(username:"GarySeed", email:"gary@paired.com", password:"testing", about:"nice guy here!" ,tag: "1800")
#     User.create(username:"KellySeed", email:"kelly@paired.com", password:"testing", about:"Developer of Sbotify" ,  tag:"2468")
#     User.create(username:"SamSeed", email:"sam@paired.com", password:"testing", about:"Developer of Moodify", tag: "9595")
#     User.create(username:"MilnerSeed", email:"milner@paired.com", password:"testing", about: "Developer of best Barnes and Nobles clone!",tag: "1234")
#     User.create(username:"TimSeed", email:"tim@paired.com", password:"testing", about:"pro gamer and developer of staream!" ,tag: "0019")
#     User.create(username:"KaiterSeed", email:"kaiter@paired.com", password:"testing", about:"developer of spacebook! waifuhunter49", tag: "8903")
#     User.create(username:"SaraSeed", email:"sara@paired.com", password:"testing", about:"zelp developer! nakama" ,tag: "1090")
#     User.create(username:"ShanSeed", email:"shan@paired.com", password:"testing", about:"career caresser" ,tag: "1090")
#     User.create(username:"Michael Shih", email: "michael@paired.com", password:"testing", about:"Thanks for visiting my discord clone! Visit my github!", tag:"9876")
    
# end

#     users = User.all 

#     users[2].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/garyseed.png"), filename: "garyseed.png")
#     users[3].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/kellyseed.png"), filename: "kellyseed.png")
#     users[4].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/samseed.png"), filename: "samseed.png")
#     users[5].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/milnerseed.png"), filename: "milnerseed.png")
#     users[6].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/timseed.png"), filename: "timseed.png")
#     users[7].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/kaiterseed.png"), filename: "kaiterseed.png")
#     users[8].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/saraseed.png"), filename: "saraseed.png")
#     users[9].avatar.attach(io: URI.open("https://d15c0rd-seeds.s3.amazonaws.com/shanseed.png"), filename: "shanseed.png")
#     users[10].avatar.attach(io: URI.open("https://cdn.discordapp.com/attachments/1068364632269525106/1096275984271024128/IMG_5280.jpg"), filename: "michaelseed")





# ActiveRecord::Base.transaction do 

#     Server.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:servers)

#     # User.create(username:"DemoUser", email:"demo@demo.io", password:"password", tag:"0900")
#     # User.create(username:"testing", email:"papaya@paired.com", password:"testing", tag: "1090")
#     Server.create(name:"Demo Room 1", owner_id: 1)

#     Server.create(name:"Demo Room 2", owner_id: 1)

#     Server.create(name:"Michael was here", owner_id: 1)

#     Server.create(name:"Fruit", owner_id: 2)

#     Server.create(name:"Vegatables", owner_id: 2)

#     Server.create(name:"Reminders", owner_id: 3)

#     Server.create(name:"train is late", owner_id: 3)

#     Server.create(name:"sbotify", owner_id:4)

# end


# ActiveRecord::Base.transaction do 

#     Channel.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:channels)

#     # User.create(username:"DemoUser", email:"demo@demo.io", password:"password", tag:"0900")
#     # User.create(username:"testing", email:"papaya@paired.com", password:"testing", tag: "1090")
#     Channel.create(name:"Demo_channel1", server_id: 1)
#     Channel.create(name:"Demo_channel2", server_id: 1, description: "talk about the second channel here!")
#     Channel.create(name:"Welcome to my clone!", server_id: 1, description: "i wonder if this description is noticeable..")

#     Channel.create(name:"there are no channels in Demo Room 2?", server_id: 3, description: "talk about a lazy seed here lmaoo")
#     Channel.create(name:"I hope this works ok...", server_id: 3)

#     Channel.create(name:"it is", server_id: 7)
#     Channel.create(name:"always", server_id: 7)
#     Channel.create(name:"late", server_id: 7)

#     Channel.create(name:"best_project", server_id:8)



# end


# ActiveRecord::Base.transaction do 

#     ServerSubscription.destroy_all
#     ApplicationRecord.connection.reset_pk_sequence!(:server_subscriptions)

#     ServerSubscription.create(subscriber_id: 1, server_id: 6)
#     ServerSubscription.create(subscriber_id: 1, server_id: 5)

#     ServerSubscription.create(subscriber_id: 1, server_id: 1)
#     ServerSubscription.create(subscriber_id: 1, server_id: 2)
#     ServerSubscription.create(subscriber_id: 1, server_id: 3)

#     ServerSubscription.create(subscriber_id: 2, server_id: 4)
#     ServerSubscription.create(subscriber_id: 2, server_id: 5)

#     ServerSubscription.create(subscriber_id: 3, server_id: 6)
#     ServerSubscription.create(subscriber_id: 3, server_id: 7)
    
#     ServerSubscription.create(subscriber_id: 4, server_id: 8)

#     ServerSubscription.create(subscriber_id: 11, server_id: 1)
#     ServerSubscription.create(subscriber_id: 2, server_id: 1)
#     ServerSubscription.create(subscriber_id: 3, server_id: 1)
#     ServerSubscription.create(subscriber_id: 4, server_id: 1)
#     ServerSubscription.create(subscriber_id: 5, server_id: 1)
#     ServerSubscription.create(subscriber_id: 6, server_id: 1)
#     ServerSubscription.create(subscriber_id: 7, server_id: 1)
#     ServerSubscription.create(subscriber_id: 8, server_id: 1)
#     ServerSubscription.create(subscriber_id: 9, server_id: 1)
#     ServerSubscription.create(subscriber_id: 10, server_id: 1)

    

# end





