helpers do

  def current_user
    if session[:id]
      user = User.find(session[:id])
      return user
    else
      return false
    end
  end

end
