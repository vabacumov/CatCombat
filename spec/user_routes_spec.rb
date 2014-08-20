describe User do
  context "#associations" do
    it { should have_one :cat }
  end

  describe 'get /' do
    it "returns successful status" do
      get '/'
      expect(last_response.status).to eq(200)
    end
  end

  describe 'post /user/new' do
    it "returns successful status" do
      post '/user/new'
      expect(last_response.status).to eq(200)
    end
  end

  describe 'get /sessions/new' do
    it "returns successful status" do
      get '/sessions/new'
      expect(last_response.status).to eq(200)
    end
  end

  describe 'get /sessions/delete' do
    it "returns successful status" do
      get '/sessions/delete'
      expect(last_response.status).to eq(200)
    end
  end




end
