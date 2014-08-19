get '/' do
  erb :index
end

post '/user/new' do
  @user = User.new(fullname: params[:fullname], email: params[:email], phone: params[:phone])
  @user.password = params[:password]
  if @user.valid?
    @user.save!
    session[:id] = @user.id
    session[:email] = @user.email
    content_type :json
    valid = true
    sign_out_div = erb :sign_out, :layout => false
    create_cat_div = erb :create_cat, :layout => false
    {create_cat: create_cat_div, sign_out: sign_out_div, success: valid}.to_json
  else
    content_type :json
    name_error = @user.errors.messages[:fullname]
    email_error = @user.errors.messages[:email]
    password_error = @user.errors.messages[:password_hash]
    phone_error = @user.errors.messages[:phone]
    valid = false
    sign_in_div = erb :sign_in, :layout => false
    {
      html: sign_in_div,
      success: valid,
      name: name_error,
      email: email_error,
      password: password_error,
      phone: phone_error
    }.to_json
  end
end

get '/sessions/new' do
  @user = User.find_by_email(params[:email])
  if @user
    if @user.password == params[:password]
      session[:id] = @user.id
      session[:email] = @user.email
      session[:cat_id] = @user.cat.id
      @error = false
      content_type :json
      success = true
      sign_out_div = erb :sign_out, :layout => false
      user_cat_div = erb :user_cat, layout: false
      {sign_out: sign_out_div, user_cat: user_cat_div, success: success}.to_json
    else
      @error = true
      content_type :json
      success = false
      sign_in_div = erb :sign_in, :layout => false
      {html: sign_in_div, success: success}.to_json
    end
  else
      @error = true
      content_type :json
      success = false
      sign_in_div = erb :sign_in, :layout => false
      {html: sign_in_div, success: success}.to_json
  end
end

get '/sessions/delete' do
  session.delete(:id)
  session.delete(:cat_id)
  session.delete(:enemy_id)
  @error = false
  content_type :json
  sign_in_div = erb :sign_in, :layout => false
  create_account_div = erb :create_account, :layout => false
  {login: sign_in_div, account: create_account_div}.to_json
end

post '/cats/new' do
  @cat = Cat.new(nickname: params[:nickname], image_src: params[:url], user_id: params[:user_id])
  if @cat.valid?
    @cat.save!
    session[:cat_id] = @cat.id
    content_type :json
    valid = true
    choose_attributes = erb :cat_attributes, :layout => false
    {html: choose_attributes, success: valid}.to_json
  else
    content_type :json
    nickname_error = @cat.errors.messages[:nickname]
    valid = false
    create_cat_div = erb :create_cat, :layout => false
    {html: create_cat_div, success: valid, error: nickname_error}.to_json
  end
end

put '/cats/new/attributes' do
  @cat = Cat.find(session[:cat_id])
  if (params[:strength].to_i + params[:agility].to_i + params[:intelligence].to_i + params[:cuteness].to_i) == 5
    @cat.update(strength: @cat.strength+params[:strength].to_i, agility: @cat.agility+params[:agility].to_i, intelligence: @cat.intelligence+params[:intelligence].to_i, cuteness: @cat.cuteness+params[:cuteness].to_i)
    content_type :json
    valid = true
    strength = params[:strength]
    agility = params[:agility]
    intelligence = params[:intelligence]
    cuteness = params[:cuteness]
    xp = @cat.xp
    level = @cat.level
    rank = @cat.rank || "-"
    cat_div = erb :user_cat, layout: false
    {
      cat: cat_div,
      strength: strength,
      agility: agility,
      intelligence: intelligence,
      cuteness: cuteness,
      xp: xp,
      level: level,
      rank: rank,
      success: valid
    }.to_json
  else
    content_type :json
    error = "Retry"
    choose_attributes = erb :cat_attributes, :layout => false
    {user_cat: choose_attributes, error: error}.to_json
  end
end
