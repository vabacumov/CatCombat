require 'faker'
require 'HTTParty'

images = [
  "http://jasonlefkowitz.net/wp-content/uploads/2013/07/big_cat_found_spoh-760994.jpg",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoqND_Ld73fE7HrC4X0TOmuXnAHxa00cJOSFIztawlWAMXl6ig",
  "http://freefunnydogpictures.com/wp-content/uploads/2014/05/cat-pics_1400069798.jpg",
  "http://static.parade.condenast.com/wp-content/uploads/2013/12/pizza-cat.jpg",
  "http://d1w7nqlfxfj094.cloudfront.net/wp-content/uploads/2012/04/lime-cat.jpg"
]

# def random_cat_img
#   response = HTTParty.get('http://thecatapi.com/api/images/get')
#   p response
#   # parsed_response = XML.parse(response)
#   # p parsed_response
# end

i = 0

5.times do
  User.create(fullname: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.cell_phone, password_hash: 1)
  Cat.create( nickname: Faker::Name.first_name, image_src: images[i], user_id: i+1)
  i += 1
end
