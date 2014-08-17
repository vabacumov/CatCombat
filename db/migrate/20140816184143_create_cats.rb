class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |cat|
      cat.string :nickname
      cat.string :image_src
      cat.integer :strength, :agility, :intelligence, :cuteness, default: 3
      cat.integer :hp, default: 10
      cat.integer :xp, default: 0
      cat.integer :level, default: 0
      cat.integer :rank
      cat.integer :user_id

      cat.timestamps
    end
  end
end
