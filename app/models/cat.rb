class Cat < ActiveRecord::Base
  belongs_to :user

  validates :nickname, presence: true
end
