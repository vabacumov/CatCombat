get '/' do
  erb :index
end

post '/user/new' do
  @user = User.new(fullname: params[:fullname], email: params[:email])
  @user.password = params[:password]
  @user.save!

  session[:id] = @user.id
  session[:email] = @user.email
  content_type :json
  sign_out_div = erb :sign_out, :layout => false
  {html: sign_out_div}.to_json
end

get '/sessions/new' do
  @user = User.find_by_email(params[:email])
  if @user.password == params[:password]
    session[:id] = @user.id
    session[:email] = @user.email
    content_type :json
    sign_out_div = erb :sign_out, :layout => false
    {html: sign_out_div}.to_json
  else
    redirect '/'
  end
end

get '/sessions/delete' do
  session.delete(:id)
  content_type :json
  sign_in_div = erb :sign_in, :layout => false
  {html: sign_in_div}.to_json
end
