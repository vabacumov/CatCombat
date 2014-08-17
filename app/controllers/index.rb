get '/' do
  erb :index
end

post '/user/new' do
  @user = User.new(fullname: params[:fullname], email: params[:email])
  @user.password = params[:password]
  @user.save!
  if @user.valid?
    session[:id] = @user.id
    session[:email] = @user.email
    content_type :json
    valid = true
    sign_out_div = erb :sign_out, :layout => false
    {html: sign_out_div, success: valid}.to_json
  else
    content_type :json
    valid = false
    sign_in_div = erb :sign_in, layout => false
    {html: sign_in_div, success: valid}.to_json
  end
end

get '/sessions/new' do
  @user = User.find_by_email(params[:email])
  if @user.password == params[:password]
    session[:id] = @user.id
    session[:email] = @user.email
    @error = false
    content_type :json
    success = true
    sign_out_div = erb :sign_out, :layout => false
    {html: sign_out_div, success: success}.to_json
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
  @error = false
  content_type :json
  sign_in_div = erb :sign_in, :layout => false
  create_account_div = erb :create_account, :layout => false
  {login: sign_in_div, account: create_account_div}.to_json
end
