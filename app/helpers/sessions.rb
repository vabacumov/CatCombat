require 'twilio-ruby'

helpers do

  def send_challenge_message(number)
    account_sid = 'AC1bb3ed460ac8576f28faf0bff3126847'
    auth_token = '6b314a4a87bc5740a9972d38676eb08f'

    @client = Twilio::REST::Client.new account_sid, auth_token

    @client.account.messages.create({
      :from => '+14843024003',
      :to => number,
      :body => 'Your challenged another cat to a fight!'
      })
    rescue
  end

  def send_result_message(number, result)
    account_sid = 'AC1bb3ed460ac8576f28faf0bff3126847'
    auth_token = '6b314a4a87bc5740a9972d38676eb08f'

    @client = Twilio::REST::Client.new account_sid, auth_token

    @client.account.messages.create({
      :from => '+14843024003',
      :to => number,
      :body => result
      })
    rescue
  end

  def random_cat_img
    response = HTTParty.get('http://thecatapi.com/api/images/get')
  end

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

    def rank_cats
      i = Cat.all.count
      Cat.order(xp: :asc).each do |cat|
        cat.rank = i
        cat.save
        i -= 1
      end
    end

    def xp_gain(winner, loser)
      winner.xp += (10 + loser.level * 5 + rand(1..5))
      winner.save
    end

    def level_check(winner)
      if winner.xp >= (20 + winner.level * 50)
        winner.level += 1
      end
      winner.save
    end

    def fight
      until @user_hp <= 0 || enemy_hp <= 0
        player_hit
        enemy_hit
      end

      if @enemy_hp <= 0 && !(@user_hp <= 0)
        xp_gain(@user, @enemy)
        level_check(@user)
      elsif @user_hp <= 0 && !(@enemy_hp <= 0)
        xp_gain(@enemy, @user)
        level_check(@enemy)
      end

      rank_cats

      return "Draw" if @user_hp <= 0 && @enemy_hp <= 0
      return user.nickname if @enemy_hp <= 0
      return enemy.nickname if @user_hp <= 0
    end
  end

end


