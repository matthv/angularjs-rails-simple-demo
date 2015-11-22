user = User.new
user.first_name = 'Nicolas'
user.last_name = 'Kovacs'
user.email = 'nicolas@kovacs.fr'
user.save!

user2 = User.new
user2.first_name = 'Matthieu'
user2.last_name = 'Videaud'
user2.email = 'matthieu@videaud.fr'
user2.save!