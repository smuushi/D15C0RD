# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)



ActiveRecord::Base.transaction do 

    User.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!(:users)

    User.create(username:"DemoUser", email:"demo@demo.io", password:"password", tag:"0900")
    User.create(username:"testing", email:"papaya@paired.com", password:"testing", tag: "1090")
    
end


ActiveRecord::Base.transaction do 

    Server.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!(:servers)

    # User.create(username:"DemoUser", email:"demo@demo.io", password:"password", tag:"0900")
    # User.create(username:"testing", email:"papaya@paired.com", password:"testing", tag: "1090")
    Server.create(name:"Fruit Room1", owner_id: 1)
    Server.create(name:"Fruit Room2", owner_id: 1)
    Server.create(name:"GumboRoom", owner_id: 1)

    Server.create(name:"Meat Room", owner_id: 2)
    Server.create(name:"Vegatables", owner_id: 2)

end


ActiveRecord::Base.transaction do 

    Channel.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!(:channels)

    # User.create(username:"DemoUser", email:"demo@demo.io", password:"password", tag:"0900")
    # User.create(username:"testing", email:"papaya@paired.com", password:"testing", tag: "1090")
    Channel.create(name:"FR1_channel1", server_id: 1)
    Channel.create(name:"FR1_channel2", server_id: 1, description: "talk about the second channel here!")
    Channel.create(name:"Welcome to my clone!", server_id: 1, description: "i wonder if this description is noticeable..")

    Channel.create(name:"there are no channels in FR2??", server_id: 3, description: "talk about a lazy seed here lmaoo")
    Channel.create(name:"I hope this works ok..", server_id: 3)
end

