get '/' do
  erb :index
end

post '/user/new' do
  @user = User.new(fullname: params[:fullname], email: params[:email])
  @user.password = params[:password]
  @user.save!

  session[:id] = @user.id
  session[:email] = @user.email
  redirect '/'
end

post 'cat/new' do

end
