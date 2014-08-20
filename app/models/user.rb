class User < ActiveRecord::Base
  include BCrypt

  has_one :cat

  validates :fullname, :email, :password_hash, presence: true
  validates :email, uniqueness: true
  validates :phone, length: { is: 9 }, numericality: { only_integer: true }

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end
