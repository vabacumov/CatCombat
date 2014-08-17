class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |cat|
      cat.string :nickname
      cat.string :image_src
      cat.integer :strength, :agility, :intelligence, :cuteness, :hp
      cat.integer :xp
      cat.integer :level
      cat.integer :rank
      cat.integer :user_id

      cat.timestamps
    end
  end
end
