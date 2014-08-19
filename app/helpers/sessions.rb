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

    def move(values, victim_hp)
      if values[1] < 12 && values[2] > 8
        victim_hp -= values[0] * 2
      elsif values[1] < 12
        victim_hp -= values[0]
      end
      return victim_hp
    end

    def player_hit
      values = numbers(@user, @enemy)
      move(values, @enemy_hp)
    end

    def enemy_hit
      values = numbers(@enemy, @user)
      move(values, @user_hp)
    end

    def fight
      until @user_hp <= 0 || @enemy_hp <= 0
        player_hit
        return @user.nickname if @enemy_hp <= 0
        enemy_hit
        return @enemy.nickname if @user_hp <= 0
      end
    end
  end

end
