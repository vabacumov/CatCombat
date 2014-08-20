class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |user|
      user.string :fullname
      user.string :email
      user.string :phone
      user.string :password_hash

      user.timestamps
    end
  end
end
