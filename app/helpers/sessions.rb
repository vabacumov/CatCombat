helpers do

  def current_user
    if session[:id]
      User.find(session[:id])
    end
  end

  def random_cat
    cat = Cat.all.sample
    if cat.id == session[:cat_id]
      random_cat
    else
      return cat
    end
  end

  class Combat
    attr_accessor :user, :enemy, :user_hp, :enemy_hp
    def initialize(user, enemy)
      @user = user
      @enemy = enemy
      @user_hp = user.hp
      @enemy_hp = enemy.hp
    end

    def numbers(attacker, victim)
      damage = rand(1..attacker.strength) + rand(1..(attacker.level+1))
      dodge = rand(1..5) + victim.agility + victim.intelligence
      crit = rand(1..5) + attacker.cuteness
      values = [damage, dodge, crit]
      return values
    end

    def player_move(values)
      if values[1] < 12 && values[2] > 8
        @enemy_hp -= values[0] * 2
      elsif values[1] < 12
        @enemy_hp -= values[0]
      end
      return @enemy_hp
    end

    def enemy_move(values)
      if values[1] < 12 && values[2] > 8
        @user_hp -= values[0] * 2
      elsif values[1] < 12
        @user_hp -= values[0]
      end
      return @user_hp
    end

    def player_hit
      values = numbers(@user, @enemy)
      player_move(values)
    end

    def enemy_hit
      values = numbers(@enemy, @user)
      enemy_move(values)
    end

    def fight
      until @user_hp <= 0 || enemy_hp <= 0
        player_hit
        enemy_hit
      end
      return "draw" if @user_hp <= 0 && @enemy_hp <= 0
      return user.nickname if @enemy_hp <= 0
      return enemy.nickname if @user_hp <= 0
    end
  end

end
